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
import { addNewDrill, clearErrors } from '../../redux/actions/dataActions';
import { Chip, MenuItem } from '@material-ui/core';

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
    errors: {},
    metrics: [],

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
    this.setState({ open: false, errors: {}, metrics: [] });
  };
  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };
  handleMetric = (event) => {
    this.setState({ metrics: [...this.state.metrics, event.target.value] })
    event.target.value = ""
    console.log(this.state.metrics)
  }

  handleButtonClick = () => {
    const fileInput = document.getElementById('videoInput')
    fileInput.click()

  }
  handleAddVideo = (e) => {
    this.setState({ videos: e.target.files })
  }

  sendDrill = async (event) => {
    event.preventDefault();

    await this.props.addNewDrill({
      topic: this.props.data.session.topic,
      type: this.props.data.session.type,
      metrics: this.state.metrics,
      name: this.state.name,
    }, document.getElementById('videoInput').files[0]);



  };
  render() {
    const { errors, metrics } = this.state;
    const {
      classes,
      data: { topics, session },
      UI: { loading }
    } = this.props;
    return (
      <Fragment>
        <MyButton onClick={this.handleOpen} tip="Create New Drill">
          <AddIcon></AddIcon>
          <Typography color='textSecondary' variant={"h6"}>Create New {session.topic ? topics[this.props.index].subActivity : "Drill"}</Typography>

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
          <DialogTitle>Create a new
                      {session.topic ? ` ${topics[this.props.index].name}  ${topics[this.props.index].subActivity}` : "Drill"}</DialogTitle>
          <DialogContent>
            <form >

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
              <div className="image-wrapper">

                <input type="file"
                  id="videoInput"
                  hidden="hidden"
                  onChange={this.handleAddVideo}

                />
                <MyButton

                  onClick={this.handleButtonClick}
                  btnClassName="button"
                >
                  <AddIcon color="primary" />
                  <Typography variant="body1">
                    Add Video Instruction To Your Drill
                                    </Typography>
                </MyButton>
              </div>
              {this.state.videos && this.state.videos[0] &&
                <Chip

                  label={this.state.videos[0].name}
                />

              }

              <TextField
                name="metrics"
                select
                label="Metrics"
                placeholder="How are you tracking your reps?"
                error={errors.body ? true : false}
                helperText={errors.body}
                className={classes.textField}
                onChange={this.handleMetric}
                fullWidth
              >
                {session.topic && topics[this.props.index].metrics.map((metric, index) => (
                  <MenuItem value={metric} key={index}>
                    {metric}
                  </MenuItem>
                ))}
              </TextField>

              {metrics.map((metric, index) => (
                <Typography key={index}>{metric}</Typography>
              ))}

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
  { addNewDrill, clearErrors, }
)(withStyles(styles)(CreateDrill));
