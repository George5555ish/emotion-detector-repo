import React from "react";
import ImageCard from "../ImageCards/ImageCard/ImageCard";
import useStyles from "./styles.js";
import {
   
    Grow,
    Grid,
   
  } from "@material-ui/core";

const ImageCards = ({
  showWelcome,
  setShowWelcome,
  changeImageRec,
  changeVidRec,
  changeZoomRec,
}) => {
  const classes = useStyles();
  const infoCards = [
    {
      title: "Video Recognition with AI",

      text: "Determine your facial expressions in any video with Artificial Intelligence!",
    },

    {
      title: "Image Facial Recognition",

      text: "Determine facial expressions in any image you upload (of yourself)!",
    },
  
  ];

  const changeScreen = (i) => {
    if (i === 0) {
      
      changeImageRec();
    } else if (i === 1) {
     
      changeVidRec();
    } else {
      
      changeZoomRec();
    }

    setShowWelcome(!showWelcome);
  };

  return (
    <Grow in>
      <Grid
        className={classes.container}
        container
        alignItems="stretch"
        spacing={3}
      >
        {infoCards.map((infoCard, i) => {
          return (
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              lg={6}
              style={{ display: "flex" }}
              key={i}
            >
              <div onClick={() => changeScreen(i)}>
                <ImageCard title={infoCard.title} text={infoCard.text} />
              </div>
            </Grid>
          );
        })}
      </Grid>
    </Grow>
  );
};

export default ImageCards;
