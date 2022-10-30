
import './App.css';
import { Component } from 'react';
import Title from './components/Title/title';
import SignIn from './components/UserManagement/SignIn/sign_in';
import Register from './components/UserManagement/Register/register';
import Header from './components/Header/header';
import Footer from './components/Footer/footer';
import Storylist from './components/Story/StoryList/storyList';
import StoryReading from './components/Story/StoryReading/storyReading';
import 'bootstrap/dist/css/bootstrap.css';
import Container from 'react-bootstrap/Container';

const initialState = {
  route: 'home',
  storyImage: 'Story Image URL',
  storyTitle: 'Story Title',
  storyText: 'Story Text'
}

class App extends Component {

  constructor(props){
    super(props);
    this.state= initialState;

    document.title = `Cool Stories Bro`;
  }

  onRouteChange = (route) => {
    // if (route === 'home'){
    //   this.setState(initialState);
    // } 
    // else if (route === 'asd'){
    //   this.setState({isSignedIn : true})
    // }
  
    this.setState({route: route});
  }

  updateStoryReading = (storyImage, storyTitle, storyText) => {
    this.setState({storyImage: storyImage});
    this.setState({storyTitle: storyTitle});
    this.setState({storyText: storyText});
  }

  getBody(){
    const {route} = this.state;

    switch (route) {
      case 'home':
        return <div><Title/> <Storylist onRouteChange={this.onRouteChange} updateStoryReading={this.updateStoryReading}/></div>;
        break;
        case 'sign-in':
        return <div><Title/><SignIn onRouteChange={this.onRouteChange}/></div>;
        break;
        case 'register':
        return <div><Title/><Register onRouteChange={this.onRouteChange}/></div>;
        break;
        case 'story-reading':
        return <StoryReading storyImage={this.state.storyImage} storyTitle={this.state.storyTitle} storyText={this.state.storyText}/>;
        break;
      default:
        return <div><Title/> <Storylist onRouteChange={this.onRouteChange} updateStoryReading={this.updateStoryReading} /></div>;
        break;
    }
  }

  render(){
    return (
      <>
        <div className="App">
          
          <Header onRouteChange={this.onRouteChange}/>
          
          <Container className='contain'>
            {this.getBody()}
          </Container>
  
        </div>
        <Footer/> 
      </>
    );
  }

}

export default App;
