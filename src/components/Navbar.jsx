import React, { Component } from 'react'

// Material UI
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';

class Navbar extends Component {
    render() {
        return (
            <AppBar position="fixed">
                <Toolbar>
                    <Button volor="inherit">Login</Button> 
                    <Button volor="inherit">Home</Button> 
                    <Button volor="inherit">Sign Up</Button> 
                </Toolbar>
            </AppBar>
        )
    }
}

export default Navbar
