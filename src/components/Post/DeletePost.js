import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

// Redux
import { connect } from 'react-redux';
import { deletePost } from '../../redux/actions/dataAction';

// MUI
import withStyle from '@material-ui/core/styles/withStyles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';

// Icons
import DeleteIcon from '@material-ui/icons/DeleteForever';

// Components
import TooltipButton from '../Button/Button';

const styles = {
  deleteButton: {
    left: '90%',
    top: '10%',
    position: 'absolute',
  }
}

class DeletePost extends Component {
  state = {
    open: false
  }

  openHandler = () => {
    this.setState({ open: true });
  }

  closeHandler = () => {
    this.setState({ open: false });
  }

  onDeleteHandler = () => {
    this.props.deletePost(this.props.postId);
    this.setState({ open: false });
  }
  render() {
    const { classes } = this.props;
    return (
      <Fragment>
        <TooltipButton title="Delete Post" onClick={this.openHandler} btnClass={classes.deleteButton}>
          <DeleteIcon color="error" />
        </TooltipButton>
        <Dialog open={this.state.open} onClose={this.closeHandler} fullWidth maxWidth="xs">
          <DialogTitle>Are you sure!</DialogTitle>
          <DialogActions>
            <Button onClick={this.closeHandler} color="secondary" >Close</Button>
            <Button onClick={this.onDeleteHandler} color="primary" >Delete</Button>
          </DialogActions>
        </Dialog>
      </Fragment>
    );
  }
}

DeletePost.propTypes = {
  deletePost: PropTypes.func.isRequired,
  postId: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired,
}

export default connect(null, { deletePost })(withStyle(styles)(DeletePost));