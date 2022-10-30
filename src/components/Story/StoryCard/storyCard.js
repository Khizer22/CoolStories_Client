import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import './storyCard.css';



const StoryCard = ({cardImage,cardTitle,cardText,cardLink,cardExtraInfo}) => {

    return (  
        <Card 
        bg={'light'}
        text={'dark'}
        className='shadow h-100'
        >
            <Card.Img variant="top" src={cardImage} className='cardChild'/>
            <Card.Body className='cardChild'>
                <Card.Title >{cardTitle}</Card.Title>
                <Card.Text >{cardText}</Card.Text>
            </Card.Body>
            <Card.Footer className='cardChild'>
                <small className="text-muted">{cardExtraInfo}</small>
                {/* <Button variant="primary">{cardLink}</Button> */}
            </Card.Footer>
        </Card>

    );
}

export default StoryCard;