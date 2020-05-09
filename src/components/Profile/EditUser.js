import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

// Redux
import { connect } from 'react-redux';

// MUI
import withStyle from '@material-ui/core/styles/withStyles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

// Icons
import EditIcon from '@material-ui/icons/Edit';

import TooltipButton from '../Button/Button';

import { editUserDetails } from '../../redux/actions/userAction';

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
};

class EditUserDetail extends Component {

  state = {
    bio: '',
    location: '',
    website: '',
    open: false,
  }

  componentDidMount() {
    // console.log(this.props.user);
    this.mapUserData(this.props.user.user);
  }

  mapUserData = ({ bio, website, location }) => {
    this.setState({
      bio: bio ? bio : '',
      website: website ? website : '',
      location: location ? location : '',
    });
  }

  openHandler = () => {
    this.setState({ open: true });
    this.mapUserData(this.props.user.user);
  }

  closeHandler = () => {
    this.setState({ open: false });
    this.mapUserData(this.props.user.user);
  }

  onInputChangeHandler = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  }

  onSubmitHandler = () => {
    const userData = {
      bio: this.state.bio,
      website: this.state.website,
      location: this.state.location,
    }
    this.props.editUserDetails(userData);
    this.closeHandler();
  }


  render() {
    const { classes } = this.props;
    return (
      <Fragment>
        <TooltipButton
          title="Edit Details" 
          placement="left"
          onClick={this.openHandler}
          btnClass={classes.button}
        >
          <EditIcon color="primary" />
        </TooltipButton>
        <Dialog open={this.state.open} onClose={this.closeHandler} fullWidth maxWidth="xs" >
          <DialogTitle className={classes.center}>Edit Your Details</DialogTitle>
          <DialogContent>
            <form className={classes.form}>
              <TextField
                name="bio"
                type="text"
                label="Bio"
                multiline
                rows="3"
                fullWidth
                className={classes.row}
                value={this.state.bio}
                placeholder="A short bio about you."
                onChange={this.onInputChangeHandler}
              />
              <TextField
                name="website"
                type="text"
                label="Website"
                fullWidth
                className={classes.row}
                value={this.state.website}
                placeholder="Your Professional Website."
                onChange={this.onInputChangeHandler}
              />
              <TextField
                name="location"
                type="text"
                label="Location"
                fullWidth
                className={classes.row}
                value={this.state.location}
                placeholder="Where you live."
                onChange={this.onInputChangeHandler}
              />
            </form>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.closeHandler} color="secondary" >Close</Button>
            <Button onClick={this.onSubmitHandler} color="primary" >Save</Button>
          </DialogActions>
        </Dialog>
      </Fragment>
    )
  }
}

EditUserDetail.propTypes = {
  editUserDetails: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,

}


const mapStateToProps = state => ({
  user: state.user
});

export default connect(mapStateToProps, { editUserDetails })(withStyle(styles)(EditUserDetail));