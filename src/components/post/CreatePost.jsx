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
// Redux stuff
import { connect } from 'react-redux';
import { createPost, clearErrors } from '../../redux/actions/dataActions';
import { Typography } from '@material-ui/core';

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

class CreatePost extends Component {
    state = {
        open: false,
        body: '',
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
        this.setState({ [event.target.name]: event.target.value });
    };

    handleAddVideo = () => {
        const fileInput = document.getElementById('videoInput')
        fileInput.click()
    }
    handleAddImage = () => {
        const fileInput = document.getElementById('imageInput')
        fileInput.click()
    }



    handleSubmit = (event) => {
        event.preventDefault();
        const video = document.getElementById('videoInput').files[0]
        const image = document.getElementById('imageInput').files[0]
        this.props.createPost({ body: this.state.body, userImage: this.props.user.imageUrl }, video, image);
    };
    render() {
        const { errors } = this.state;
        const {
            classes,
            UI: { loading }
        } = this.props;
        return (
            <Fragment>
                <MyButton onClick={this.handleOpen} tip="Create a Post!">
                    <Typography variant="h6">Post</Typography>
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
                    <DialogTitle>Create a post</DialogTitle>
                    <DialogContent>
                        <form onSubmit={this.handleSubmit}>
                            <TextField
                                name="body"
                                type="text"
                                label="Post"
                                multiline
                                rows="3"
                                placeholder="Share your progress"
                                error={errors.body ? true : false}
                                helperText={errors.body}
                                className={classes.textField}
                                onChange={this.handleChange}
                                fullWidth
                            />
                            <div className="image-wrapper">

                                <input type="file"
                                    id="videoInput"
                                    hidden="hidden"

                                />
                                <MyButton

                                    onClick={this.handleAddVideo}
                                    btnClassName="button"
                                >
                                    <AddIcon color="primary" />
                                    <Typography variant="body1">
                                        Add Video To Your Post
                                    </Typography>
                                </MyButton>
                            </div>

                            <div className="image-wrapper">
                                <input type="file"
                                    id="imageInput"
                                    hidden="hidden"
                                    onChange={this.handleAddImage}
                                />
                                <MyButton

                                    onClick={this.handleAddImage}
                                    btnClassName="button"
                                >
                                    <AddIcon color="primary"></AddIcon>
                                    Add Pictures
                                </MyButton>
                            </div>
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
                    </DialogContent>
                </Dialog>
            </Fragment>
        );
    }
}

CreatePost.propTypes = {
    createPost: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired,
    UI: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    UI: state.UI,
    user: state.user
});

export default connect(
    mapStateToProps,
    { createPost, clearErrors }
)(withStyles(styles)(CreatePost));
