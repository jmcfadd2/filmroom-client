import React, { useState, useCallback } from 'react';
import ReactPlayer from 'react-player'
import { DropzoneArea } from 'material-ui-dropzone'
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Textfield from '@material-ui/core/TextField'
import { useSelector, useDispatch, } from 'react-redux';
import { updateResults, stageSession } from '../../redux/actions/dataActions';
import { Card, CardContent } from '@material-ui/core';
import { Grid } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  ...theme.spreadThis,
  root: {
    width: '100%',
  },
  button: {
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  actionsContainer: {
    marginBottom: theme.spacing(2),
  },
  resetContainer: {
    padding: theme.spacing(3),
  },
}));



export default function ActivityStepper(props) {
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);
  const [results, setResults] = useState()
  const [images, setImages] = useState()
  const session = useSelector(state => state.data.session)
  const drills = useSelector(state => state.data.session.drills)


  const dispatch = useDispatch()

  const handleMetric = (e) => {
    setResults({ ...results, [e.target.name]: e.target.value })
  }
  // TODO Handle Edge Case of different
  const handleFirstCompoundMetric = (e) => {
    setResults({ ...results, compoundMetric: [e.target.value]})
  }
  const handleSecondCompoundMetric = (e) => {
    setResults({ ...results, compoundMetric: [...results.compoundMetric, e.target.value] })
  }

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setResults("")
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleImageAdded = useCallback(
    (files) => {
      setImages(files)
      console.log(images)
    },[images],
  )


  return (

    <div>
      <Grid container >
        <Grid item sm />
        <Grid item sm>

          {drills.map((drill, index) => (

            <div key={index}>
              { activeStep === index && <Card key={index}>
                <CardContent style={{ justifyContent: "center" }}>
                  <Typography variant="h6">{`${index + 1}.  ${drill.name}`}</Typography>
                  <hr />
                  <br />
                  <br />

                  {session.topic !== "eSports" ? <ReactPlayer url={`https://stream.mux.com/${drill.drillVideoId}.m3u8`} playing={true} controls={true} /> : 
                  <DropzoneArea
                    showPreviewsInDropzone={true}
                    
                    onChange={handleImageAdded}
                    
                  />
                  }

                  <form>
                    {drill.metrics.map((metric, index) => (

                      <div key={index}>

                        {metric.includes("/") || metric.includes(" x ") ?
                          <div key={index}>

                            <Textfield
                              key={index}
                              className={classes.numberField}
                              rows="1"
                              type="text"
                              label={metric.split(/(\sx\s|\/)/)[0]}
                              name={metric.split(/(\sx\s|\/)/)[0]}
                              defaultValue="0"
                              variant="standard"
                              onChange={handleFirstCompoundMetric}
                              size="small"
                            />
                            <Textfield
                              key={index}
                              className={classes.numberField}
                              rows="1"
                              type="number"
                              label={metric.split(/(\sx\s|\/)/)[2]}
                              name={metric.split(/(\sx\s|\/)/)[2]}
                              defaultValue="0"
                              variant="standard"
                              onChange={handleSecondCompoundMetric}
                              size="small"
                            />
                          </div> :
                          <Textfield
                            key={index}
                            className={classes.numberField}
                            rows="1"
                            type="number"
                            label={metric}
                            name={metric}
                            defaultValue="0"
                            variant="standard"
                            onChange={handleMetric}
                            size="small"
                          />}
                      </div>
                    ))}




                  </form>
                  <div className={classes.actionsContainer}>
                    <div>
                      {activeStep === 0 && <Button

                        onClick={handleBack}
                        className={classes.button}
                      >
                        Last Drill
                                    </Button>}
                      <Button
                        variant="contained"

                        color="primary"
                        onClick={() => {
                          handleNext();
                          dispatch(updateResults(results, drill.name, drill.drillId))
                        }}
                        className={classes.button}
                      >
                        {activeStep === drills.length - 1 ? 'Finish Drills' : 'Next Drill'}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>}
            </div>
          ))}
        </Grid>
        <Grid item sm />
      </Grid>

      {activeStep === drills.length && (

        <Paper square elevation={0} className={classes.resetContainer}>
          <Typography>All drills completed - you're finished</Typography>
          <Button
            onClick={() => {
              dispatch(stageSession(session))
              props.stage()
            }}
            className={classes.button}>
            Finish Session
              </Button>
        </Paper>

      )}
    </div>
  );
}