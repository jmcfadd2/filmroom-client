import React, { useEffect, useState, useCallback } from 'react'
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import MyButton from '../../util/MyButton';
import { DropzoneDialog } from 'material-ui-dropzone';
import AddIcon from '@material-ui/icons/Add'
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box'
import { makeStyles } from '@material-ui/core/styles';
import { useSelector, useDispatch } from 'react-redux';
import { postSession } from '../../redux/actions/dataActions'
import { Dialog, DialogContent, DialogContentText, Grid, LinearProgress, Chip, CircularProgress } from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
  ...theme.spreadThis,
  textInput: {
    backgroundColor: theme.palette.primary.light
  },
  metricInput: {
    marginHorizontal: 30,
    width: 40,
  },
  metricInputTitle: {
    width: 20,
  },
  dialog: {
    backgroundColor: theme.palette.primary.dark
  }

}))


export default function StageSession() {
  const classes = useStyles()
  const session = useSelector(state => state.data.session)
  const userImage = useSelector(state => state.user.credentials.imageUrl)
  const loading = useSelector(state => state.UI.loading)
  const progress = useSelector(state => state.UI.progress)
  const videoStatus = useSelector(state => state.UI.videoStatus)
  const [description, setDescription] = useState("")
  const [title, setTitle] = useState("")
  const [videos, setVideos] = useState([])
  const [images, setImages] = useState([])
  const [openVideo, setOpenVideo] = useState(false);
  const [openImage, setOpenImage] = useState(false);

  const handleVideoClick = () => {
    setOpenVideo(true)
  }
  const handleAddVideo = useCallback(
    (files) => {
      setVideos([].concat(videos, files))
      console.log(videos)
    }, [videos],
  )
  const handleImageClick = () => {
    setOpenImage(true)
  }
  const handleAddImage = useCallback(
    (files) => {
      setImages([].concat(images, files))
      console.log(images)
    }, [images],
  )
  const dispatch = useDispatch()

  useEffect(() => {
    setTitle(document.getElementById('title').value)
    console.log(userImage);
  }, [title, userImage])
  return (
    <div>

      <Paper className={classes.formPaper}>
        <Box justifyItems="center">
          <Box >
            <Typography color='textSecondary' variant="h4"> Completed Drills </Typography>
            <br />
            <hr />

          </Box>
          <Grid container justify="space-around" >
            <Grid spacing={4} item />
            {session.drillResults.map((result, index) => (
              <div className={classes.metricContainer}>
              
                <Typography noWrap color='textSecondary'  variant="body2">{result.drillName}</Typography>
                <br />

                  <Typography color='textSecondary'>
                    {Object.values(result.results.compoundMetric)[0]}/{Object.values(result.results.compoundMetric)[1]} {(Object.values(result.results.compoundMetric)[0] / Object.values(result.results.compoundMetric)[1] * 100).toPrecision(3)}%
                    </Typography>
                </div>

            ))}
            <Grid item />
          </Grid>
          <hr />
          <Grid container >
            <Grid item sm />
            <Grid item justify="center">
              <Typography color='textSecondary' variant="h6"> Describe Session </Typography>
              <TextField
                name="title"
                id="title"
                defaultValue={`${session.topic} ${session.type} session`}
                variant="filled"
                inputProps={{ className: classes.textInput }}
                onChange={(e) => setTitle(e.target.value)}
                size="small"
              />
              <br />
              <br />
              <TextField
                name="description"
                placeholder="Description"
                variant="filled"
                inputProps={{ className: classes.textInput }}
                multiline
                onChange={(e) => setDescription(e.target.value)}
                rows={5}
              />
            </Grid>

            <Grid item sm />
          </Grid>

          <Grid container justify="center">
            <Grid item />
            <Grid item>
              <DropzoneDialog
                acceptedFiles={['video/*']}
                cancelButtonText={"cancel"}
                submitButtonText={"Add Videos"}
                maxFileSize={10000000}
                open={openVideo}
                onClose={() => setOpenVideo(false)}
                onDrop={handleAddVideo}
                onSave={() => {
                  console.log(videos)
                  setOpenVideo(false)
                }}
                showPreviews={true}
                showFileNamesInPreview={true}
              />
              <MyButton

                onClick={handleVideoClick}
                btnClassName="button"
              >
                <AddIcon color="primary" />
                <Typography color='textSecondary' variant="body1">
                  Add Video To Your Post
                </Typography>
              </MyButton>
              {videos.map((video, index) => (
                <Chip
                  key={index}
                  label={`${index + 1}. ${video.name}`}

                />
              ))}
              <br />
              <DropzoneDialog
                acceptedFiles={['image/*']}
                cancelButtonText={"cancel"}
                submitButtonText={"Add Images"}
                maxFileSize={10000000}
                open={openImage}
                onClose={() => setOpenImage(false)}
                onDrop={handleAddImage}
                onSave={() => {
                  console.log(images[0].name)
                  setOpenImage(false)
                }}
                showPreviews={true}
                showFileNamesInPreview={true}
              />
              <MyButton

                onClick={handleImageClick}
                btnClassName="button"

              >
                <AddIcon color="primary"></AddIcon>
                <Typography color='textSecondary' variant="body1">
                  Add Images To Your Post
                </Typography>
              </MyButton>
              {images.map((image, index) => (
                <Chip
                  key={index}
                  label={`${index + 1}. ${image.name}`}

                />
              ))}

              <Grid container>
                <Grid item />
                <Grid item>
                  <Button variant="contained" onClick={async () => {
                    console.log(videos.length);
                    await dispatch(postSession(session.sessionId, {
                      session: session,
                      description: description,
                      title: title,
                      userImage: userImage,
                      videoCount: videos.length
                    }, videos, images))

                  }}> Post Session </Button>
                  <Dialog open={loading} className={classes.dialog}>
                    <DialogContent>
                      <DialogContentText color="textPrimary">
                        {videoStatus !== null ? videoStatus : <CircularProgress size={30} />}
                      </DialogContentText>

                      <LinearProgress variant="determinate" lab value={progress} />
                    </DialogContent>
                  </Dialog>
                </Grid>
                <Grid item />
              </Grid>
            </Grid>
            <Grid item />
          </Grid>
        </Box>
      </Paper>
    </div>
  )
}
