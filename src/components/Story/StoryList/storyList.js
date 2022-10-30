import React from 'react';
import StoryCard from '../StoryCard/storyCard';
import CardGroup from 'react-bootstrap/CardGroup';
import './storyList.css';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
// import unLivingImg from './imgs/UnLiving.png';
import ghostSideImg from '../../Title/title2.jpg';
// import zedFighterImg from './imgs/ZedFighter.png';
// import magicMirrorcleImg from './imgs/MagicMirrorcle.png';
// import boneManImg from './imgs/BoneMan.png';
// import replacementHeadsImg from './imgs/robots_1.png';

const CardList = ({onRouteChange,updateStoryReading}) => {
     const onClick = (item) => {
          updateStoryReading('https://picsum.photos/354/200','title','text');
          onRouteChange('story-reading');
      }

     return (
     
               <Row xs={1} md={2} lg={3} className="g-4">

                    <Col className='myCard' onClick={onClick}>
                         <StoryCard cardImage='https://picsum.photos/354/200'    
                         cardTitle='Stealing from Wizards' 
                         cardExtraInfo='Views: 20 | Downloads: 50'
                         cardText="Volume 1: Pickpocketing Living in secret and stealing to eat is a hard life , but it's all Kuro has ever known. Fear and necessity honed him from a young age into the f.."
                         cardLink={'Gameplay Video'}
                         />
                    </Col>

                    <Col className='myCard' onClick={onClick}>
                         <StoryCard     
                         cardTitle='GhoasdasdasdstSide' 
                         cardExtraInfo='Unreal Engine 4 | Blueprints | Steam Enabled'
                         cardText='Play with a friend to elimiasdah a friend to asdfasfasdfash a friend to asdfasfasdfash a friend to asdfasfasdfash a friend to asdfasfasdfassdasdadasdadasdanate enemies in a wave based shooter. Includes different weapon types.'
                         cardLink={'Gameplay Video'}
                         />
                    </Col>

                    <Col className='myCard' onClick={onClick}>
                         <StoryCard     
                         cardTitle='GhostSide' 
                         cardExtraInfo='Unreal Engine 4 | Blueprints | Steam Enabled'
                         cardText='Play with a friend to eliminate enemies in a wave based shooter. Includes different weapon types.'
                         cardLink={'Gameplay Video'}
                         />
                    </Col>

               
                    <Col className='myCard' onClick={onClick}>
                         <StoryCard     
                         cardTitle='GhostSide' 
                         cardExtraInfo='Unreal Engine 4 | Blueprints | Steam Enabled'
                         cardText='Play with a friend to eliminate enemies in a wave based shooter. Includes different weapon types.'
                         cardLink={'Gameplay Video'}
                         />
                    </Col>

                    <Col className='myCard' onClick={onClick}>
                         <StoryCard     
                         cardTitle='GhostSide' 
                         cardExtraInfo='Unreal Engine 4 | Blueprints | Steam Enabled'
                         cardText='Play with a friend to eliminate enemies in a wave based shooter. Includes different weapon types.'
                         cardLink={'Gameplay Video'}
                         />
                    </Col>

                    <Col className='myCard' onClick={onClick}>
                         <StoryCard     
                         cardTitle='GhoasdasdasdstSide' 
                         cardExtraInfo='Unreal Engine 4 | Blueprints | Steam Enabled'
                         cardText='Play with a friend to asdfasfasdfasdfasdfasdfasfasdfasdfasdfasdf enemies in a wave based shooter. Includes different weapon types.'
                         cardLink={'Gameplay Video'}
                         />
                    </Col>

                    <Col className='myCard' onClick={onClick}>
                         <StoryCard     
                         cardTitle='GhostSide' 
                         cardExtraInfo='Unreal Engine 4 | Blueprints | Steam Enabled'
                         cardText='Play with a friend to eliminate enemies in a wave based shooter. Includes different weapon types.'
                         cardLink={'Gameplay Video'}
                         />
                    </Col>

               
                    <Col className='myCard' onClick={onClick}>
                         <StoryCard     
                         cardTitle='GhostSide' 
                         cardExtraInfo='Unreal Engine 4 | Blueprints | Steam Enabled'
                         cardText='Play with a friend to eliminate enemies in a wave based shooter. Includes different weapon types.'
                         cardLink={'Gameplay Video'}
                         />
                    </Col>    

                    

               </ Row>
          
          

    );
}

export default CardList;