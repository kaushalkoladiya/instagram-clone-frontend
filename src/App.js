import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import jwt from 'jwt-decode';
import axios from 'axios';

// Redux
import { Provider } from 'react-redux';
import store from './redux/store';
import { SET_AUTHENTICATED } from './redux/types';
import { getUserData, logout } from './redux/actions/userAction';

// MUI
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

// Components
import NavBar from './components/NavBar/Navbar';
import AuthRouter from './util/AuthRouter';

// Pages
import Home from './pages/home';
import Login from './pages/login';
import Signup from './pages/signup';


const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#757ce8',
      main: '#007CFF',
      dark: '#002884',
      contrastText: '#fff',
    },
    secondary: {
      light: '#ff7961',
      main: '#4fc3f7',
      dark: '#ba000d',
      contrastText: '#000',
    }
  },
});


class App extends Component {
  componentDidMount() {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToekn = jwt(token);
      if (decodedToekn.exp * 1000 > new Date()) {

        axios.defaults.headers.comman['Authorization'] = token;
        store.dispatch({ type: SET_AUTHENTICATED });
        store.dispatch(getUserData());
      } else {
        store.dispatch(logout());
      }
    }
  }

  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <Provider store={store}>
          <BrowserRouter>
            <NavBar />
            <div className="container">
              <Switch>
                <Route path="/" exact component={Home} />
                <AuthRouter path="/login" exact component={Login} />
                <AuthRouter path="/signup" exact component={Signup} />
              </Switch>
            </div>
          </BrowserRouter>
        </Provider>
      </MuiThemeProvider>
    );
  }
}

export default App;
