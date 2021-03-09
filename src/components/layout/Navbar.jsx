import React, { Component } from 'react'
import withStyles from '@material-ui/core/styles/withStyles';
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types';
import StartSession from '../sessions/StartSession';
import AppIcon from '../../images/reppit-text-logo.png'
import MenuIcon from '@material-ui/icons/Menu';
import { Drawer, IconButton, List, ListItem, Typography } from '@material-ui/core'
// Redux
import { connect } from 'react-redux'

// Material UI
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Notifications from './Notifications';
import MyButton from '../../util/MyButton';

// Icons 

const styles = (theme) => ({
  ...theme.spreadThis,
  root: {
    flexGrow: 1
  },
  logo: {
    marginTop: 27 ,
    height: 150,
    marginLeft: 25
  },
  drawer: {
    width: '40vh',
    backgroundColor: theme.palette.primary.light
  },
  list: {
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  buttons: {
    position: 'absolute',
    right: 40
  }

})

class Navbar extends Component {
  constructor(props) {
    super(props)
    this.state = { drawerOpen: false }
    this.handleOpenDrawer = this.handleOpenDrawer.bind(this)
    this.handleCloseDrawer = this.handleCloseDrawer.bind(this)
  }

  handleOpenDrawer() {
    this.setState({
      drawerOpen: true
    })
  }

  handleCloseDrawer() {
    this.setState({
      drawerOpen: false
    })
  }
  render() {

    const { authenticated, classes } = this.props
    const listMarkup = (

      <List className={classes.list}>
        <ListItem>
          <Link to="/session">
            <StartSession />
          </Link>
        </ListItem>
        {/* <ListItem>
          <CreatePost />
        </ListItem> */}
        <ListItem>
          <Link style={{ textDecoration: 'none' }} to="/learn">
            <MyButton tip='Watch a Course' >
              <Typography variant='h6' >Courses</Typography>
            </MyButton>
          </Link>
        </ListItem>
      </List>
    )
    return (

      <div className={classes.root}>
        <AppBar elevation={1} className={classes.appBar} position="fixed">
          <Toolbar>
            <Link to="/">
              <img src={AppIcon} alt="Up logo" className={classes.logo} />
            </Link>
            {authenticated ? (
              <div className={classes.buttons}>
                <IconButton
                  onClick={this.handleOpenDrawer}
                  edge='end'
                >
                  <MenuIcon color='primary' />
                </IconButton>
                <Drawer
                  anchor='right'
                  style={{ display: 'flex' }}
                  open={this.state.drawerOpen}
                  onClose={this.handleCloseDrawer}
                  classes={{ paper: classes.drawer }}
                >
                  {listMarkup}
                </Drawer>
                <Notifications />
  
              </div>
            ) : (
                <>
                </>
              )}
          </Toolbar>
        </AppBar>
      </div>
    )
  }
}

Navbar.propTypes = {
  authenticated: PropTypes.bool.isRequired
};

const mapStateToProps = (state) => ({
  authenticated: state.user.authenticated
});

export default connect(mapStateToProps)(withStyles(styles)(Navbar));