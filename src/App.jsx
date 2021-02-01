import React from 'react';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import { ThemeProvider as MuiThemeProvider, } from '@material-ui/core/styles'
import createMuiTheme from '@material-ui/core/styles/createMuiTheme'
import themeFile from './util/theme';
import { withStyles } from '@material-ui/core'

// Redux
import { Provider } from 'react-redux';
import store from './redux/store';
import { SET_AUTHENTICATED } from './redux/types'
import { logoutUser, getUserData } from './redux/actions/userActions'
// Components
import Navbar from './components/layout/Navbar';
import jwtDecode from 'jwt-decode';
import AuthRoute from './util/AuthRoute';
// Pages
import home from './pages/home';
import login from './pages/login';
import signup from './pages/signup';
import user from './pages/user'
import session from './pages/session'
import learn from './pages/learn'
import trainingUpload from './pages/trainingUpload'
import Watch from './pages/Watch'
import axios from 'axios';
import course from './pages/Course';
const theme = createMuiTheme(themeFile);



axios.defaults.baseURL = "https://us-central1-shotsup-mvp.cloudfunctions.net/api"

const token = localStorage.FBIdToken
if (token) {
  const decodedToken = jwtDecode(token);
  if (decodedToken.exp * 1000 < Date.now()) {
    window.location.href = '/login';
    store.dispatch(logoutUser())
  } else {
    store.dispatch({ type: SET_AUTHENTICATED })
    axios.defaults.headers.common['Authorization'] = token
    store.dispatch(getUserData());
  }
}

const styles = (theme) => ({
  ...theme.spreadThis,

})

function App() {

  return (

    <MuiThemeProvider theme={theme}>
      <Provider store={store}>
        <Router>

          <Navbar />
          <div className="container">
            <Switch>
              <Route exact path='/' component={home} />
              <AuthRoute exact path='/login' component={login} />
              <AuthRoute exact path='/signup' component={signup} />
              <Route exact path="/users/:handle" component={user} />
              <Route exact path="/users/:handle/post/:postId" component={user}
              />
              <Route exact path="/session" component={session}
              />
              <Route exact path="/learn" component={learn}
              />
              <Route exact path="/courses/:courseId" component={course} />
              <Route exact path="/watch/:courseId" component={Watch} />
              <Route exact path="/upload-training" component={trainingUpload}
              />

            </Switch>
          </div>
        </Router>
      </Provider>
    </MuiThemeProvider>

  );
}

export default (withStyles(styles)(App));
