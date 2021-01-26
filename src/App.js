import React, { useState } from "react";
import {
  Container,
  AppBar,
  Typography,
  Grow,
  Button,
} from "@material-ui/core";
import useStyles from './styles';
// import snapImage from "./images/snapImage.jpg";
import ImageCards from "./components/ImageCards/ImageCards";
import CoreRecog from "./components/CoreRecog/CoreRecog";

const App = () => {
  const [showWelcome, setShowWelcome] = useState(true);
  const [imageRec, setImageRec] = useState(false);
  const [videoRec, setVideoRec] = useState(false);

  //This use state controls the button to fix the bug of 
  //leaving the screen while async requests are made.
  //Prevents breaking the code.
  const [denyAccess, setDenyAccess] = useState(false);

  


  const classes = useStyles();
  const resetScreen = () => {

    setShowWelcome(!showWelcome);
    setImageRec(false);
    setVideoRec(false);
  
    
   
  };

  const closeSafely = (input) => {
      
     setDenyAccess(input);
  }

  const changeImageRec = () => {
      setImageRec(!imageRec);
  }

  const changeVidRec = () => {
      setVideoRec(!videoRec)
  }


 
  return (
    <Container maxwidth="lg">
    
     <AppBar position="static" color="inherit" className={classes.appBar}>
      {!showWelcome && (
        <Button onClick={() => resetScreen() } disabled={denyAccess} className={classes.homeButton}>Back Home</Button>
      ) }

        <div className="videoRecAppbar">
        
        <Typography variant="h2" align="center" className={classes.heading}>
          Express Yourself!
        </Typography>

        {videoRec && <Typography variant="body2" color="textSecondary" className="appBarText">
          Disclaimer: The people used here for images are strictly for testing purposes.
         <br /> You can always test your faces 
          just to see what the AI would produce, if your face isn't among those below. <br />Have Fun!
        </Typography>}
        
        
        </div>
        
        
      </AppBar>
      
    {showWelcome && <div className="welcomeAppBar">
      <Typography variant="h2" color="textSecondary">
        Welcome to Express Yourself!
      </Typography>

      <Typography variant="body2" gutterBottom style={{color: "rgba(36, 37, 42, 1)", fontSize: "22px", fontWeight: 'bold'}}>
        These are small emotion detectors that use <strong>your </strong>
        facial expressions to decipher how you're feeling at any given point..
        <br />
        With the help of Google's FaceAPI, we can use Artificial Intelligence to draw a canvas
        as an overlay over any image (or video) and get facial features, using your input as testing data.
      <br />
      {" "}
      <br />
        <strong> Have Fun!</strong>
      </Typography>
    </div>}
      <Grow in enter>
      
        {showWelcome ? (
          <ImageCards
            showWelcome={showWelcome}
            closeSafely={closeSafely}
            changeImageRec={changeImageRec}
            changeVidRec={changeVidRec}
            setShowWelcome={setShowWelcome}
            imageRec={imageRec}
            videoRec={videoRec}
          
            
          />
        ) : (
          <CoreRecog
            imageRec={imageRec}
            videoRec={videoRec}
            denyAccess={denyAccess}
           
            closeSafely={closeSafely}
          
          />
        )}
      </Grow>
     
      

  
    </Container>
  );
};

export default App;
