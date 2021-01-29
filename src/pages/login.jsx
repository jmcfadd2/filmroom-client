import React, { Component } from 'react'
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'
//MUI
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import { firebase } from '../util/firebase';
// Redux
import { connect } from 'react-redux'
import { loginUser } from '../redux/actions/userActions'

const styles = (theme) => ({
  ...theme.spreadThis,
  signupLink: {
    marginTop: 20
  }

})



export class login extends Component {
  constructor() {
    super()
    this.state = {
      email: '',
      password: '',
      loading: false,
      errors: {}
    }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.UI.errors) {
      this.setState({ errors: nextProps.UI.errors })
    }
  }
  handleSubmit = (event) => {
    event.preventDefault()
    const userData = {
      email: this.state.email,
      password: this.state.password
    }
    firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
    this.props.loginUser(userData, this.props.history)
  }
  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }
  render() {
    const { classes, UI: { loading } } = this.props
    const { errors } = this.state

    return (

      <Grid container className={classes.form}>
        <Grid item sm />
        <Grid item sm>
          <Typography
            variant="h3"
            className={classes.pageTitle}
            color='textSecondary'
          >
            Login
                    </Typography>
          <form noValidate onSubmit={this.handleSubmit}>
            <TextField
              id="email"
              name="email"
              type="email"
              label="email"
              className={classes.textField}
              InputLabelProps={{ className: classes.labelClass }}
              helperText={errors.email}
              error={errors.email ? true : false}
              value={this.state.email}
              variant='filled'
              onChange={this.handleChange}
              fullWidth
            />

            <TextField
              id="password"
              name="password"
              type="password"
              label="password"
              className={classes.textField}
              InputLabelProps={{ className: classes.labelClass }}
              helperText={errors.password}
              error={errors.password ? true : false}
              value={this.state.password}
              onChange={this.handleChange}
              variant='filled'
              fullWidth
            />

            {errors.general && (
              <Typography variant="body2" className={classes.customError}>
                {errors.general}
              </Typography>
            )}
            <Button type="submit" variant="contained" color="primary" className={classes.button} disabled={loading}>
              Login
                            {loading && (
                <CircularProgress size={30} className={classes.progress} />
              )}
            </Button>
            <br />
            <Typography className={classes.signupLink} color='textSecondary' >Don't have an account? Sign up <Link to="/signup">here</Link></Typography>

          </form>
        </Grid>
        <Grid item sm />
      </Grid>
    )
  }
}

login.propTypes = {
  classes: PropTypes.object.isRequired,
  loginUser: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
  user: state.user,
  UI: state.UI
})

const mapActionsToProps = {
  loginUser
}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(login))
