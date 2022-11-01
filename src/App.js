
import './App.css';
import { Component } from 'react';
import Title from './components/Title/title';
import SignIn from './components/UserManagement/SignIn/sign_in';
import Register from './components/UserManagement/Register/register';
import Header from './components/Header/header';
import Footer from './components/Footer/footer';
import Storylist from './components/Story/StoryList/storyList';
import StoryReading from './components/Story/StoryReading/storyReading';
import AddStory from './components/Story/AddStory/addStory';
import 'bootstrap/dist/css/bootstrap.css';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';

const initialState = {
  route: 'home',
  signedInUser: 0, //0 means not signed in
  storyInfoArray: [],
  storyID: 0,
  storyImage: 'Story Image URL',
  storyTitle: 'Story Title',
  storyText: 'Story Text',
  loadingMessage: "Loading..."
}

class App extends Component {

  constructor(props){
    super(props);
    this.state= initialState;

    document.title = `Cool Stories Bro`;
  }

  componentDidMount = () => {
    this.onTravelHomePage();
  }

  onTravelHomePage = () => {
    //Fetch and update story cards
    fetch(`http://localhost:8080/api/stories`)
    .then(response => response.json())
    .then(response => {
      if (response){
        console.log(response);
        this.setState({storyInfoArray: response});
        
        if (response.length <= 0)
          this.setState({loadingMessage: "No Stories so far. Sign in to add stories!"})
      }
      
    })
    .catch(err => {
      console.log(err);
      this.setState({loadingMessage: "Error getting stories"})
    });
  }

  onRouteChange = (route) => {
    if (route === 'home'){
      //this.setState(initialState);
      this.onTravelHomePage();
    } 
    else if (route === 'asd'){
      //this.setState({isSignedIn : true})
    }
  
    this.setState({route: route});
  }

  logIn = (userID) => {
    this.setState({signedInUser: userID});
  }

  logOut = () => {
    this.setState({signedInUser: 0});
  }

  updateStoryReading = (storyImage, storyTitle, storyText, storyID) => {
    this.setState({storyID: storyID});
    this.setState({storyImage: storyImage});
    this.setState({storyTitle: storyTitle});
    this.setState({storyText: storyText});

    fetch(`http://localhost:8080/api/stories/${storyID}/incview`, {
      method: 'put',
      headers: {'Content-Type':'application/json'}
    })
    .catch(err => console.log(err));
  }

  downloadStory = (storyID) => {
    fetch(`http://localhost:8080/api/stories/${storyID}/incdownload`, {
      method: 'put',
      headers: {'Content-Type':'application/json'}
    })
    .then(response => response.json())
    .then(response => {
      if (response)
        console.log(response);
    })
    .catch(err => console.log(err));
  }

  addStoryButton = () => {

    let routeToChange = 'home';
    let addStoryButtonText = '+ Add Story';
    if (this.state.signedInUser === 0){
      routeToChange = 'sign-in';
      addStoryButtonText = 'Sign in to add Story';
    } 
    else {
      routeToChange = 'add-story';
    }

    return <div className='add-story-button'>
              <Button variant="outline-success" size="md" onClick={() => this.onRouteChange(routeToChange)}>{addStoryButtonText}</Button>
            </div>
  }

  getBody(){
    const route = this.state.route;

    switch (route) {
      case 'home':

        if (this.state.storyInfoArray.length)
          return <div><Title/> {this.addStoryButton()} <Storylist onRouteChange={this.onRouteChange} updateStoryReading={this.updateStoryReading} storyInfoArray={this.state.storyInfoArray}/></div>;
        else
          return <div><Title/> {this.addStoryButton()}  <h4 className='center'>{this.state.loadingMessage}</h4></div>
        break;
        case 'sign-in':
        return <div><Title/><SignIn onRouteChange={this.onRouteChange} logIn={this.logIn}/></div>;
        break;
        case 'register':
        return <div><Title/><Register onRouteChange={this.onRouteChange} logIn={this.logIn}/></div>;
        break;
        case 'story-reading':
        return <StoryReading storyImage={this.state.storyImage} storyTitle={this.state.storyTitle} storyText={this.state.storyText} storyID={this.state.storyID} downloadStory={this.downloadStory}/>;
        break;
        case 'add-story':
        return <AddStory onRouteChange={this.onRouteChange} signedInUser={this.state.signedInUser}/>;
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
          
          <Header onRouteChange={this.onRouteChange} signedInUser={this.state.signedInUser} logOut={this.logOut}/>
          
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
