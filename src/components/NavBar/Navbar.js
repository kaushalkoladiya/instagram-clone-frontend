import React, { Component, Fragment } from 'react';
import { NavLink, Link } from 'react-router-dom';
import PropTypes from 'prop-types';

// Redux
import { connect } from 'react-redux';

// MUI
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';

// Components
import TooltipButton from '../Button/Button';

// Icons
import AddIcon from '@material-ui/icons/Add';
import HomeIcon from '@material-ui/icons/Home';
import NotificationsIcon from '@material-ui/icons/Notifications';

import style from './NavBar.module.css';

class NavBar extends Component {
  render() {
    const { isAuth } = this.props;
    return (
      <AppBar position="fixed">
        <Toolbar className={style.navBar}>
          {isAuth ? (
            <Fragment>
              <Link to="/">
                <TooltipButton title="Home">
                  <HomeIcon color="primary" />
                </TooltipButton>
              </Link>
              <TooltipButton title="Add Post">
                <AddIcon color="primary" />
              </TooltipButton>
              <TooltipButton title="Notifications">
                <NotificationsIcon color="primary" />
              </TooltipButton>
            </Fragment>
          ) : (
              <Fragment>
                <Button color="inherit" component={NavLink} to="/">Home</Button>
                <Button color="inherit" component={NavLink} to="/login">Login</Button>
                <Button color="inherit" component={NavLink} to="/signup">Signup</Button>
              </Fragment>
            )}
        </Toolbar>
      </AppBar>
    );
  }
}

NavBar.propTypes = {
  isAuth: PropTypes.bool.isRequired
}

const mapToStateProps = state => ({
  isAuth: state.user.isAuth
})

export default connect(mapToStateProps)(NavBar);