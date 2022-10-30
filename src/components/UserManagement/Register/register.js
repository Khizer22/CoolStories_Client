import React from 'react';
import './register.css';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

const initialState = {
    email: '',
    password: '',
    name: '',
    errorMessage: '',
    feedbackMessage: ''
}

class Register extends React.Component{

    constructor(props){
        super(props);
        this.state = initialState;
    }

    onEmailChange = (event) => {
        this.setState({email: event.target.value});
    }

    onPasswordChange = (event) => {
        this.setState({password: event.target.value});
    }

    // onNameChange = (event) => {
    //     this.setState({name: event.target.value});
    // }

    onSubmitSignIn = () => {

        console.log(this.state);

        //check if @ is in email
        if (this.state.email.length > 0 && !this.state.email.includes('@')){
            this.setState({errorMessage: "Invalid email format."});
            return;
        }
        //Check if any field is empty
        else if(this.state.email === '' || this.state.password === '' /*|| this.state.name === ''*/){
            this.setState({errorMessage: "Invalid submission."});
            return;
        }

        this.setState({feedbackMessage: "Registering..."});

        fetch('https://pure-ravine-89852.herokuapp.com/register', {
            method: 'post',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({
                email: this.state.email,
                password: this.state.password,
                //name: 'this.state.name'
                name: 'temp fake name'
            })
        })
            .then(response => response.json())
            .then(user => {
                this.setState(initialState);

                if (user.id){
                    //this.props.loadUser(user);
                    this.props.onRouteChange('home');
                }
                else {
                    this.setState({errorMessage: "Unable to register."});
                }
            })
    }

    render(){

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
                            REGISTER
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
                            Register
                        </Button>
                    </Form>
                </Row>
            )
    }
}

export default Register;