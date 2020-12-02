import React, {useEffect, useState} from 'react';
import VideoIdentify from './VideoIdentify/VideoIdentify';
import wellington from "./cardImages/welly.JPG";
import somto from './cardImages/3.JPG';
import destiny from './cardImages/destiny.JPG';
import marvy from './cardImages/marvy.JPG';
import simi from "./cardImages/simi.JPG";
import annie from "./cardImages/annie.JPG";

// css styles are gotten from the IMG RECOG CSS FILE

const VidRecog = ({ denyAccess,  closeSafely}) => {
    

 
    const [showNextScreen, setNextScreen] = useState(false)
    const [hoverOn, setHoverOn] = useState(false);
    const [hoverIndex, setHoverIndex] = useState(0);
    const [clickedUser, setClickedUser] = useState('');
    const [clickedUserSrc, setClickedUserSrc] = useState('');
    // const [openModal, setModal] = useState();

    // VARIABLES FOR THE MODAL TO WORK
    // const customStyles = {
    //   content : {
    //     top                   : '50%',
    //     left                  : '50%',
    //     right                 : 'auto',
    //     bottom                : 'auto',
    //     marginRight           : '-50%',
    //     transform             : 'translate(-50%, -50%)'
    //   }
    // };

    useEffect(() => {

    
    }, []);
   
   
    // function afterOpenModal() {
    //   // references are now sync'd and can be accessed.
    //   subtitle.style.color = '#f00';
    // }

    const setClass = (tagName, index) => {

       
        if( tagName === 'IMG' || tagName === 'DIV' || tagName === 'BUTTON'){
            setHoverOn(true);
            setHoverIndex(index);
        }



       
    }

    const changeToNext = (person, imageText) => {
      setNextScreen(true);
      setClickedUser(person);
      setClickedUserSrc(imageText)
      console.log(imageText);
    }

    const cardInfo = [
        {
            imgSrc: simi,
            name: 'Simisanya',
            imageText: 'simi',
            content: "Gorgeous IG Personality",
           
          },
      
          {
            imgSrc: wellington ,
            name: 'Welly',
            imageText: 'welly',
            content: "Hair Enthusiast (🐟🐟🐟)",
           
          },

          {
            imgSrc: somto,
            name: 'Somto',
            imageText: '3',
            content: "Money is crushing on him",
         
          },
          {
            imgSrc: annie ,
            name: 'Annie',
            imageText: 'annie',
            content: "Intelligent and Gorgeous (ay ay)",
         
          },

        
      
          {
            imgSrc: marvy ,
            name: 'Marvy',
            imageText: 'marvy',
            content: "She causes you to lick screen",
          
          },
          {
            imgSrc: destiny,
            name: 'Destiny',
            imageText: 'destiny',
            content: "Sings so elegantly",
          
          },
    ]

    return (
           
        !showNextScreen ? <div>
        
        
        <div className="video-cont">

    { 
        cardInfo.map((card, i) => { 
            
           return ( <div id={hoverOn ? (i === hoverIndex ?`hoverOn${i}` : '') : ''} className="video-box-child" key={i} onClick={(e) => {setClass(e.target.tagName, i)}}>
            <div className="imgBx">
                <img src={card.imgSrc} alt="vidText" width="300px" height="292px"/>
            </div>
            <div className="box-content">
                <h2> {card.name}<br />
                <span>{card.content} </span> <br />
                
            <button className="vid-button" onClick={() => changeToNext(card.name, card.imageText)}> Identify</button>
                </h2>
            </div>
            
     </div>
         
      )
     }
     )
        
    
      }
</div>

   </div> : <VideoIdentify hoverIndex={hoverIndex}
   clickedUser={clickedUser}  closeSafely={closeSafely}
   clickedUserSrc={clickedUserSrc}
   denyAccess={denyAccess}
   />
    );
}

export default VidRecog;