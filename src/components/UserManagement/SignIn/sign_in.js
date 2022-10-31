import React from 'react';
import './sign_in.css';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

const initialState = {
    signInEmail: '',
    signInPassword: '',
    errorMessage: '',
    feedbackMessage: ''
}

class Signin extends React.Component {

    constructor(props){
        super(props);
        this.state = initialState;
    }

    onEmailChange = (event) => {
        this.setState({signInEmail: event.target.value});
    }

    onPasswordChange = (event) => {
        this.setState({signInPassword: event.target.value});
    }

    onSubmitSignIn = () => {

        //check if @ is in email
        if (this.state.signInEmail.length > 0 && !this.state.signInEmail.includes('@')){
            this.setState({errorMessage: "Invalid email format."});
            return;
        }
        //Check if any field is empty
        else if(this.state.signInEmail === '' || this.state.signInPassword === ''){
            this.setState({errorMessage: "Invalid submission."});
            return;
        }

        this.setState({feedbackMessage: "Logging in..."});

        fetch(`http://localhost:8080/api/users/login`, {
            method: 'post',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({
                email: this.state.signInEmail,
                password: this.state.signInPassword
            })
        })
            .then(response => {
                return response.json();
            })
            .then(response => {
                this.setState(initialState);
                console.log(response);
                
                if (response.userID){         
                    this.props.logIn(response.userID);
                    this.props.onRouteChange('home');
                }
                else {
                    this.setState({errorMessage: "Wrong email or password"});
                }
            })
    }

    render(){

        const {onRouteChange} = this.props;

        if (this.state.feedbackMessage.length > 0)
        {
            return (
                <div className="center">
                    <p className='logging-in-message flash'>{this.state.feedbackMessage}</p>
                </div>
            )
        }
        else
            return (

                <Row className="justify-content-center">
                    <Form  style={{maxWidth: "300px"}}>

                        <Form.Label className='center' column="lg" >
                            SIGN IN
                        </Form.Label>

                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" onChange={this.onEmailChange}/>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" onChange={this.onPasswordChange}/>
                        </Form.Group>

                        <Form.Group>
                            {this.state.errorMessage.length > 0 ? 
                                    <Form.Text className='feedback-message flash'>{this.state.errorMessage}</Form.Text>
                                : <Form.Text></Form.Text>
                            }
                        </Form.Group>

                        <Button variant="primary" onClick={this.onSubmitSignIn}>
                            Submit
                        </Button>
                    </Form>
                </Row>
            );
    }
}

export default Signin;