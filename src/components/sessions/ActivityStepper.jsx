import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Textfield from '@material-ui/core/TextField'
import { useSelector, useDispatch } from 'react-redux';
import { updateResults, finishSession } from '../../redux/actions/dataActions';
import { Box } from '@material-ui/core';
import { PlayCircleFilled } from '@material-ui/icons';

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
    const [results, setResults] = useState({ field1: 0, field2: 0 })
    const drills = useSelector(state => state.data.session.drills)
    const currentSession = {
        session: useSelector(state => state.data.session)
    }
    const dispatch = useDispatch()



    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };



    return (
        <div className={classes.root}>
            <Box width="80%"  mx="auto">
                <Stepper activeStep={activeStep} orientation="vertical">
                    {drills.map((drill, index) => (

                        <Step key={index}>
                            <StepLabel>{`Drill #${index + 1}`}</StepLabel>
                            <StepContent>
                                <Typography>{drill.name}</Typography>
                                
                                <form>
                                    <Textfield
                                        className={classes.numberField}
                                        rows="1"
                                        type="number"
                                        label="Makes"
                                        name="Makes"
                                        defaultValue={results.field1}
                                        variant="filled"
                                        onChange={e => setResults({ field1: e.target.value })}
                                        size="small"

                                    />
                                    /
                                    <Textfield
                                        className={classes.numberField}
                                        rows="1"
                                        type="number"
                                        label="Attempts"
                                        defaultValue={results.field2}
                                        variant="filled"
                                        onChange={e => setResults({ ...results, field2: e.target.value })}
                                        size="small"
                                    />


                                </form>
                                <div className={classes.actionsContainer}>
                                    <div>
                                        <Button
                                            disabled={activeStep === 0}
                                            onClick={handleBack}
                                            className={classes.button}
                                        >
                                            Back
                      </Button>
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            onClick={() => {
                                                handleNext();
                                                dispatch(updateResults(results, drill.name, drill.drillId))
                                            }}
                                            className={classes.button}
                                        >
                                            {activeStep === drills.length - 1 ? 'Finish Drills' : 'Next'}
                                        </Button>
                                    </div>
                                </div>
                            </StepContent>
                        </Step>
                    ))}
                </Stepper>
            </Box>
            {activeStep === drills.length && (
                <Box width="80%">
                    <Paper square elevation={0} className={classes.resetContainer}>
                        <Typography>All drills completed - you're finished</Typography>
                        <Button
                            onClick={() => {
                                dispatch(finishSession(currentSession))
    
                            }, props.stage}
                            className={classes.button}>
                            Finish Session
              </Button>
                    </Paper>
                </Box>
            )}
        </div>
    );
}