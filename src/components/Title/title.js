
import './title.css';
import Image from 'react-bootstrap/Image';
import titleImg from './title2.jpg';

function Title() {
  return (

    <div className='padd'>
      <div className='myTitle'>
          <Image src={titleImg} alt="Title Image" fluid rounded />
          <div className='stories-heading-bg '></div>
          <h1 className='stories-heading rounded'>Stories</h1>
      </div>
    </div>
  );
}

export default Title;
