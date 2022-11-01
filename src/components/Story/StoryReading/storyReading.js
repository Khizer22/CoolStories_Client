import React from "react";
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';
import './storyReading.css';
import Chart from './chart';
import {exportComponentAsJPEG, exportComponentAsPDF, exportComponentAsPNG} from "react-component-export-image";

class StoryReading extends React.Component {

  constructor(props){
    super(props);
    this.componentRef = React.createRef();
    this.scrollToRef = React.createRef();
    this.state = {
      currentPage: 0,
      downloadingPage: 0,
      downloadInProgress: false,
      chartData: null
    }
    
    // const {storyImage, storyTitle, storyText, storyID, downloadStory} = props;
    this.storyChunk = this.props.storyText.match(/(.|[\r\n]){1,6000}/g);
    this.viewRateLimit = false;
  }

  onCustomClick = (storyID) => {
    this.props.downloadStory(storyID);
    this.setState({downloadInProgress: true});
    //exportComponentAsPNG(this.componentRef);
  }

  componentDidUpdate = () => {
    if (this.state.downloadInProgress){
      exportComponentAsPNG(this.componentRef,{fileName: `${this.props.storyTitle} page ${this.state.downloadingPage + 1}`});

      let newPage = this.state.downloadingPage+1;

      if (newPage < this.storyChunk.length)
        this.setState({downloadingPage: newPage});
      else{
        this.setState({downloadInProgress: false});
        this.setState({downloadingPage: 0});
      }
    }
  }

  onPageTurn= (pageTurn) => {
    const tempCurrentPage = this.state.currentPage;

    let newPage = Math.max(0,tempCurrentPage + pageTurn) ;
    newPage = Math.min(this.storyChunk.length - 1,newPage);
    this.setState({currentPage: newPage});

    if (newPage != tempCurrentPage)
      this.scrollToRef.current?.scrollIntoView({behavior: 'auto'});
  }

  renderToDownload = () => {
    if (this.state.downloadInProgress){
      if (this.state.downloadingPage === 0){
        //First page
        return <div className="outline" ref={this.componentRef}>
                  <div className='downloadingPage' >
                    <h1 className="center storyTitle">{this.props.storyTitle}</h1>
                    <p >{this.storyChunk[this.state.downloadingPage]}</p>
                  </div>
                </div>
      }
      else
        return <div className="outline" ref={this.componentRef}>
                  <div className='downloadingPage'>
                    <p >{this.storyChunk[this.state.downloadingPage]}</p>
                  </div>
                </div>
    }
    else
      return <p>{this.storyChunk[this.state.currentPage]}</p>;
  }

  componentDidMount(){
    this.getDataViews();

    //window.scrollTo(0, 0);
    this.scrollToRef.current?.scrollIntoView({behavior: 'auto'});
  }

  getDataViews = () => {
    if (this.viewRateLimit === false){

      this.viewRateLimit = true;

      fetch(`http://localhost:8080/api/stories/${this.props.storyID}/vd`, {
        method: 'get',
        headers: {'Content-Type':'application/json'}
      })
      .then(response => response.json())
      .then(response => {
        console.log(response);
        this.viewRateLimit = false;
        this.setState({chartData:response});
      }) 
      .catch(err => console.log(err));
    }
  }

  render(){
    const {storyImage, storyTitle, storyText, storyID} = this.props;

    return (
      
      <div>
          <div className='padd'>
            <div className='center'>
                <Image src={storyImage} alt="Title Image" fluid rounded />
            </div>
          </div>

          <div className='button-right' ref={this.scrollToRef}>
            <Button variant="outline-success" size="md" onClick={() => this.onCustomClick(storyID)}>Download Story</Button>
          </div>

          <h1 className="center storyTitle" >{storyTitle}</h1>
          {this.storyChunk.length > 1 ? 
            <p className="text-muted">Page: {this.state.currentPage + 1}/{this.storyChunk.length}</p>
          :
            <></>
          }
          
          <div className="story-text">{this.renderToDownload()}</div>

          {this.storyChunk.length > 1 ? 
            <div className='button-right'>
              <Button  variant="secondary" size="md" onClick={() => this.onPageTurn(-1)}>Previous Page</Button>
              <Button  variant="secondary" size="md" onClick={() => this.onPageTurn(1)}>Next Page</Button>
            </div> 
          : <></>}

          <hr style={{'marginTop':'50px'}}/>

          <div className="chart-container">
            <div className='chart'><Chart chartData={this.state.chartData}/></div>
          </div>
          
      </div>
    );
  }
}

export default StoryReading;