
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';
import './storyReading.css';

function StoryReading({storyImage, storyTitle, storyText, storyID, downloadStory}) {

  const onCustomClick = (storyID) => {
    downloadStory(storyID);
  }

  return (
    
    <div>
        <div className='padd'>
          <div className='center'>
              <Image src={storyImage} alt="Title Image" fluid rounded />
              {/* <div className='stories-heading-bg '></div> */}
              {/* <h1 className='stories-heading rounded'>Stories</h1> */}
          </div>
        </div>

        <div className='button-right'>
          <Button variant="outline-success" size="md" onClick={() => onCustomClick(storyID)}>Download Story</Button>
        </div>

        <h1 className="center storyTitle">{storyTitle}</h1>
        <p>{storyText}</p>
        
    </div>
  );
}

export default StoryReading;