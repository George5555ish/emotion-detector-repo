import React, { useState, useEffect, useRef } from "react";
import * as faceapi from "face-api.js";
import { AppBar, Typography, CircularProgress } from "@material-ui/core";
import useStyles from "./styles";
import welly from "../cardImages/welly.JPG";
import somto from "../cardImages/3.JPG";
import destiny from "../cardImages/destiny.JPG";
import marvy from "../cardImages/marvy.JPG";
import simi from "../cardImages/simi.JPG";
import annie from "../cardImages/annie.JPG";

// dl.dropboxusercontent.com
const VideoIdentify = ({ clickedUser, closeSafely, clickedUserSrc }) => {
  const idRef = useRef();

  const classes = useStyles();
  const imageRef = useRef();
  const [showImageInput, setImageInput] = useState(false);
  // const [renderCharacter, setrenderCharacter] = useState('');
  const [showDiscoveredEmotion, setDiscoveredEmotion] = useState(false);
  const [selectedEmotion, setSelectedEmotion] = useState([
    ["", 0],
    ["", 0],
  ]);
  //Label text is the name of the person detected.
  const [labelText, setLabelText] = useState("");
  const [foundEmotion, setFoundEmotion] = useState([
    { neutral: 0, angry: 0, disgusted: 0, happy: 0, sad: 0 },
  ]);

  useEffect(() => {
    const loadModels = async () => {
      const MODEL_URL = process.env.PUBLIC_URL + "/models";

      Promise.all([
        faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL),
        faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
        faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
        faceapi.nets.ssdMobilenetv1.loadFromUri(MODEL_URL),
      ]).then(start);
    };

    loadModels();
  },);

  async function start() {
    let image;
    let canvas;
    const container = document.createElement("div");
    container.style.position = "relative";

    // console.log(container);


    setImageInput(true);
    idRef.current.append(container);
    container.append(
      "Please wait for a while (10 seconds) before image upload"
    );

    closeSafely(true);
    const LabeledFaceDescriptors = await loadLabeledImages();
    const faceMatcher = new faceapi.FaceMatcher(LabeledFaceDescriptors, 0.6);

    if (imageRef || imageRef !== undefined) {
      imageRef.current.addEventListener("change", async () => {
        if (image) image.remove();
        if (canvas) canvas.remove();

        image = await faceapi.bufferToImage(imageRef.current.files[0]);
        container.append(image);

        canvas = faceapi.createCanvasFromMedia(image);
        container.append(canvas);

        const displaySize = { width: image.width, height: image.height };
        faceapi.matchDimensions(canvas, displaySize);
        const detections = await faceapi
          .detectAllFaces(image)
          .withFaceLandmarks()
          .withFaceDescriptors()
          .withFaceExpressions();

        const resizeDetections = faceapi.resizeResults(detections, displaySize);
        const results = resizeDetections.map((d) =>
          faceMatcher.findBestMatch(d.descriptor)
        );
        results.forEach((result, i) => {
          const angryResults = resizeDetections[i].expressions.angry;
          const disgustedResults = resizeDetections[i].expressions.disgusted;

          const sadResults = resizeDetections[i].expressions.sad;
          const neutralResults = resizeDetections[i].expressions.neutral;
          const happyResults = resizeDetections[i].expressions.happy;

          let newArr = [...foundEmotion];
          newArr[0].angry =
            angryResults.toFixed(2) === 0.0 ? 0 : angryResults.toFixed(2) * 100;
          newArr[0].happy =
            happyResults.toFixed(2) === 0.0 ? 0 : happyResults.toFixed(2) * 100;
          newArr[0].sad =
            sadResults.toFixed(2) === 0.0 ? 0 : sadResults.toFixed(2) * 100;
          newArr[0].disgusted =
            disgustedResults.toFixed(2) === 0.0
              ? 0
              : disgustedResults.toFixed(2) * 100;
          newArr[0].neutral =
            neutralResults.toFixed(2) === 0.0
              ? 0
              : neutralResults.toFixed(2) * 100;

          setFoundEmotion(newArr);

          let fixable = [];
          let oldFixable = [...selectedEmotion];
          for (var emotion in newArr[0]) {
            fixable.push([emotion, newArr[0][emotion]]);
          }

          fixable.sort(function (a, b) {
            return b[1] - a[1];
          });

          oldFixable[0][0] = fixable[0][0];
          oldFixable[0][1] = fixable[0][1];

          setSelectedEmotion(oldFixable);
          setDiscoveredEmotion(true);

          const box = resizeDetections[i].detection.box;
          console.log(result);
          setLabelText(result.label);
          const drawBox = new faceapi.draw.DrawBox(box, {
            label: result.toString(),
          });
          drawBox.draw(canvas);
          closeSafely(false);
        });
      });
    }
  }

  function loadLabeledImages() {
    const labels = ["Annie", "Destiny", "Marvy", "Simisanya", "Somto", "Welly"];

    return Promise.all(
      labels.map(async (label) => {
        const descriptions = [];
        for (let i = 1; i <= 3; i++) {
          const img = await faceapi.fetchImage(
            `https://george5555ish.github.io/image-recog-2/labeled_images/${label}/${i}.JPG`
          );

          const detection = await faceapi
            .detectSingleFace(img)
            .withFaceLandmarks()
            .withFaceDescriptor()
            .withFaceExpressions();
          //   descriptions.push(detection.descriptor)
          if (typeof detection == "undefined") {
            console.log("No face detected");
          } else {
            descriptions.push(detection.descriptor);
          }
        }
        return new faceapi.LabeledFaceDescriptors(label, descriptions);
      })
    );
  }

  return (
    <div className="vidIden-cont" id="vidIdenCont" ref={idRef}>
      <AppBar position="static" color="inherit" className={classes.appBar}>
        <Typography variant="h2" align="center" className={classes.heading}>
          {clickedUser}
        </Typography>
        <img
          src={
            clickedUserSrc === "welly"
              ? welly
              : clickedUserSrc === "3"
              ? somto
              : clickedUserSrc === "destiny"
              ? destiny
              : clickedUserSrc === "marvy"
              ? marvy
              : clickedUserSrc === "simi"
              ? simi
              : annie
          }
        
          width="100px"
          height="100px"
        />
      </AppBar>

      {}

      {showDiscoveredEmotion &&
        (labelText === clickedUser ? (
          <div className="descriptionDiv">
          <Typography className="descriptionDiv2" variant="h2" >
            This is {labelText}. {labelText} is feeling{" "}
            {selectedEmotion[0][0]} { (labelText === "Somto" || 'Welly' || 'Annie' || 'Marvy') && "and a little confident" } in this picture. {(labelText == "Somto") && labelText +" na fresh guy oh. See the pose for picture sef"}
            {(labelText === "Annie") && labelText +" is like fine wine. Look good outside, but inside is even better!"}
            {(labelText === "Welly") && '🐟🐟🐟🐟🐟🐟🐟🐟🐟🐟🐟🐟 iykyk'}
            </Typography>
          </div>
        ) : (
          <div className="descriptionDiv">
            {" "}
            <Typography className="descriptionDiv2" variant="h2" >
            This is not {clickedUser}, but I think it's {labelText === 'unknown' ? 'someone I do not know': labelText}, who is feeling{" "}
            {selectedEmotion[0][0]} { (labelText == "Somto" || 'Welly' || 'Annie' || 'Marvy') && "and a little confident" } in this picture. {(labelText === "Somto") && labelText +" na fresh guy oh. See the pose for picture sef"}
            {(labelText === "Annie") && labelText +" is like fine wine. Look good outside, but inside is even better!"}
            {(labelText ==="Welly") && '🐟🐟🐟🐟🐟🐟🐟🐟🐟🐟🐟🐟 iykyk'}
          </Typography>
            
          </div>
        ))}
      {showImageInput ? (
        <input type="file" id="imageUpload" ref={imageRef} />
      ) : (
        <div className="homeContainer2">
          <CircularProgress />
          <Typography variant="h6" color="textSecondary">
            AI Working in the Background...
          </Typography>
        </div>
      )}
    </div>
  );
};

export default VideoIdentify;