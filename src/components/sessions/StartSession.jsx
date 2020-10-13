import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import MyButton from '../../util/MyButton';
// MUI Stuff
import SportsIcon from '@material-ui/icons/Sports'

// Redux stuff
import { connect } from 'react-redux';
import { clearErrors } from '../../redux/actions/dataActions';
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
                    <Typography variant={"h6"} >Train</Typography>
                </MyButton>
                
            </Fragment>
        );
    }
}

StartSession.propTypes = {
    
    clearErrors: PropTypes.func.isRequired,
    UI: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    UI: state.UI
});

export default connect(
    mapStateToProps,
    { clearErrors }
)(withStyles(styles)(StartSession));
