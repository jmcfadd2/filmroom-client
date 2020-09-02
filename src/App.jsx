import React from 'react';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles'
import createMuiTheme from '@material-ui/core/styles/createMuiTheme'
// Components
import Navbar from './components/Navbar';
// Pages
import home from './pages/home';
import login from './pages/login';
import signup from './pages/signup';

const theme = createMuiTheme({
    palette: {
        primary: {
            light: '#33c9dc',
            main: '#00bcd4',
            dark: '#008394',
            contrastText: '#fff'
        },
        secondary: {
            light: '#ff6333',
            main: '#ff3d00',
            dark: '#b22a00',
            contrastText: '#fff'
        }
    },
    spreadThis: {
        typography: {
            useNextVariants: true
        },
        form: {
            textAlign: "center"
        },
        image: {
            margin: "10px auto 10px auto"
        },
        pageTitle: {
            margin: "10px auto 10px auto"
        },
        textField: {
            margin: "10px auto 10px auto"
        },
        button: {
            marginTop: 20,
            position: "relative"
        },
        customError: {
            color: "red",
            fontSize: "0.8rem",
            marginTop: 5
        },
        progress: {
            position: "absolute"
        }
    }
});

function App() {
    return (
        <div className="App">
            <MuiThemeProvider theme={theme}>
                <Router>
                    <Navbar />
                    <div className="container">
                        <Switch>
                            <Route exact path='/' component={home} />
                            <Route exact path='/login' component={login} />
                            <Route exact path='/signup' component={signup} />

                        </Switch>
                    </div>
                </Router>
            </MuiThemeProvider>
        </div>
    );
}

export default App;
