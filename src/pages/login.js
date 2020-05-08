import React, { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

// Redux
import { connect } from 'react-redux';
import { loginUser } from '../redux/actions/userAction';

// MUI
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

import Image from '../images/icon.png';

const styles = {
  form: {
    textAlign: 'center',
  },
  center: {
    textAlign: 'center',
  },
  row: {
    margin: '0.5rem auto 0.5rem auto',
  }
}

class Login extends Component {
  state = {
    email: '',
    password: '',
    errors: '',
  }

  componentWillReceiveProps(nextProps) {
    const error = nextProps?.UI?.errors;
    if (typeof (error) === 'string') {
      this.setState({ errors: { general: error } });
    } else if (typeof (error) === 'object') {
      let errorObj = {};
      error.forEach(error => {
        errorObj = { ...errorObj, ...error }
      });
      this.setState({ errors: errorObj });
    }
  }

  onInputChangeHandler = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  }

  onSubmitHandler = (event) => {
    event.preventDefault();

    const userData = {
      email: this.state.email,
      password: this.state.password
    }

    this.props.loginUser(userData, this.props.history);
    // this.setState({ loading: true });
    // try {
    //   const { data: { token } } = await axios.post('/login', {
    //     email: this.state.email,
    //     password: this.state.password
    //   });
    //   this.setState({ loading: false });
    //   localStorage.setItem('token', `Bearer ${token}`);
    //   this.props.history.push('/');
    // } catch ({ response: { data: { error } } }) {
    //   if (typeof (error) === 'string') {
    //     this.setState({ errors: { general: error }, loading: false });
    //   } else if (typeof (error) === 'object') {
    //     error.forEach(data => this.setState({
    //       errors: {
    //         ...this.state.errors,
    //         ...data
    //       },
    //       loading: false
    //     }));
    //   }
    // }

  }

  render() {
    const { classes, UI: { loading } } = this.props;
    return (
      <Grid container className={classes.form}>
        <Grid item sm />
        <Grid item sm className={classes.center}>
          <img src={Image} alt="logo" className={classes.row} />
          <Typography variant="h4">Login</Typography>
          <form noValidate onSubmit={this.onSubmitHandler.bind(this)}>
            <TextField
              id="email"
              type="email"
              name="email"
              className={classes.row}
              label="Email"
              helperText={this.state.errors.email}
              error={this.state.errors.email ? true : false}
              value={this.state.email}
              onChange={this.onInputChangeHandler}
              fullWidth />
            <TextField
              id="password"
              type="password"
              name="password"
              className={classes.row}
              label="Password"
              value={this.state.password}
              helperText={this.state.errors.password}
              error={this.state.errors.password ? true : false}
              onChange={this.onInputChangeHandler}
              fullWidth />

            {this.state.errors.general && (
              <Typography variant="caption" color="error" className={classes.row}>{this.state.errors.general}</Typography>
            )}

            <br />
            <Button type="submit" variant="outlined" color="primary" disabled={loading ? true : false}>
              Login
              {loading && (
                <CircularProgress style={{ marginLeft: '0.7rem' }} size={15} color="primary" />
              )}
            </Button>
            <br />
            <small>Don't have account? Signup <Link to='/signup'>here</Link></small>
          </form>
        </Grid>
        <Grid item sm />
      </Grid>
    );
  }
}

Login.protoTypes = {
  classes: PropTypes.object.isRequired,
  loginUser: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
  user: state.user,
  UI: state.UI
})

const mapActionToProps = {
  loginUser
}

export default connect(mapStateToProps, mapActionToProps)(withStyles(styles)(Login));