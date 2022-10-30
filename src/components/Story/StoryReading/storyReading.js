
import Image from 'react-bootstrap/Image';

function StoryReading({storyImage, storyTitle, storyText}) {
  return (
    
    <div>
        <Image src={storyImage} alt="Story Image" fluid />

        <h1 className="center">${storyTitle}</h1>

        <p>${storyText}</p>
    </div>
  );
}

export default StoryReading;