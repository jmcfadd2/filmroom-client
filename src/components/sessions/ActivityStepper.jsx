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
    color: theme.palette.primary.contrastText
  },
  actionsContainer: {
    marginBottom: theme.spacing(2),
    backgroundColor: theme.palette.secondary.dark
  },
  sessionCard: {
    backgroundColor: theme.palette.secondary.dark,
    justifyContent: "center"
  },
  resetContainer: {
    padding: theme.spacing(3),
    width: '50%',
    marginLeft: 'auto',
    marginRight: 'auto',
    backgroundColor: theme.palette.secondary.dark,

  },
  labelClass: {
    color: 'white'
  },
  numberField: {
    width: 100,
    height: 100,
    backgroundColor: theme.palette.primary.light,
    borderRadius: 10,
  },
  numberFieldInput: {
    width: 100,
    height: 100,
    borderRadius: 10,
    fontSize: 30,
    backgroundColor: theme.palette.primary.light,
  },
  metricContainer: {
    display: 'flex',
    justifyContent: 'space-around',
    marginTop: 20,
    marginBottom: 20,
  },
  forwardSlash: {
    fontSize: 70,
    color: 'white',

  }
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
    setResults({ ...results, compoundMetric: [e.target.value] })

    console.log(results);
  }
  const handleSecondCompoundMetric = (e) => {
    results.compoundMetric[1] = e.target.value
    console.log(results);
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
    }, [images],
  )


  return (

    <div>
      <Grid container >
        <Grid item sm />
        <Grid item sm xs={12}>

          {drills.map((drill, index) => (

            <div key={index}>
              { activeStep === index && <Card className={classes.sessionCard} key={index}>
                <CardContent >
                  <Typography color='textSecondary' variant="h6">{`${index + 1}.  ${drill.name}`}</Typography>
                  <hr />
                  <br />

                  {session.topic !== "eSports" ? (
                    <ReactPlayer
                      url={`https://stream.mux.com/${drill.drillVideoId}.m3u8`}
                      playing
                      
                      loop
                      height="100%"
                      width="100%"
                    />
                  ) : (
                      <DropzoneArea
                        showPreviewsInDropzone

                        onChange={handleImageAdded}

                      />
                    )
                  }

                  <form>
                    {drill.metrics.map((metric, index) => (

                      <div key={index}>

                        {metric.includes("/") || metric.includes(" x ") ? (
                          <div className={classes.metricContainer} key={index}>

                            <Textfield
                              key={index}
                              className={classes.numberField}
                              rows="1"
                              type="number"
                              label={metric.split(/(\sx\s|\/)/)[0]}
                              name={metric.split(/(\sx\s|\/)/)[0]}
                              defaultValue=""
                              InputLabelProps={{ className: classes.labelClass }}
                              InputProps={{
                                className: classes.numberFieldInput
                              }}
                              variant="filled"
                              onChange={handleFirstCompoundMetric}

                            />
                            <Typography className={classes.forwardSlash}>/</Typography>
                            <Textfield
                              key={index}
                              className={classes.numberField}
                              rows="1"
                              type="number"
                              label={metric.split(/(\sx\s|\/)/)[2]}
                              name={metric.split(/(\sx\s|\/)/)[2]}
                              InputLabelProps={{ className: classes.labelClass }}
                              InputProps={{ className: classes.numberFieldInput }}
                              defaultValue=""
                              variant="filled"
                              onChange={handleSecondCompoundMetric}

                            />
                          </div>
                        ) : (
                            <Textfield
                              key={index}
                              className={classes.numberField}
                              rows="1"
                              type="number"
                              label={metric}
                              InputProps={{ className: classes.numberFieldInput }}
                              name={metric}
                              defaultValue=""
                              variant="filled"
                              onChange={handleMetric}
                              size="small"
                            />
                          )}
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
                          if (activeStep === drills.length - 1 ) {
                            dispatch(stageSession(session))
                            props.stage()
                          }
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


    </div>
  );
}