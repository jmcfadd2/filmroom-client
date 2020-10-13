import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Textfield from '@material-ui/core/TextField'
import { useSelector, useDispatch } from 'react-redux';
import { updateResults, finishSession } from '../../redux/actions/dataActions';
import { Card, CardMedia, CardContent, CardActions } from '@material-ui/core';
import { Grid } from '@material-ui/core';
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

        <div>
            <Grid container >
                <Grid item sm />
                <Grid item sm>
                    {console.log(drills)}
                    {drills.map((drill, index) => (

                        <div>
                            { activeStep === index && <Card key={index}>
                                <CardContent style={{justifyContent: "center"}}>
                                    <Typography variant="h6">{drill.name}</Typography>
                                    <hr/>
                                    <br/>
                                    <br/>
                                    <form>
                                        {drill.metrics.map((metric, index) => ( 

                                            <div>
                                                {metric.includes("/") || metric.includes(" x ") ? 
                                                <div>
                                                    
                                                    <Textfield
                                                        className={classes.numberField}
                                                        rows="1"
                                                        type="number"
                                                        label={metric.split("/")[0]}
                                                        name={metric.split("/")[0]}
                                                        defaultValue="0"
                                                        variant="standard"
                                                        onChange={e => setResults({ [e.target.name]: e.target.value })}
                                                        size="small"
                                                    /> 
                                                    <Textfield
                                                        className={classes.numberField}
                                                        rows="1"
                                                        type="number"
                                                        label={metric.split("/")[1]}
                                                        name={metric.split("/")[1]}
                                                        defaultValue="0"
                                                        variant="standard"
                                                        onChange={e => setResults({ [e.target.name]: e.target.value })}
                                                        size="small"
                                                    /> 
                                                </div> :
                                                <Textfield
                                                    className={classes.numberField}
                                                    rows="1"
                                                    type="number"
                                                    label={metric}
                                                    name={metric}
                                                    defaultValue="0"
                                                    variant="standard"
                                                        onChange={e => setResults({ [e.target.name]: e.target.value })}
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
                            dispatch(finishSession(currentSession))

                        }, props.stage}
                        className={classes.button}>
                        Finish Session
              </Button>
                </Paper>

            )}
        </div>
    );
}