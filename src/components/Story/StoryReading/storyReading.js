import React from "react";
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';
import './storyReading.css';
import {exportComponentAsJPEG, exportComponentAsPDF, exportComponentAsPNG} from "react-component-export-image";

class StoryReading extends React.Component {

  constructor(props){
    super(props);
    this.componentRef = React.createRef();
    this.state = {
      currentPage: 0,
      downloadingPage: 0,
      downloadInProgress: false
    }
    
    // const {storyImage, storyTitle, storyText, storyID, downloadStory} = props;
    this.storyChunk = this.props.storyText.match(/(.|[\r\n]){1,6000}/g);
  }

  onCustomClick = (storyID) => {
    this.props.downloadStory(storyID);
    this.setState({downloadInProgress: true});
    //exportComponentAsPNG(this.componentRef);
  }

  componentDidUpdate = () => {
    if (this.state.downloadInProgress){
      exportComponentAsPNG(this.componentRef);

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
    let newPage = Math.max(0,this.state.currentPage + pageTurn) ;
    newPage = Math.min(this.storyChunk.length - 1,newPage);
    this.setState({currentPage: newPage});
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

  render(){
    const {storyImage, storyTitle, storyText, storyID} = this.props;

    return (
      
      <div>
          <div className='padd'>
            <div className='center'>
                <Image src={storyImage} alt="Title Image" fluid rounded />
            </div>
          </div>

          <div className='button-right'>
            <Button variant="outline-success" size="md" onClick={() => this.onCustomClick(storyID)}>Download Story</Button>
          </div>

          <h1 className="center storyTitle">{storyTitle}</h1>
          <div>{this.renderToDownload()}</div>

          {this.storyChunk.length > 1 ? 
            <div className='button-right'>
              <Button  variant="secondary" size="md" onClick={() => this.onPageTurn(-1)}>Previous Page</Button>
              <Button  variant="secondary" size="md" onClick={() => this.onPageTurn(1)}>Next Page</Button>
            </div> 
          : <></>}
          
      </div>
    );
  }
}

export default StoryReading;