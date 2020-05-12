import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

// Redux
import { connect } from 'react-redux';

// MUI
import withStyle from '@material-ui/core/styles/withStyles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import CircularProgress from '@material-ui/core/CircularProgress';

// Icons
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';
import ImageSearchRoundedIcon from '@material-ui/icons/ImageSearchRounded';

import TooltipButton from '../Button/Button';

import { addPost } from '../../redux/actions/dataAction';

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
    right: '10px',
    top: '5px'
  }
};

class AddPost extends Component {

  state = {
    body: '',
    image: null,
    errors: {},
    open: false,
  }

  componentWillReceiveProps(nextProps) {
    const error = nextProps?.UI?.errors;
    if (typeof (error) === 'string') {
      this.setState({ errors: { general: error } });
    }
    if (typeof (error) === 'object') {
      let errorObj = {};
      error.forEach(error => {
        errorObj = { ...errorObj, ...error }
      });
      this.setState({ errors: errorObj });
    }
    if (!nextProps.UI.loading && !error.length) {
      this.closeHandler();
    }
  }

  openHandler = () => {
    this.setState({ open: true });
  }

  closeHandler = () => {
    this.setState({ open: false, body: '', image: null, errors: {} });
  }

  onInputChangeHandler = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  }

  onSubmitHandler = (event) => {
    event.preventDefault();
    if (!this.state.image) {
      return this.setState({ errors: { general: 'Choose an image.' } });
    }
    const formData = new FormData();
    formData.append('image', this.state.image, this.state.image.name);
    formData.append('body', this.state.body);
    this.props.addPost(formData);
  }
  
  inputFileChangeHandler = (event) => {
    this.setState({ image: event.target.files[0] });
  }

  handleEditImage = () => {
    document.getElementById('postImage').click();
  }

  render() {
    const { classes, UI: { loading } } = this.props;
    return (
      <Fragment>
        <TooltipButton title="Add New Post" onClick={this.openHandler}>
          <AddIcon color="primary" />
        </TooltipButton>
        <Dialog open={this.state.open} onClose={this.closeHandler} fullWidth maxWidth="sm" >
          <TooltipButton title="Close" onClick={this.closeHandler} btnClass={classes.closeButton}>
            <CloseIcon color="primary" />
          </TooltipButton>
          <DialogTitle className={classes.center}>Add New Post</DialogTitle>
          <DialogContent>
            <form noValidate className={classes.form} onSubmit={this.onSubmitHandler}>
              <input name="postImage" id="postImage" type="file" hidden="hidden" onChange={this.inputFileChangeHandler} />
              <TooltipButton
                title="Choose Image"
                placement="top"
                onClick={this.handleEditImage}
                btnClass="button"
              >
                <ImageSearchRoundedIcon color="primary" />
              </TooltipButton>
              <TextField
                name="body"
                type="text"
                label="body"
                multiline
                rows="3"
                fullWidth
                className={classes.row}
                value={this.state.body}
                helperText={this.state.errors.body}
                error={this.state.errors.body ? true : false}
                placeholder="Caption"
                onChange={this.onInputChangeHandler}
              />
              {this.state.errors.general && (
                <Fragment>
                  <Typography variant="caption" color="error" className={classes.row}>{this.state.errors.general}</Typography>
                  <br />
                </Fragment>
              )}
              <Button type="submit" variant="outlined" color="primary" disabled={loading ? true : false}>
                Submit
              {loading && (
                  <CircularProgress style={{ marginLeft: '0.7rem' }} size={15} color="primary" />
                )}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </Fragment>
    )
  }
}

AddPost.propTypes = {
  addPost: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  UI: state.UI
});

export default connect(mapStateToProps, { addPost })(withStyle(styles)(AddPost));