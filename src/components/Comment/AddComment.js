import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Redux
import { connect } from 'react-redux';

// MUI
import withStyle from '@material-ui/core/styles/withStyles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';

import { addComment } from '../../redux/actions/dataAction';

const styles = {
  form: {
    textAlign: 'center',
  },
  center: {
    textAlign: 'center',
  },
  row: {
    margin: '0.5rem auto 0.5rem auto',
  },
  button: {
    float: 'right',
  },
  closeButton: {
    position: 'absolute',
    left: '90%',
    top: '5%'
  }
};

class AddPost extends Component {

  state = {
    body: '',
    error: null,
  }

  onInputChangeHandler = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  }

  onSubmitHandler = (event) => {
    event.preventDefault();
    if (this.state.body === '') {
      return this.setState({ error: 'Empty comment not allowed.'  });
    }
    this.props.addComment(this.props.postId, { body: this.state.body });
  }

  render() {
    const { classes, isAuth } = this.props;
    return (
      <Grid item sm={12}>
        {isAuth ? (
          <form noValidate className={classes.form} onSubmit={this.onSubmitHandler}>
            <TextField
              name="body"
              type="text"
              label="Comment"
              fullWidth
              className={classes.row}
              value={this.state.body}
              helperText={this.state.error}
              error={this.state.error ? true : false}
              placeholder="Post your comment"
              onChange={this.onInputChangeHandler}
            />
            <Button type="submit" variant="outlined" color="primary">Comment</Button>
          </form>
        ) : null}
      </Grid>

    )
  }
}

AddPost.propTypes = {
  addComment: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  isAuth: PropTypes.bool.isRequired,
  postId: PropTypes.string.isRequired,
}

const mapStateToProps = state => ({
  UI: state.UI,
  isAuth: state.user.isAuth,
});

export default connect(mapStateToProps, { addComment })(withStyle(styles)(AddPost));