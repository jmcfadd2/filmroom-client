import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import MyButton from '../../util/MyButton';
// MUI Stuff
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import CircularProgress from '@material-ui/core/CircularProgress';
import AddIcon from '@material-ui/icons/Add'
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography'
// Redux stuff
import { connect } from 'react-redux';
import { addNewDrill, setSession, clearErrors } from '../../redux/actions/dataActions';

const styles = (theme) => ({
    ...theme.spreadThis,
    submitButton: {
        position: 'relative',
        float: 'right',
        marginTop: 10
    },
    progressSpinner: {
        position: 'absolute'
    },
    closeButton: {
        position: 'absolute',
        left: '91%',
        top: '1%'
    }
});

class CreateDrill extends Component {
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
            this.setState({ open: false, errors: {} });
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
        this.setState({ [event.target.name]: event.target.value });
    };
    sendDrill = (event) => {
        event.preventDefault();
        this.props.addNewDrill({
            topic: this.state.topic,
            metrics: this.state.metrics,
            name: this.state.name
        });
    };
    render() {
        const { errors } = this.state;
        const {
            classes,
            UI: { loading }
        } = this.props;
        return (
            <Fragment>
                <MyButton onClick={this.handleOpen} tip="Create New Drill">
                    <AddIcon> Create New Drill </AddIcon>
                    <Typography variant={"h6"}>Create New Drill</Typography>

                </MyButton>
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    fullWidth
                    maxWidth="sm"
                >
                    <MyButton
                        tip="Close"
                        onClick={this.handleClose}
                        tipClassName={classes.closeButton}
                    >
                        <CloseIcon />
                    </MyButton>
                    <DialogTitle>Create a Drill</DialogTitle>
                    <DialogContent>
                        <form >
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
                                name="name"
                                type="text"
                                label="Drill Name"
                                multiline
                                rows="1"
                                placeholder="The name of your drill?"
                                error={errors.body ? true : false}
                                helperText={errors.body}
                                className={classes.textField}
                                onChange={this.handleChange}
                                fullWidth
                            />
                            <TextField
                                name="metrics"
                                type="text"
                                label="Repps"
                                multiline
                                rows="1"
                                placeholder="How are you tracking your Repps"
                                error={errors.body ? true : false}
                                helperText={errors.body}
                                className={classes.textField}
                                onChange={this.handleChange}
                                fullWidth
                            />
                            <Button
                                type="sendDrill"
                                variant="contained"
                                color="primary"
                                className={classes.submitButton}
                                disabled={loading}
                                onClick={this.sendDrill}
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
                    </DialogContent>
                </Dialog>
            </Fragment>
        );
    }
}

CreateDrill.propTypes = {
    addNewDrill: PropTypes.func.isRequired,
    setSession: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired,
    UI: PropTypes.object.isRequired,
    data: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    UI: state.UI,
    data: state.data
});

export default connect(
    mapStateToProps,
    { addNewDrill, setSession, clearErrors }
)(withStyles(styles)(CreateDrill));
