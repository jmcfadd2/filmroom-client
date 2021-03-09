import { makeStyles } from '@material-ui/core';
import { NavigateBefore, NavigateNext } from '@material-ui/icons';
import React, { useEffect, useState } from 'react';
import ReactPlayer from 'react-player';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getCourseData } from '../redux/actions/courseActions';

const useStyles = makeStyles((theme) => ({
  ...theme.spreadthis,
  videoPlayer: {
    marginRight: 'auto',
    marginLeft: 'auto'
  },
  flex: {
    display: 'flex',
    alignItems: 'center'
  },
  next: {
    fontSize: 100,
  },
  before: {
    fontSize: 100,
  }
}))

function Watch() {
  const classes = useStyles()
  const { courseId } = useParams()
  const dispatch = useDispatch()
  const [activeVideo, setActiveVideo] = useState(0)
  const courseInfo = useSelector(state => state.courses.info)
  console.log(courseInfo);
  useEffect(() => {
    console.log('firing', courseId);
    dispatch(getCourseData(courseId))

  }, [dispatch, courseId])

  const handleNext = () => {
    if (activeVideo !== courseInfo.videos.length) { setActiveVideo((prevActiveVideo) => prevActiveVideo + 1) }
  }
  const handleBack = () => {
    if (activeVideo !== 0) { setActiveVideo((prevActiveVideo) => prevActiveVideo - 1) }
  }
  return (
    <div>
      {courseInfo &&
        <div className={classes.flex}>
          <NavigateBefore
            className={classes.before}
            onClick={handleBack}
            color={activeVideo !== 0 ? 'primary' : 'disabled'}
          />
          <ReactPlayer
            className={classes.videoPlayer}
            url={`https://stream.mux.com/${courseInfo.videos[activeVideo]}.m3u8`}
            light={`https://image.mux.com/${courseInfo.videos[activeVideo]}/thumbnail.png`}
            playing
            controls
          />
          <NavigateNext
            onClick={handleNext}
            
            className={classes.next}
            color={activeVideo !== courseInfo.videos.length ? 'primary' : 'disabled'}
          />
        </div>}
    </div>
  );
}

export default Watch;
