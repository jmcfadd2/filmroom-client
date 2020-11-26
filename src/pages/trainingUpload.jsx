import React, { useEffect, useState, useCallback, Fragment } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import MyButton from '../util/MyButton';
import { useSelector, useDispatch } from 'react-redux';
import AddIcon from '@material-ui/icons/Add'
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { Paper, Chip, Divider, MenuItem, CircularProgress, Grid, Dialog, DialogContent, DialogContentText, LinearProgress } from '@material-ui/core';
import { setTopic, setDrills, uploadCourseDrills, uploadCourseVideos, createCourse } from '../redux/actions/courseActions.js';
import { DropzoneArea, DropzoneDialog } from 'material-ui-dropzone';
import { getTopicData } from '../redux/actions/dataActions';
import { LOADING_UI, SET_UPLOAD_SUCCESS, STOP_LOADING_UI } from '../redux/types';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '50%',
    marginRight: "auto",
    marginLeft: "auto"
  },
  step: {
    paddingLeft: '15vh',
    paddingRight: '15vh',
  },
  stepButton: {
    marginRight: theme.spacing(1),
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
  },
  instructions: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
}));

export default function TrainingUpload() {
  const classes = useStyles();
  const dispatch = useDispatch()
  const [activeStep, setActiveStep] = React.useState(0);
  const [openVideo, setOpenVideo] = useState(false);
  const [courseVideos, setCourseVideos] = useState([])
  const [courseVideoNames, setCourseVideoNames] = useState([])
  const topics = useSelector(state => state.data.topics)
  const loading = useSelector(state => state.UI.loading)
  const uploadSuccess = useSelector(state => state.courses.uploadSuccess)
  const currentTopic = useSelector(state => state.courses.topic)
  const courseId = useSelector(state => state.courses.courseId)
  const courseDrills = useSelector(state => state.courses.drills)
  const [drillVideos, setDrillVideos] = useState([])
  const [previewVideo, setPreviewVideo] = useState([])
  const [drillVideo, setDrillVideo] = useState([])
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

  const handleVideoClick = () => {
    document.getElementById('videoInput').click()
  }
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
      setDrillVideo([].concat(drillVideo, files))
      console.log(drillVideo)
    }, [drillVideo],
  )
  


  const handleTopic = (e) => {
    dispatch(setTopic(e.target.value))
    console.log(e);
  }

  const handleDrillName = (e) => {
    setDrillName(e.target.value)
  }
  const handleDrillMetrics = (e) => {
    setDrillMetrics([...drillMetrics, e.target.value])
  }

  const handleAddDrill = () => {
    dispatch(setDrills({
      drillName: drillName,
      drillMetrics: drillMetrics,
      topic: topics[currentTopic].name,
      type: drillType
    }))
  }

  useEffect(() => {
    dispatch(getTopicData());
  }, [dispatch])


  return (
    <div className={classes.root}>
      {activeStep === 0 &&

        <Paper>
          <div className={classes.step}>

            <Typography variant="h5">
              Upload Preview
                  </Typography>
            <TextField
              name="title"
              id="title"
              placeholder="Title"
              className={classes.instructions}
              variant="outlined"
              onChange={(e) => setTitle(e.target.value)}
              size="small"
            />

            <TextField
              name="description"
              placeholder="Description"
              variant="outlined"
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
              onSave={() => {
                console.log(previewVideo)
                setOpenVideo(false)
              }}

            />

            <Dialog open={loading}  >
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
              variant="outlined"
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
              onSave={() => {
                console.log()
                setOpenVideo(false)
              }}
              
            />   
            <Dialog open={loading}  >
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
              label="Drill Name"
              multiline
              rows="1"
              placeholder="The name of your drill?"
              className={classes.textField, classes.instructions}
              onChange={handleDrillName}
              fullWidth
            />

            <TextField
              name="metrics"
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

            <div className="image-wrapper">

              <input type="file"
                id="videoInput"
                hidden="hidden"
                onChange={handleDrillVideo}

              />
              <MyButton

                onClick={handleVideoClick}
                btnClassName="button"
              >
                <AddIcon color="primary" />
                <Typography variant="body1">
                  Add Video Instruction To Your Drill
                                        </Typography>
              </MyButton>
            </div>
            {drillVideos && drillVideos[0] &&
              <Chip

                label={drillVideos[0].name}
              />

            }



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

          </div>
        </Paper>



      }

      <div className={classes.instructions}>
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
