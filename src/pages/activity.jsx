import React, { Component } from 'react'
import MyButton from '../util/MyButton';
import Timer from 'react-compound-timer'
import ActivityStepper from '../components/sessions/ActivityStepper'

import Paper from '@material-ui/core/Paper'
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'



import { connect } from 'react-redux'


const styles = (theme) => ({
    ...theme.spreadThis
})

export class activity extends Component {

    render() {
        

        
        
        return (
            <Box display="flex" justifyContent="center">
                <Grid md={6} justify="center">
                        <Paper >
                                <Timer
                                >
                                    {({ start, resume, pause, stop, reset, }) => (
                                        <React.Fragment>
        
                                            <Timer.Minutes /> :
                                            <Timer.Seconds />
        
                                        </React.Fragment>
                                    )}
                                </Timer>
                            <ActivityStepper />
    
                        </Paper>
                        
                </Grid>
            </Box>


        )
    }
}

const mapStateToProps = (state) => ({
    UI: state.UI,
    data: state.data
})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(activity))
