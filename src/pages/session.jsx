import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import CreateDrill from '../components/sessions/CreateDrill';
import DrillTimeline from '../components/sessions/DrillTimeline'
import StageSession from '../components/sessions/StageSession'
import firebase from '../util/firebase'
// MUI Stuff
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import CircularProgress from '@material-ui/core/CircularProgress';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem'
// Redux stuff
import { connect } from 'react-redux';
import { setTopic, setType, clearErrors, getTopicData } from '../redux/actions/dataActions';
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
        this.handleStart = this.handleStart.bind(this)
        this.state = {
            currentTopicIndex: 0,
        }
    }

    state = {
        open: false,
        errors: {},
        currentTopicIndex: 0,
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
    getTopics = () => {
        this.props.getTopicData()
        console.log(this.props.data.topics)
    }
    handleOpen = () => {
        this.setState({ open: true });
    };
    handleClose = () => {
        this.props.clearErrors();
        this.setState({ open: false, errors: {} });
    };
    handleTopic = (event) => {
        let topicIndex = event.target.value
        this.props.setTopic(this.props.data.topics[topicIndex].name);
        this.setState({ currentTopicIndex: topicIndex})
    };
    handleType = (event) => {
        this.props.setType(event.target.value);
    };
    handleStart = (event) => {
        event.preventDefault();
        this.setState({ sessionCreated: true });
    };
    handleStage = (event) => {

        this.setState({ sessionStaged: true });
    };

    componentDidMount() {
        this.getTopics()
    }


    render() {
        const { errors, sessionCreated, sessionStaged, currentTopicIndex} = this.state;
        const {
            classes,
            data: { topics },
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

                            
                            className={classes.textField}
                            onChange={this.handleTopic}
                            fullWidth
                        >
                            {topics.map((topic, index) => (
                                <MenuItem key={index} value={index}>
                                    {topic.name}
                                </MenuItem>
                            ))}



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
                            {topics[0] && topics[currentTopicIndex].sessionTypes.map((type, index) => (
                                <MenuItem key={index} value={type}>
                                    {type}
                                </MenuItem>
                            ))}
                        </TextField>
                        <DrillTimeline />
                        <Fragment>
                            <AddDrill index={this.state.currentTopicIndex}/>
                            <CreateDrill index={this.state.currentTopicIndex}/>
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
    getTopicData: PropTypes.func.isRequired,
    UI: PropTypes.object.isRequired,
    data: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    UI: state.UI,
    data: state.data

});




export default connect(mapStateToProps, { setTopic, setType, clearErrors, getTopicData })(withStyles(styles)(session))
