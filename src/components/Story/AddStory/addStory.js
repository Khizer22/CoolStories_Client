import React from 'react';
import './addStory.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const initialState = {
    title: '',
    imageURL: '',
    description: '',
    text: '',
    errorField: ['','','','']
}

class AddStory extends React.Component {

    constructor(props){
        super(props);
        this.state = initialState;

        this.buttonMessage = "Submit Story";
        this.errorList = ['','','',''];
        this.isSubmitted = false;
    }

    onTitleChange = (event) => {
        this.setState({title: event.target.value});
    }
    onImageURLChange = (event) => {
        this.setState({imageURL: event.target.value});
    }
    onDescriptionChange = (event) => {
        this.setState({description: event.target.value});
    }
    onTextChange = (event) => {
        this.setState({text: event.target.value});
    }

    displayEmptyFieldError = () => {
        let err = false;

        Object.entries(this.state).forEach((item,index) => {
            if (index >= this.state.length - 1)
                return err;

            if (item[1] === ''){
                this.errorList[index] = "Field cannot be empty.";
                err = true;
            }
            else{
                this.errorList[index] = '';
            }
            this.setState({errorField:this.errorList});
        })

        return err;
    }

    onSubmitStory = () => {

        if (this.displayEmptyFieldError() === true)
            return;

        this.buttonMessage = "Submitting...";
        this.isSubmitted = true;
        
        console.log(this.props.signedInUser);

        fetch(`http://localhost:8080/api/stories`, {
            method: 'post',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({
                userID: this.props.signedInUser,
                title: this.state.title,
                imageURL: this.state.imageURL,
                description: this.state.description,
                text: this.state.text
            })
        })
            .then(response => {
                if (response.status === 201){
                    this.setState(initialState);
                    this.props.onRouteChange('home');
                }
                else
                    throw new Error("Something went wrong");

                response.json();
            })
            .then(response => {

            })
            .catch(console.log);
    }

  render(){

    return <Form>

        <Form.Label className='add-story-title center' column="lg" >
            SUBMIT STORY
        </Form.Label>

        <Form.Group className=" mb-3" >
            <Form.Label>Story Title</Form.Label>
            <Form.Control onChange={this.onTitleChange} maxLength="50" placeholder="My Story Title" />
            <Form.Label className='center feedback-message flash'>
                {this.state.errorField[0]}
            </Form.Label>
        </Form.Group>
        <Form.Group className="mb-3" >
            <Form.Label>Splash Image URL</Form.Label>
            <Form.Control onChange={this.onImageURLChange} placeholder="https://picsum.photos/id/55/1200/700" />
            <Form.Label className='center feedback-message flash'>
                {this.state.errorField[1]}
            </Form.Label>
        </Form.Group>
        <Form.Group className="mb-3" >
            <Form.Label>Description (300 Characters)</Form.Label>
            <Form.Control onChange={this.onDescriptionChange} maxLength="300" as="textarea" placeholder="My Story description..." />
            <Form.Label className='center feedback-message flash'>
                {this.state.errorField[2]}
            </Form.Label>
        </Form.Group>
        <Form.Group className="mb-3" >
            <Form.Label>My Story</Form.Label>
            <Form.Control onChange={this.onTextChange} as="textarea" rows={20} placeholder="Write your story here..." />
            <Form.Label className='center feedback-message flash'>
                {this.state.errorField[3]}
            </Form.Label>
        </Form.Group>
        <Button variant="primary" disabled={this.isSubmitted} onClick={() => this.onSubmitStory()}>
            {this.buttonMessage}
        </Button>
    </Form>

    
  }
}

export default AddStory;