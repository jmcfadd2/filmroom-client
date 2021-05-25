import { Button, makeStyles, Paper, Typography } from "@material-ui/core";
import React, { useEffect } from "react";
import ReactPlayer from "react-player";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import {
  getCourseData,
  addCourseToLibrary,
} from "../redux/actions/courseActions";

const useStyles = makeStyles((theme) => ({
  ...theme.spreadThis,
  root: {
    width: "70%",
    marginRight: "auto",
    marginLeft: "auto",
    minHeight: "50vh",
    backgroundColor: theme.palette.secondary.dark,
  },
  previewContainer: {
    minHeight: "300px",
  },
  title: {
    marginTop: "2vh",
    marginBottom: "2vh",
  },
  button: {
    marginLeft: "2vh",
    marginBottom: "2vh",
  },
}));

function Course() {
  const classes = useStyles();
  const { courseId } = useParams();
  const dispatch = useDispatch();
  const courseInfo = useSelector((state) => state.courses.info);

  const purchaseIds = useSelector(
    (state) => state.user.credentials.coursePurchases
  );
  useEffect(() => {
    dispatch(getCourseData(courseId));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleAddToLibrary = () => {
    dispatch(addCourseToLibrary(courseInfo));
  };
  const isPurchased = () => {
    if (purchaseIds.includes(courseId)) return true;
    else return false;
  };
  return (
    <div>
      <Paper className={classes.root}>
        <div className={classes.previewContainer}>
          <ReactPlayer
            url={`https://stream.mux.com/${courseInfo.previewVideo}.m3u8`}
            light={
              courseInfo.image
                ? courseInfo.image
                : `https://image.mux.com/${courseInfo.previewVideo}/thumbnail.png`
            }
            controls
            playing
            width={"100%"}
          />
        </div>
        <Typography
          variant="h4"
          color="textSecondary"
          className={classes.title}
        >
          {courseInfo.title}
        </Typography>
        {purchaseIds && !isPurchased() ? (
          <Button
            color="primary"
            id="watch-button"
            className={classes.button}
            onClick={handleAddToLibrary}
            variant="contained"
          >
            Add to Library
          </Button>
        ) : (
          <Button
            color="primary"
            variant="contained"
            className={classes.button}
            href={`/watch/${courseId}`}
          >
            Watch
          </Button>
        )}

        <Typography variant="body1" color="textSecondary">
          {courseInfo.body}
        </Typography>
      </Paper>
    </div>
  );
}

export default Course;
