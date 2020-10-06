import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import CreateDrill from '../components/sessions/CreateDrill';
import DrillTimeline from '../components/sessions/DrillTimeline'
import StageSession from '../components/sessions/StageSession'
// MUI Stuff
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import CircularProgress from '@material-ui/core/CircularProgress';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem'
// Redux stuff
import { connect } from 'react-redux';
import { setTopic, setType, clearErrors } from '../redux/actions/dataActions';
import { Typography } from '@material-ui/core';
import ActivityStepper from '../components/sessions/ActivityStepper';
import AddDrill from '../components/sessions/AddDrill';

const styles = (theme) => ({
    ...theme.spreadThis,
    textField: {
        marginTop: '8vh'
    },
    submitButton: {
        marginTop: '8vh',
        marginLeft: 'auto',
        marginRight: 'auto'
    },
    progressSpinner: {
        position: 'absolute'
    },
    closeButton: {
        position: 'absolute',
        left: '91%',
        top: '1%',
    }
});


export class session extends Component {
    constructor(props) {
        super(props);
        this.handleStage = this.handleStage.bind(this)
    }
    
    state = {
        open: false,
        errors: {},
        sessionCreated: false,
        sessionStaged: false,
    };
    
    componentWillReceiveProps(nextProps) {
        if (nextProps.UI.errors) {
            this.setState({
                errors: nextProps.UI.errors
            });
        }
        if (!nextProps.UI.errors && !nextProps.UI.loading) {
            this.setState({ body: '', open: false, errors: {} });
        }
    }
    handleOpen = () => {
        this.setState({ open: true });
    };
    handleClose = () => {
        this.props.clearErrors();
        this.setState({ open: false, errors: {} });
    };
    handleTopic = (event) => {
        this.props.setTopic( event.target.value);
    };
    handleType = (event) => {
        this.props.setType( event.target.value);
    };
    handleStart = (event) => {
        event.preventDefault();
        this.setState({ sessionCreated: true });
    };
    handleStage = (event) => {
        
        this.setState({ sessionStaged: true });
    };
    

    render() {
        const { errors, sessionCreated, sessionStaged } = this.state;
        const {
            classes,
            UI: { loading }
        } = this.props;
        return (
            <Fragment>
                { !sessionCreated && !sessionStaged && <Paper className={classes.formPaper}>
                    <Typography variant={"h5"}>What kind of session?</Typography>
                    <form onSubmit={this.handleStart}>
                        <TextField
                            name="topic"
                            select
                            label="Sport"
                            variant="outlined"
                            
                            error={errors.body ? true : false}
                            helperText={errors.body}
                            className={classes.textField}
                            onChange={this.handleTopic}
                            fullWidth
                        >
                            <MenuItem value="Basketball">
                                Basketball
                            </MenuItem>
                            <MenuItem value="eSports">
                                eSports
                            </MenuItem>
                            <MenuItem value="Soccer">
                                Soccer
                            </MenuItem>
                            <MenuItem value="Football">
                                Football
                            </MenuItem>
                            <MenuItem value="Baseball">
                                Baseball
                            </MenuItem>
                        </TextField>
                        <TextField
                            name="type"
                            select
                            label="Session Type"
                            variant="outlined"
                            className={classes.textField}
                            onChange={this.handleType}
                            fullWidth
                        >
                            <MenuItem value="Skill Session">
                                Skill Session
                            </MenuItem>
                            <MenuItem value="Team Practice">
                                Team Practice
                            </MenuItem>
                            <MenuItem value="Team Game">
                                Team Game
                            </MenuItem>
                        </TextField>
                        <DrillTimeline />
                        <Fragment>
                        <AddDrill> Add Your Drills </AddDrill>
                        <CreateDrill> Create New Drill </CreateDrill>
                        </Fragment>
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            className={classes.submitButton}
                            disabled={loading}
                        
                        >
                            Start Session
                    {loading && (
                                <CircularProgress
                                    size={30}
                                    className={classes.progressSpinner}
                                />
                            )}
                        </Button>
                    </form>
                </Paper>}
                <div className="stepper-wrapper">
                    {sessionCreated && !sessionStaged && <ActivityStepper stage={this.handleStage} />}
                </div>
                {sessionStaged && <StageSession />}
            </Fragment>
        )
    }
}

session.propTypes = {
    clearErrors: PropTypes.func.isRequired,
    UI: PropTypes.object.isRequired,
    data: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    UI: state.UI,
    data: state.data

});




export default connect(mapStateToProps, { setTopic, setType, clearErrors })(withStyles(styles)(session))
