import React, { useState } from "react";
import {
  Container,
  Grid,
} from "@material-ui/core";

// import Form from "../Form/form";
// import ImageCard from '../ImageCards/ImageCard/ImageCard';
import EmotionGrid from "./EmotionGrid/EmotionGrid";
import ImageRecog from "../ImageRecog/ImgRecog";
import VideoRecog from "../VideoRecog/VidRecog";

import "../ImageRecog/ImgRecog.css";

const CoreRecog = ({ imageRec, videoRec, closeSafely }) => {
  
  const [alreadyRunning, setAlreadyRunning] = useState(false);
  const [sortedArray, setSortedArray] = useState([
    ["", 0],
    ["", 0],
  ]);
  const [emotions, setEmotions] = useState([
    {
      angry: 0,
      disgusted: 0,
      happy: 0,
      neutral: 0,
      sad: 0,
    },
  ]);

  const stopAnimation = () => {
    setAlreadyRunning(true);
  };

  const receiveEmotions = (feels) => {
    let newArr = [...emotions];

    // let test = feels[0].angry;

    newArr[0].angry =
      feels[0].angry.toFixed(2) === 0.0 ? 0 : feels[0].angry.toFixed(2) * 100;
    newArr[0].happy =
      feels[0].happy.toFixed(2) === 0.0 ? 0 : feels[0].happy.toFixed(2) * 100;
    newArr[0].sad =
      feels[0].sad.toFixed(2) === 0.0 ? 0 : feels[0].sad.toFixed(2) * 100;
    newArr[0].disgusted =
      feels[0].disgusted.toFixed(2) === 0.0
        ? 0
        : feels[0].disgusted.toFixed(2) * 100;
    newArr[0].neutral =
      feels[0].neutral.toFixed(2) === 0.0
        ? 0
        : feels[0].neutral.toFixed(2) * 100;
    // newArr[0].sad = feels[0].sad;
    // newArr[0].disgusted = feels[0].disgusted;
    // newArr[0].neutral = feels[0].neutral;
    // newArr[0].happy = feels[0].happy;

    setEmotions(newArr);

    let sortable = [];
    let oldSortable = [...sortedArray];
    for (var emotion in newArr[0]) {
      sortable.push([emotion, newArr[0][emotion]]);
    }

    sortable.sort(function (a, b) {
      return b[1] - a[1];
    });

    oldSortable[0][0] = sortable[0][0];
    oldSortable[0][1] = sortable[0][1];
    oldSortable[1][0] = sortable[1][0];
    oldSortable[1][1] = sortable[1][1];

    // console.log(oldSortable);

    setSortedArray(oldSortable);
  };
  return (
    <Container>
    {imageRec &&  <Grid
        container
        justify="space-between"
        alignItems="stretch"
        spacing={3}
        className="homeContainer"
      >
         <Grid item>
          <EmotionGrid
            happy={emotions[0].happy}
            sad={emotions[0].sad}
            disgusted={emotions[0].disgusted}
            angry={emotions[0].angry}
            neutral={emotions[0].neutral}
            sortable={sortedArray}
            alreadyRunning={alreadyRunning}
            imageRec={imageRec}
            videoRec={videoRec}
            className="emotionGrid"
          />
        </Grid>

        <Grid item >
         
            <ImageRecog
              closeSafely={closeSafely}
              receiveEmotions={receiveEmotions}
              stopAnimation={stopAnimation}
            />
      
         
        </Grid>

      </Grid>
      }
      {videoRec && <VideoRecog   closeSafely={closeSafely}/>}
     
    
    </Container>
  );
};

export default CoreRecog;
