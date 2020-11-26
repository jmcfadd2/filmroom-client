import React, { useEffect, useState, useCallback } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import MyButton from '../util/MyButton';
import { useSelector, useDispatch } from 'react-redux';
import AddIcon from '@material-ui/icons/Add'
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { Paper, Chip, Divider, MenuItem } from '@material-ui/core';
import { DropzoneDialog } from 'material-ui-dropzone';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '70%',
    marginRight: "auto",
    marginLeft: "auto"
  },
  backButton: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));
export default function VideoUploadStep() {
  const [openVideo, setOpenVideo] = useState(false);
  const [videos, setVideos] = useState([])
  const topics = useSelector(state => state.data.topics)
  
  const handleVideoClick = () => {
    setOpenVideo(true)
  }
  const handleAddVideo = useCallback(
    (files) => {
      setVideos([].concat(videos, files))
      console.log(videos)
    }, [videos],
  )

  const handleTopic = (e) => {
    let topicIndex = e.target.value
    this.props.setTopic(this.props.data.topics[topicIndex].name);
    this.setState({ currentTopicIndex: topicIndex })
  }


  return (
    <div>

      <StepLabel>Upload Training Videos</StepLabel>
      <Divider />
      <Typography>Add Videos</Typography>
      <Typography>Split your training into videos teaching specific concepts you want your players to learn and/or add content explaining the drills you'll add in the next step</Typography>
      <TextField
        name="topic"
        select
        label="Sport"
        variant="outlined"


        className={classes.textField}
        onChange={handleTopic}
        fullWidth
      >
        {topics.map((topic, index) => (
          <MenuItem key={index} value={index}>
            {topic.name}
          </MenuItem>
        ))}
      </TextField>
      <DropzoneDialog
        acceptedFiles={['video/*']}
        cancelButtonText={"cancel"}
        submitButtonText={"Add Videos"}
        multiple
        maxFileSize={100000000}
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
        <Typography variant="body1">
          Add Video To Your Post
                                      </Typography>
      </MyButton>
      <Divider />
      {videos.map((video, index) => (
        <Chip
          key={index}
          label={`${index + 1}. ${video.name}`}

        />
      ))}

    </div>
  )
}
