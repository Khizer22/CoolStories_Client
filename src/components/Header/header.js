import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import './header.css';

function Header({onRouteChange,signedInUser,logOut}) {

    return (
      <>
        <Navbar fixed="top"  bg="light" variant="light" className='header shadow '>
          <Container>
            <Navbar.Brand style={{'cursor':'pointer'}} onClick={() => onRouteChange('home')}>Cool Stories Bro</Navbar.Brand>
            
            {signedInUser === 0 ? 
            <Nav>
                <Nav.Link onClick={() => onRouteChange('sign-in')}>Sign In</Nav.Link>
                <Nav.Link onClick={() => onRouteChange('register')}>Register</Nav.Link>
            </Nav>
            : 
            <Nav>
                <Nav.Link onClick={logOut}>Log Out</Nav.Link>
            </Nav>
            }
            
          </Container>
        </Navbar>
      </>
    );
  }
  
  export default Header;
