import React, { useEffect, useState, useCallback } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { useSelector, useDispatch } from 'react-redux';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { Paper, Chip, Divider, MenuItem, CircularProgress, Dialog, DialogContent, DialogContentText, LinearProgress } from '@material-ui/core';
import { setTopic, setDrills, uploadCourseDrills, uploadCourseVideos, createCourse } from '../redux/actions/courseActions.js';
import { DropzoneArea } from 'material-ui-dropzone';
import { getTopicData } from '../redux/actions/dataActions';
import {  SET_UPLOAD_SUCCESS, STOP_LOADING_UI } from '../redux/types';
import theme from '../util/theme';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '50%',
    marginRight: "auto",
    marginLeft: "auto",
  },
  step: {
    paddingLeft: '15vh',
    paddingRight: '15vh',
    backgroundColor: theme.palette.secondary.dark

  },
  stepButton: {
    marginRight: theme.spacing(1),
    marginTop: theme.spacing(2),
  },
  instructions: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    backgroundColor: 'white',
    borderRadius: 10
  },

}));

export default function TrainingUpload() {
  const classes = useStyles();
  const dispatch = useDispatch()
  const [activeStep, setActiveStep] = React.useState(0);
  const [openVideo, setOpenVideo] = useState(false);
  const [courseVideos, setCourseVideos] = useState([])
  const topics = useSelector(state => state.data.topics)
  const loading = useSelector(state => state.UI.loading)
  const uploadSuccess = useSelector(state => state.courses.uploadSuccess)
  const currentTopic = useSelector(state => state.courses.topic)
  const courseId = useSelector(state => state.courses.courseId)
  const courseDrills = useSelector(state => state.courses.drills)
  const [drillVideos, setDrillVideos] = useState([])
  const [previewVideo, setPreviewVideo] = useState([])
  const videoStatus = useSelector(state => state.UI.videoStatus)
  const progress = useSelector(state => state.UI.progress)
  const [drillName, setDrillName] = useState()
  const [drillType, setDrillType] = useState()
  const [drillMetrics, setDrillMetrics] = useState([])
  const [description, setDescription] = useState("")
  const [title, setTitle] = useState("")


  const nextStep = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1)
    dispatch({
      type: SET_UPLOAD_SUCCESS,
      payload: false
    })
    dispatch({
      type: STOP_LOADING_UI
    })
  }
  const handleNext = async () => {

    const firstStep = async () => {
      dispatch(await createCourse({
        description: description,
        title: title,
      }, previewVideo[0]));

    }

    activeStep === 0 ? firstStep() :
      activeStep === 1 ? dispatch(uploadCourseVideos({
        topic: topics[currentTopic].name,
        videoCount: courseVideos.length,
      }, courseId, courseVideos))
        : dispatch(uploadCourseDrills(courseDrills, courseId, drillVideos))


  }

  // const handleVideoClick = () => {
  //   document.getElementById('videoInput').click()
  // }
  const handleAddCourseVideo = useCallback(
    (files) => {
      setCourseVideos([].concat(courseVideos, files))
      console.log(courseVideos)
    }, [courseVideos],
  )
  const handlePreviewVideo = useCallback(
    (files) => {
      setPreviewVideo([].concat(previewVideo, files))
      console.log(previewVideo)
    }, [previewVideo]
  )
  const handleDrillVideo = useCallback(
    (files) => {
      setDrillVideos([].concat(drillVideos, files))
      console.log(drillVideos)
    }, [drillVideos],
  )



  const handleTopic = (e) => {
    dispatch(setTopic(e.target.value))
    console.log(e);
  }

  const handleFinish = () => {
    window.location.href = '/learn'
  }

  const handleDrillName = (e) => {
    setDrillName(e.target.value)
  }
  const handleDrillMetrics = (e) => {
    setDrillMetrics([...drillMetrics, e.target.value])
  }
  const handleDrillType = (e) => {
    setDrillType(e.target.value)
  }

  const handleAddDrill = () => {
    dispatch(setDrills({
      drillName: drillName,
      drillMetrics: drillMetrics,
      topic: topics[currentTopic].name,
      type: drillType
    }))
    setDrillMetrics([])
    setDrillName("")
    setDrillType("")
  }

  useEffect(() => {
    dispatch(getTopicData());
  }, [dispatch])


  return (
    <div className={classes.root}>
      {activeStep === 0 &&

        <Paper>
          <div className={classes.step}>

            <Typography variant="h5" color='textSecondary' >
              Upload Course Preview Video
            </Typography>
            <TextField
              name="title"
              id="title"
              placeholder="Course Title"

              className={classes.instructions}
              variant="filled"
              onChange={(e) => setTitle(e.target.value)}
              size="small"
            />

            <TextField
              name="description"
              placeholder="Course Description"
              variant="filled"
              className={classes.instructions}
              multiline
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
            />
            <DropzoneArea
              className={classes.instructions}
              acceptedFiles={['video/*']}
              filesLimit={1}
              useChipsForPreview={true}
              maxFileSize={1000000000}
              onDrop={handlePreviewVideo}
            />

            <Dialog
              PaperProps={{
                style: {
                  backgroundColor: theme.palette.secondary.dark,
                },
              }}
              open={loading}
            >
              {console.log(loading)}
              <DialogContent>
                <DialogContentText> {videoStatus}  </DialogContentText>

                <LinearProgress variant="determinate" lab value={progress} />
                {uploadSuccess === true && <Button onClick={nextStep} >
                  Next
                </Button>}
              </DialogContent>
            </Dialog>

          </div>
        </Paper>


      }


      {activeStep === 1 &&

        <Paper>

          <div className={classes.step}>
            <Typography variant="h5">Upload Training Videos</Typography>
            <Divider />
            <Typography className={classes.instructions}>Split your training into videos teaching specific concepts you want your players to learn and/or add content explaining the drills you'll add in the next step</Typography>
            <TextField
              name="topic"
              select
              label="Sport"
              variant="filled"
              className={classes.textField, classes.instructions}
              onChange={handleTopic}
              fullWidth
            >
              {topics.map((topic, index) => (
                <MenuItem key={index} value={index}>
                  {topic.name}
                </MenuItem>
              ))}
            </TextField>
            <DropzoneArea
              acceptedFiles={['video/*']}
              multiple
              useChipsForPreview={true}
              maxFileSize={1000000000}
              open={openVideo}
              onDrop={handleAddCourseVideo}


            />
            <Dialog
              PaperProps={{
                style: {
                  backgroundColor: theme.palette.secondary.dark,
                },
              }}
              open={loading}
            >
              {console.log(loading)}
              <DialogContent>
                <DialogContentText> {videoStatus}  </DialogContentText>

                <LinearProgress variant="determinate" lab value={progress} />
                {uploadSuccess === true && <Button onClick={nextStep} >
                  Next
                </Button>}
              </DialogContent>
            </Dialog>
          </div>
        </Paper>
      }

      {activeStep === 2 &&

        <Paper>
          <div className={classes.step}>

            <Typography variant="h5">Create Drills</Typography>

            <TextField
              name="name"
              type="text"
              value={drillName}
              label="Drill Name"
              rows="1"
              placeholder="The name of your drill?"
              className={classes.textField, classes.instructions}
              onChange={handleDrillName}
              fullWidth
            />

            <TextField
              name="Type"
              value={drillType}
              select
              label="Type"
              placeholder="How are you tracking your reps?"
              className={classes.textField}
              onChange={handleDrillType}
              fullWidth
            >
              {topics[0] && topics[currentTopic].sessionTypes.map((type, index) => (
                <MenuItem value={type} key={index}>
                  {type}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              name="metrics"
              value={drillMetrics}
              select
              label="Metrics"
              placeholder="How are you tracking your reps?"
              className={classes.textField}
              onChange={handleDrillMetrics}
              fullWidth
            >
              {topics[0] && topics[currentTopic].metrics.map((metric, index) => (
                <MenuItem value={metric} key={index}>
                  {metric}
                </MenuItem>
              ))}
            </TextField>



            <DropzoneArea
              acceptedFiles={['video/*']}
              multiple
              useChipsForPreview={true}
              maxFileSize={1000000000}
              onDrop={handleDrillVideo}

            />




            {drillMetrics.map((metric, index) => (
              <Typography key={index}>{metric}</Typography>
            ))}

            <Button
              type="sendDrill"
              variant="contained"
              color="primary"
              className={classes.submitButton, classes.stepButton}
              disabled={loading}
              onClick={handleAddDrill}
            >
              Add Drill
                    {loading && (
                <CircularProgress
                  size={30}
                  className={classes.progressSpinner}
                />
              )}
            </Button>
            {courseDrills[0] &&
              courseDrills.map((drill, index) => (
                <Chip key={index} label={`${index + 1} ${drill.drillName}`} />
              ))
            }
          </div>
          <Dialog
            PaperProps={{
              style: {
                backgroundColor: theme.palette.secondary.dark,
              },
            }}
            open={loading}
          >

            <DialogContent>
              <DialogContentText> {videoStatus}  </DialogContentText>

              <LinearProgress variant="determinate" lab value={progress} />
              {uploadSuccess === true && <Button onClick={handleFinish} >
                Finish
                </Button>}
            </DialogContent>
          </Dialog>
        </Paper>




      }

      <div className={classes.stepButton}>
        {activeStep === 3 ? (
          <div>
            <Typography className={classes.instructions}>All steps completed</Typography>
          </div>
        ) : (
            <div>
              <div>

                <Button variant="contained" color="primary" onClick={handleNext}>
                  {activeStep === 2 ? 'Finish' : 'Next'}
                </Button>
              </div>
            </div>
          )}
      </div>
    </div>
  );
}
