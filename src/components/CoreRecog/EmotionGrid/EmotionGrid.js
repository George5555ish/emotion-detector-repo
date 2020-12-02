import React from 'react';
import './EmotionGrid.css';


const EmotionGrid = ({happy, sad, disgusted, angry, neutral, sortable, alreadyRunning}) => {

         const finalFeeling = sortable[0][0];
         const finalFeeling2 = sortable[1][0];
         const happyFeelingTernary = finalFeeling === 'happy' || finalFeeling2 === 'happy';
         const sadFeelingTernary = finalFeeling === 'sad' || finalFeeling2 === 'sad';
         const disgustedFeelingTernary = finalFeeling === 'disgusted' || finalFeeling2 === 'disgusted';
         const angryFeelingTernary = finalFeeling === 'angry' || finalFeeling2 === 'angry';
         const neutralFeelingTernary = finalFeeling === 'neutral' || finalFeeling2 === 'neutral';

        console.log(finalFeeling, finalFeeling2);
        console.log(neutralFeelingTernary, sadFeelingTernary);
       
         
  
    return (
    <div className="main">
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