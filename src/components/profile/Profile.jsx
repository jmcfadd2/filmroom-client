import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import { Link } from 'react-router-dom'
import dayjs from 'dayjs'
import EditDetails from './EditDetails';
import MyButton from '../../util/MyButton';
import ProfileSkeleton from '../../util/ProfileSkeleton';
// MUI
import Button from '@material-ui/core/Button';
import { Paper } from '@material-ui/core';
import MuiLink from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography'
// Redux
import { connect } from 'react-redux'
import { logoutUser, uploadImage, changeUserPicture } from '../../redux/actions/userActions'



// Icons 
import LocationOn from '@material-ui/icons/LocationOn'
import LinkIcon from '@material-ui/icons/Link'
import CalendarToday from '@material-ui/icons/CalendarToday'
import EditIcon from '@material-ui/icons/Edit'
import KeyboardReturn from '@material-ui/icons/KeyboardReturn'




const styles = (theme) => ({
  ...theme.spreadThis
});

export class Profile extends Component {

  handleImageChange = async (event) => {
    const handle = this.props.user.credentials.handle
    const image = event.target.files[0]
    this.props.changeUserPicture(image, handle)
  }
  handleEditPicture = () => {
    const fileInput = document.getElementById('imageInput')
    fileInput.click()
  }
  handleLogout = () => {
    this.props.logoutUser()
  }
  render() {
    const { classes,
      user: { credentials: { handle, createdAt, imageUrl, bio, website, location }, loading,
        authenticated
      }
    } = this.props;
    let profileMarkup = !loading ? (authenticated ? (
      <Paper className={classes.paper}>
        <div className={classes.profile}>
          <div className="image-wrapper">
            <img src={imageUrl} alt="profile" className="profile-image" />
            <input type="file"
              id="imageInput"
              hidden="hidden"
              accept="image/png, image/jpeg"
              onChange={this.handleImageChange}
            />
            <MyButton
              tip="Edit profile picture"
              onClick={this.handleEditPicture}
              btnClassName="button"
            >
              <EditIcon color="primary" />
            </MyButton>
          </div>
          <hr />
          <div className="profile-details">
            <MuiLink component={Link} to={`/users/${handle}`} color="primary" variant="h5">
              @{handle}
            </MuiLink>
            <hr />
            {bio && <Typography color={'textSecondary'} variant="body2">{bio}</Typography>}
            <hr />
            {location && (
              <Fragment>
                <LocationOn color={'primary'} />
                <Typography color='textSecondary'>{location}</Typography>
                <hr />
              </Fragment>
            )}
            {website && (
              <Fragment>
                <LinkIcon color={'primary'} />
                <a href={website} target="_blank" rel="noopener noreferrer">
                  {' '}{website}
                </a>
                <hr />
              </Fragment>
            )}
            <CalendarToday color="primary" /> {' '}
            <Typography color='textSecondary'>Joined {dayjs(createdAt).format('MMM YYYY')}</Typography>
          </div>
          <MyButton tip="Logout" onClick={this.handleLogout}>
            <KeyboardReturn color="primary" />
          </MyButton>
          <EditDetails />
        </div>
      </Paper>
    ) : (
      <Paper className={classes.paper}>
        <Typography variant="body2" color={'textSecondary'} align="center">
          No profile found, please login again
            </Typography>
        <div className={classes.buttons}>
          <Button
            variant="contained"
            color="primary"
            component={Link}
            id='login'
            to="/login"
          >
            Login
          </Button>
          <Button
            variant="contained"
            color="primary"
              component={Link}
              id='signup'
            to="/signup"
          >
            Sign Up
          </Button>
        </div>
      </Paper>
    )) : (<ProfileSkeleton />)
    return profileMarkup;
  }
}

const mapStateToProps = (state) => ({
  user: state.user
});

const mapActionsToProps = { logoutUser, uploadImage, changeUserPicture }




Profile.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  uploadImage: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired
}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(Profile));
