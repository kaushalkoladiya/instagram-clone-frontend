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
import AddPost from '../Post/AddPost';
import Notifications from '../Notification/Notification';

// Icons
import HomeIcon from '@material-ui/icons/Home';

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
              <AddPost />

              <Notifications />

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