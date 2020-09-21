import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import MyButton from '../util/MyButton';
import CreateDrill from '../components/sessions/CreateDrill';
// MUI Stuff
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import CircularProgress from '@material-ui/core/CircularProgress';
import CloseIcon from '@material-ui/icons/Close';
import Paper from '@material-ui/core/Paper';
// Redux stuff
import { connect } from 'react-redux';
import { createSession, setSession, clearErrors } from '../redux/actions/dataActions';
import { Typography } from '@material-ui/core';

const styles = (theme) => ({
    ...theme.spreadThis,
    formPaper: {
        padding: '10vh 10vh',
        width: '50vh',
        marginLeft: 'auto',
        marginRight: 'auto',
        

    },
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

    state = {
        open: false,
        errors: {}
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
    handleChange = (event) => {
        this.props.setSession({ [event.target.name]: event.target.value });
        
    };
    handleSubmit = (event) => {
        event.preventDefault();
        this.props.createSession({
            topic: this.props.data.topic,
            type: this.props.data.type,
            drills: this.props.data.drills

        });
    };
    

    render() {
        const { errors } = this.state;
        const {
            classes,
            UI: { loading }
        } = this.props;
        return (
            <Paper className={classes.formPaper}>
                <Typography variant={"h5"}>What kind of session?</Typography>
                <form onSubmit={this.handleSubmit}>
                    <TextField
                        name="topic"
                        type="text"
                        label="Topic"
                        multiline
                        rows="1"
                        placeholder="What sport/activity are you tracking?"
                        error={errors.body ? true : false}
                        helperText={errors.body}
                        className={classes.textField}
                        onChange={this.handleChange}
                        fullWidth
                    />
                    <TextField
                        name="type"
                        type="text"
                        label="Type"
                        multiline
                        rows="1"
                        placeholder="What type of session is it?"
                        error={errors.body ? true : false}
                        helperText={errors.body}
                        className={classes.textField}
                        onChange={this.handleChange}
                        fullWidth
                    />
                    <Fragment>
                    <CreateDrill> Create New Drill </CreateDrill>
                    </Fragment>
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        className={classes.submitButton}
                        disabled={loading}
                        
                    >
                        Submit
                {loading && (
                            <CircularProgress
                                size={30}
                                className={classes.progressSpinner}
                            />
                        )}
                    </Button>
                </form>
            </Paper>
        )
    }
}

session.propTypes = {
    createSession: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired,
    UI: PropTypes.object.isRequired,
    data: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    UI: state.UI,
    data: state.data

});




export default connect(mapStateToProps, { createSession, setSession, clearErrors })(withStyles(styles)(session))
