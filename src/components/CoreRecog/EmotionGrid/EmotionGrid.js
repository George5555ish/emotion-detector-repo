import React , {useState}from 'react';
import {Button, Typography} from '@material-ui/core'
import './EmotionGrid.css';


const EmotionGrid = ({happy, sad, disgusted, angry, neutral, sortable, alreadyRunning}) => {

         const finalFeeling = sortable[0][0];
         const finalFeeling2 = sortable[1][0];
         const happyFeelingTernary = finalFeeling === 'happy' || finalFeeling2 === 'happy';
         const sadFeelingTernary = finalFeeling === 'sad' || finalFeeling2 === 'sad';
         const disgustedFeelingTernary = finalFeeling === 'disgusted' || finalFeeling2 === 'disgusted';
         const angryFeelingTernary = finalFeeling === 'angry' || finalFeeling2 === 'angry';
         const neutralFeelingTernary = finalFeeling === 'neutral' || finalFeeling2 === 'neutral';
        const [showNotif, setShowNotif] = useState(true);
        console.log(finalFeeling, finalFeeling2);
        console.log(neutralFeelingTernary, sadFeelingTernary);
       
         

        const changeNotif = () => {
          setShowNotif(false);
        }
  
    return (
    <div className="main">

   {
     showNotif &&  <div className="emotionContainer">
      <div className="emotionDiv">
     <Typography variant="h2" color="textSecondary" className="emotionDiv2">
     <strong>How To Use:</strong>
    <br />
  
You have 5 emotions and a webcam. Go Crazy!

<br />
    {" "}
<br />
 Click Allow Camera, make faces at the webcam and watch it guess what you're feeling.
Try not to be too sad though, it'll cause a glitch xD!
     </Typography>
      </div>

      <Button onClick={changeNotif}>Ok, Got It!</Button>
    </div>
   }
       <div className="container">
       
       {/* <div className="box"> <div className="result">{happy}%</div> <h1 className= "emotionAnimation"><span className= "emotionAnimation2">happy</span></h1></div> */}
        <div className="box"> <div className="result">{happy}%</div> <h1 className={(happyFeelingTernary & !alreadyRunning ) ? "emotionAnimation" : ""}><span className={happyFeelingTernary ? "emotionAnimation2" : ""}>happy</span></h1></div>
        <div className="box"> <div className="result">{sad}%</div> <h1 className={(sadFeelingTernary & !alreadyRunning) ? "emotionAnimation" : ""}><span className={sadFeelingTernary ? "emotionAnimation2" : ""}>sad</span></h1></div>
        <div className="box"> <div className="result">{disgusted}%</div> <h1 className={(disgustedFeelingTernary & !alreadyRunning) ? "emotionAnimation" : ""}><span className={disgustedFeelingTernary ? "emotionAnimation2" : ""}>disgusted</span></h1></div>
        <div className="box"> <div className="result">{angry}%</div> <h1 className={(angryFeelingTernary & !alreadyRunning) ? "emotionAnimation" : ""}><span className={angryFeelingTernary ? "emotionAnimation2" : ""}>angry</span></h1></div>
        <div className="box"> <div className="result">{neutral}%</div> <h1 className={(neutralFeelingTernary & !alreadyRunning) ? "emotionAnimation" : ""}><span className={neutralFeelingTernary ? "emotionAnimation2" : ""}>neutral</span></h1></div>
    </div>  
      </div>
       
    )
}


export default EmotionGrid;