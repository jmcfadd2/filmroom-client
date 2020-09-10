import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types';
import CreatePost from '../post/CreatePost';
// Redux
import { connect } from 'react-redux'

// Material UI
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import { Tooltip } from '@material-ui/core';
import MyButton from '../../util/MyButton';
// Icons 
import HomeIcon from '@material-ui/icons/Home';
import AddIcon from '@material-ui/icons/Add';
import Notifications from '@material-ui/icons/Notifications';

class Navbar extends Component {
    render() {
        const { authenticated } = this.props
        return (
            <AppBar position="fixed">
                <Toolbar className="nav-container">
                    {authenticated ? (
                        <Fragment>
                            <CreatePost>

                            </CreatePost>
                            <Link to="/">
                                <MyButton tip="Home">
                                    <HomeIcon color="primary" />
                                </MyButton>
                            </Link>
                            <MyButton tip="Notifications">
                                <Notifications color="primary" />
                            </MyButton>
                        </Fragment>
                    ) : (
                            <Fragment>
                                <Button color="inherit" component={Link} to="/login">
                                    Login
              </Button>
                                <Button color="inherit" component={Link} to="/">
                                    Home
              </Button>
                                <Button color="inherit" component={Link} to="/signup">
                                    Signup
              </Button>
                            </Fragment>
                        )}
                </Toolbar>
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

export default connect(mapStateToProps)(Navbar);