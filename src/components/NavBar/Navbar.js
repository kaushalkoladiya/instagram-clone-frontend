import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

// importing in destructuring way make Compiling slow
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';


import style from './NavBar.module.css';

class NavBar extends Component {
  render() {
    return (
      <AppBar position="fixed">
        <Toolbar className={style.navBar}>
          <Button color="inherit" component={NavLink} to="/">Home</Button>
          <Button color="inherit" component={NavLink} to="/login">Login</Button>
          <Button color="inherit" component={NavLink} to="/signup">Signup</Button>
        </Toolbar>
      </AppBar>
    );
  }
}

export default NavBar;