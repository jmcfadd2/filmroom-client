import React, { useState } from 'react'
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
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
                <Typography> Finalize Details </Typography>
                
                <TextField
                    name="title"
                    placeholder="Session Title"
                    variant="outlined"
                    onChange={(e) => setTitle(e.target.value)}
                />
                <br />
                <TextField
                    name="description"
                    placeholder="Description"
                    variant="outlined"
                    multiline
                    onChange={(e) => setDescription(e.target.value)}
                    rows={5}
                />
                <Typography variant="h3"> Drills Completed </Typography>
                <Grid>
                    {session.drillResults.map((result, index) => (
                        <Grid item xs={6} key={index}>
                            <Typography variant="h5"> 
                            {result.drillName}
                            </Typography>
                            <br/>
                            <Typography variant="body1">
                                {result.results.field1}/{result.results.field2}
                            </Typography>
                        </Grid>
                    ))}
                </Grid>
                <Button variant="contained" onClick={() => {
                    dispatch( postSession(session.sessionId, {
                        session: session,
                        description: description,
                        title: title
                    }) )
                }}> Post Session </Button>
            </Paper>
        </div>
    )
}
