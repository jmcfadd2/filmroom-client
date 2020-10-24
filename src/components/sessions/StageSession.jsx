import React, { useState } from 'react'
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box'
import { makeStyles } from '@material-ui/core/styles';
import { useSelector, useDispatch } from 'react-redux';
import { postSession } from '../../redux/actions/dataActions'
import { Grid } from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
    ...theme.spreadThis,
}))


export default function StageSession() {
    const classes = useStyles()
    const session = useSelector(state => state.data.session)
    const [description, setDescription] = useState("")
    const [title, setTitle] = useState("")
    const dispatch = useDispatch()
    return (
        <div>
            <Paper className={classes.formPaper}>
                <Box justifyItems="center">
                    <Box >
                        <Typography variant="h4"> Completed Drills </Typography>
                        <br />
                        <hr />

                    </Box>
                    <Grid container justify="center" >
                        <Grid item />
                        {session.drillResults.map((result, index) => (
                            <Grid item spacing={2} key={index}>
                                <Typography variant="body1">{result.drillName}</Typography>
                                <br />
                                {!result.results.compoundMetric ? Object.entries(result.results).map(([metric, value], index) => (
                                    <div key={index}>
                                        <Typography variant="body2">{metric}</Typography>
                                        <br />
                                        <Typography variant="body2">{value}</Typography>
                                    </div>
                                )) : <div>
                                        <Typography> {Object.keys(result.results.compoundMetric)[0]}/{Object.keys(result.results.compoundMetric)[1]}</Typography>

                                        <Typography> {Object.values(result.results.compoundMetric)[0]}/{Object.values(result.results.compoundMetric)[1]} {(Object.values(result.results.compoundMetric)[0] / Object.values(result.results.compoundMetric)[1] * 100).toPrecision(3)}%</Typography>
                                    </div>

                                }
                            </Grid>

                        ))}
                        <Grid item />
                    </Grid>
                    <hr />
                    <Grid container >
                        <Typography variant="h6"> Describe Session </Typography>
                        <Grid my={1}>
                            <TextField
                                name="title"
                                defaultValue={`${session.topic} ${session.type} session`}
                                variant="outlined"
                                onChange={(e) => setTitle(e.target.value)}
                                size="small"
                            />
                        </Grid>
                        <br />
                        <Box my={2}>
                            <TextField
                                name="description"
                                placeholder="Description"
                                variant="outlined"
                                multiline
                                onChange={(e) => setDescription(e.target.value)}
                                rows={5}
                            />
                        </Box>
                    </Grid>

                    <Box my={5} mx="auto">
                        <Button variant="contained" href="/" onClick={() => {
                            dispatch(postSession(session.sessionId, {
                                session: session,
                                description: description,
                                title: title
                            }))
                        }}> Post Session </Button>
                    </Box>
                </Box>
            </Paper>
        </div>
    )
}
