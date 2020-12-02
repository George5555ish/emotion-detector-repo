import React, { useState, useEffect, useRef, useCallback } from "react";
import Webcam from "react-webcam";
import * as faceapi from "face-api.js";
import useStyles from "./styles";


import {

  CircularProgress,
  
} from "@material-ui/core";
const ImgRecog = ({ closeSafely, receiveEmotions, stopAnimation }) => {
  const classes = useStyles();
  const [initialize, setInitialize] = useState(false);

  const canvasRef = useRef();
  const canvasRef2 = useRef();
  const videoWidth = 300;
  const videoHeight = 600;


  const [imgSource, setImageSource] = useState(null);

  const [stopCheck, setStopCheck] = useState(true);
  const [showFaceText, setShowFaceText] = useState(false);
  const [fixFirst, setFixFirst] = useState(false);
  const [intervalState, setIntervalState] = useState(null);
  const [emotionsArray, setEmotionsArray] = useState([
    {   neutral: 0,
        angry: 0,
        disgusted: 0,
        happy: 0,
        sad: 0,
     }
  ]);

  

  const videoConstraints = {
    width: videoWidth,
    height: videoHeight,
    facingMode: "user",
  };

  const removeSnapshot =() => {
    setImageSource(null);
  }
  const newFunct = () => {
    setShowFaceText(false);
    if (fixFirst === false) {
      setFixFirst(true);
    }
    if (stopCheck === true) {
      clearInterval(intervalState);
      closeSafely(false);
     
    //   Function below is received from Corerecog
    //   to stop animation
    stopAnimation(); 
    } else {
      handleOnPlay();
      closeSafely(true);
    }
    setStopCheck(!stopCheck);
   
  };

  const webcamRef = useRef();

  // const videoRef = useRef();
  const handleOnPlay = () => {
    if (stopCheck === true) {
      setInitialize(false);
    } else if (stopCheck === false) {
      let clear = setInterval(async () => {
        canvasRef2.current.innerHTML = faceapi.createCanvasFromMedia(
          webcamRef.current.video
        );

        const displaySize = {
          width: videoWidth,
          height: videoHeight,
        };

        // faceapi.matchDimensions(canvasRef.current, displaySize2);
        faceapi.matchDimensions(canvasRef2.current, displaySize);
        const detection = await faceapi
          .detectAllFaces(
            webcamRef.current.video,
            new faceapi.TinyFaceDetectorOptions()
          )
          .withFaceLandmarks()
          .withFaceExpressions();

        const resizedDetections = faceapi.resizeResults(detection, displaySize);
        // const resizedDetections2 = faceapi.resizeResults(detection, displaySize2);
        canvasRef.current
          .getContext("2d")
          .clearRect(0, 0, videoWidth, videoHeight);

        //   canvasRef2.current
        //   .getContext("2d")
        //   .clearRect(0, 0, videoWidth, videoHeight)
        // faceapi.draw.drawDetections(canvasRef.current, resizedDetections2);
        faceapi.draw.drawDetections(canvasRef2.current, resizedDetections);

        faceapi.draw.drawFaceLandmarks(canvasRef2.current, resizedDetections);
        faceapi.draw.drawFaceExpressions(canvasRef2.current, resizedDetections);
       
        if (typeof detection[0] == "undefined") {
          console.log("No face detected");
          setShowFaceText(true);
          console.log(showFaceText);
        } else {
          console.log(showFaceText);
          setShowFaceText(false);
          const {
            neutral,
            angry,
            disgusted,
            happy,
            sad,
          } = detection[0].expressions;

          let newArr = [...emotionsArray];
        //   let newArray = [
        //     {
        //       neutral: neutral,
        //       angry: angry,

        //       disgusted: disgusted,
        //       happy: happy,
        //       sad: sad,
        //     },
        //   ];

          newArr[0].angry = angry;
          newArr[0].neutral = neutral;
          newArr[0].disgusted = disgusted;
          newArr[0].happy = happy;
          newArr[0].sad = sad;
     
          setEmotionsArray(newArr);
          
        //   console.log(emotionsArray);
          receiveEmotions(emotionsArray);
        }
      }, 1800);

      setIntervalState(clear);
    }
  };

  useEffect(() => {
    const loadModels = async () => {
      const MODEL_URL = process.env.PUBLIC_URL + "/models";

      Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
        faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
        faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
        faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL),
      ]).then(() => setInitialize(true));
    };

    loadModels();
  }, []);

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImageSource(imageSrc)
  }, [webcamRef]);

  return (
    <div className={classes.imgContainer}>
      {/* <div>{!initialize ? "Initializing" : "Ready"}</div> */}
      {initialize ? (
        <div className="fixer">
          <>
            {" "}
            <Webcam
              audio={false}
              height={videoHeight}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              // className="webcam"
              width={videoWidth}
              videoConstraints={videoConstraints}
              // onUserMedia={handleOnPlay}
            />
            <canvas ref={canvasRef2} className={classes.canvas2} />
            <div>
              <canvas ref={canvasRef} className={classes.canvas} />
            </div>
          </>

          
            {imgSource && <img src={imgSource} className="transition-img-vid" alt=""/>}
         
        </div>
      ) : (
        <CircularProgress />
      )}
      <div className="buttonContainer">
        {!stopCheck ? (
          <div className={classes.notifDiv}> Click Start to Begin</div>
        ) : null}
        <button className="btn" type="button">
          <span className="btn-text" onClick={() => newFunct()}>
            {stopCheck ? "Stop" : fixFirst ? "Start" : "Initialize"}
          </span>
        </button>
        <button className="btn rounded" type="button">
        <span className="text-green" onClick={capture}>Capture</span>
         
        </button>
          {showFaceText && <span className="showFaceText">No face Detected. Please adjust your camera</span>}
        {imgSource && <button className="btn rounded" type="button">
        <span className="text-green" onClick={removeSnapshot}>Remove</span>
         
        </button>}
      </div>
    </div>
  );
};

export default ImgRecog;
