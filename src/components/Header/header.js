import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './header.css';

function Header({onRouteChange,signedInUser,logOut}) {

    return (
      <>
        <Navbar fixed="top"  bg="light" variant="light" className='header shadow '>
          <Container>
            <Navbar.Brand href="#home" onClick={() => onRouteChange('home')}>Cool Stories Bro</Navbar.Brand>
            
            {/* <Form className="d-flex">
                <Form.Control
                type="search"
                placeholder="..."
                className="me-2"
                aria-label="Search"
                />
                <Button variant="outline-success">Search</Button>
            </Form> */}

            {signedInUser === 0 ? 
            <Nav>
                <Nav.Link href="#SignIn" onClick={() => onRouteChange('sign-in')}>Sign In</Nav.Link>
                <Nav.Link href="#Register" onClick={() => onRouteChange('register')}>Register</Nav.Link>
            </Nav>
            : 
            <Nav>
                <Nav.Link href="#SignIn" onClick={logOut}>Log Out</Nav.Link>
            </Nav>
            }
            

          </Container>
        </Navbar>
      </>
    );
  }
  
  export default Header;
