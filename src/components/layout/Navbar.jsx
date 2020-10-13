import React, { Component, Fragment } from 'react'
import withStyles from '@material-ui/core/styles/withStyles';
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types';
import CreatePost from '../post/CreatePost';
import StartSession from '../sessions/StartSession';
import AppIcon from '../../images/reppit-text-logo.png'
import { Box } from '@material-ui/core'
// Redux
import { connect } from 'react-redux'

// Material UI
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import MyButton from '../../util/MyButton';
import Notifications from './Notifications';

// Icons 
import HomeIcon from '@material-ui/icons/Home';

const styles = (theme) => ({
    ...theme.spreadThis,
    logo: {
        height: 40,
        marginLeft: 25
    },
    
})

class Navbar extends Component {
    render() {
        const { authenticated, classes } = this.props
        return (

            <AppBar elevation={1} className={classes.appBar} color="light" position="fixed">
                <Box display="flex">
                    <Box my="auto" mt={2}>
                        <Link to="/">
                            <img src={AppIcon} alt="Up logo" className={classes.logo} />
                        </Link>

                    </Box>
                    <Box mx="auto"  my="auto">
                        <Toolbar>
                            {authenticated ? (
                                <Fragment>
                                    <Link to="/session">
                                        <StartSession />
                                    </Link>
                                    <CreatePost />
                                    <Notifications />
                                </Fragment>
                            ) : (
                                    <Fragment>
                                        
                                    </Fragment>
                                )}
                        </Toolbar>
                    </Box>
                </Box>
            </AppBar>
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