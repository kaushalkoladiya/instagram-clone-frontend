import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Home from './pages/home';
import Login from './pages/login';
import Signup from './pages/signup';

class App extends Component {
  render() {

    return (
      <div className="App" >

        <BrowserRouter>
          <Switch>
            <Route
              path="/"
              exact
              component={Home}
            />
            <Route
              path="/login"
              exact
              component={Login}
            />
            <Route
              path="/signup"
              exact
              component={Signup}
            />


          </Switch>

        </BrowserRouter>

        <h1>Hii</h1>
      </div>
    );
  }
}

export default App;
