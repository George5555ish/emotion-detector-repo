import React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
} from "@material-ui/core";
import useStyles from "./styles";
import snapImage from "../../../images/snapImage.jpg";

const ImageCard = ({title, text }) => {
  const classes = useStyles();
  return (
    <Card className={classes.card}>
      <CardMedia
        className={classes.media}
        image={snapImage}
        title={title}
      />
      <div className={classes.overlay}>
        <Typography variant="h6">{title}</Typography>
      </div>

      <CardContent>
        <Typography variant="h5" className={classes.title}>
          {text}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default ImageCard;
