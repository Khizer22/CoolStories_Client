import React from 'react';
import StoryCard from '../StoryCard/storyCard';
import './storyList.css';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';

const CardList = ({onRouteChange,updateStoryReading, storyInfoArray}) => {
     
     const onCustomClick = (item, selectedStory) => {
          updateStoryReading(selectedStory.imageURL,selectedStory.title,selectedStory.text, selectedStory.storyID);
          onRouteChange('story-reading');
      }

      const storyArray = storyInfoArray.map((storyInfo,index) => {
          return <Col className='myCard' onClick={(item) => onCustomClick(item,storyInfo)}>
               <StoryCard cardImage= {storyInfo.imageURL}    
               cardTitle={storyInfo.title} 
               cardExtraInfo={`Views: ${storyInfo.views} | Downloads: ${storyInfo.downloads}`}
               cardText={storyInfo.description}
               />
          </Col>
      });

     return (

          <div>     
               <Row xs={1} md={2} lg={3} className="g-4">
                    {storyArray}  
               </ Row>
          </div>
    );
}

export default CardList;