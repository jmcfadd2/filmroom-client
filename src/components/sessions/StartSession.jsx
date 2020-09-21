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
import SportsIcon from '@material-ui/icons/Sports'
import CloseIcon from '@material-ui/icons/Close';
// Redux stuff
import { connect } from 'react-redux';
import { setSession, clearErrors } from '../../redux/actions/dataActions';

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

class StartSession extends Component {
    state = {
        open: false,
        
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
    
    
    
    render() {
        
        return (
            <Fragment>
                <MyButton onClick={this.handleOpen}  tip="Start a session">
                    <SportsIcon />
                </MyButton>
                
            </Fragment>
        );
    }
}

StartSession.propTypes = {
    createSession: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired,
    UI: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    UI: state.UI
});

export default connect(
    mapStateToProps,
    { setSession, clearErrors }
)(withStyles(styles)(StartSession));
