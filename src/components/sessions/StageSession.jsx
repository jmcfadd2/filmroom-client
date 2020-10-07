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
                <Box>
                    <Box mx="auto">
                    	<Typography variant="h4"> Finalize Details </Typography>
                    </Box>
                    
                    <Box my={1}>
                        <TextField
                            name="title"
                            placeholder="Session Title"
                            variant="outlined"
                            onChange={(e) => setTitle(e.target.value)}
                            size="small"
                        />
                    </Box>
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
                    <Box mx="auto">
                        <Typography variant="h5"> Completed Drills </Typography>
                    </Box>
                    <Grid container justify="center" >
                        {session.drillResults.map((result, index) => (
                            <Box mx="auto">
                                <Grid item key={index}>
                                    <Typography variant="h6"> 
                                    {result.drillName}
                                    </Typography>
                                    <br/>
                                    <Box mx="20%" mt="10%">
                                        <Typography variant="body1">
                                            {result.results.field1}/{result.results.field2}
                                        </Typography>
                                    </Box>
                                </Grid>
                            </Box>
                        ))}
                    </Grid>
                    <Button variant="contained" onClick={() => {
                        dispatch( postSession(session.sessionId, {
                            session: session,
                            description: description,
                            title: title
                        }) )
                    }}> Post Session </Button>
                </Box>
            </Paper>
        </div>
    )
}
