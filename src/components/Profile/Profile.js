import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';

// Redux
import { connect } from 'react-redux';
import { logout, uploadImage } from '../../redux/actions/userAction';

// MUI
import withStyles from '@material-ui/core/styles/withStyles';
import MUILink from '@material-ui/core/Link';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress'

// Icons
import LocationIcon from '@material-ui/icons/LocationOn';
import LinkIcon from '@material-ui/icons/Link';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import EditIcon from '@material-ui/icons/Edit';
import KeyboardReturn from '@material-ui/icons/KeyboardReturn';

// Components
import EditUser from './EditUser';
import TooltipButton from '../Button/Button';


const styles = {
  button: {
    marginTop: 20,
    position: 'relative'
  },
  customError: {
    color: 'red',
    fontSize: '0.8rem',
    marginTop: 10
  },
  progress: {
    position: 'absolute'
  },
  paper: {
    padding: 20,
    marginBottom: 20,
  },
  profile: {
    '& .image-wrapper': {
      textAlign: 'center',
      position: 'relative',
      '& button': {
        position: 'absolute',
        top: '80%',
        left: '70%'
      }
    },
    '& .profile-image': {
      width: 200,
      height: 200,
      objectFit: 'cover',
      maxWidth: '100%',
      borderRadius: '50%',
      border: '1px solid #F5F5F5',
    },
    '& .profile-details': {
      textAlign: 'center',
      '& span, svg': {
        verticalAlign: 'middle'
      },
      '& a': {
        color: '#00bcd4'
      }
    },
    '& hr': {
      border: 'none',
      margin: '0 0 10px 0'
    },
    '& svg.button': {
      '&:hover': {
        cursor: 'pointer'
      }
    }
  },
  buttons: {
    textAlign: 'center',
    '& a': {
      margin: '20px 10px'
    }
  },
  spinner: {
    margin: '50px auto 50px auto',
    textAlign: 'center',
  }
}

class Profile extends Component {


  inputFileChangeHandler = (event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append('image', file, file.name);
    this.props.uploadImage(formData);
  }

  handleEditImage = () => {
    document.getElementById('image').click();
  }

  loagoutHandler = () => {
    this.props.logout();
  }

  render() {
    const { classes, user: { user: { imageUrl, username, bio, location, website, createdAt }, loading, isAuth } } = this.props;

    return (
      <Fragment>
        {!loading ? (
          isAuth ? (
            <Paper className={classes.paper}>
              <div className={classes.profile}>
                <div className="image-wrapper">
                  <img src={imageUrl} alt="profile" className="profile-image" />
                  <input name="image" id="image" type="file" hidden="hidden" onChange={this.inputFileChangeHandler} />
                  <TooltipButton
                    title="Edit Profile Image"
                    placement="top"
                    onClick={this.handleEditImage}
                    btnClass="button"
                  >
                    <EditIcon color="primary" />
                  </TooltipButton>
                </div>
                <hr />
                <div className="profile-details">
                  <MUILink component={Link} to={`/user/${username}`} color="primary" variant="h5">
                    @{username}
                  </MUILink>
                  <hr />
                  {bio && <Fragment><Typography variant="body2">{bio}</Typography></Fragment>}
                  {location && (
                    <Fragment>
                      <LocationIcon color="primary" /> <span>{location}</span>
                      <br />
                    </Fragment>
                  )}
                  {website && (
                    <Fragment>
                      <LinkIcon color="primary" /> <a target="_blank" href={website} rel="noopener noreferrer">{website}</a><br />
                    </Fragment>
                  )}
                  <CalendarTodayIcon color="primary" />{' '}<span>Joined on <Moment format="YYYY, MMM" date={createdAt} /></span>
                </div>

                <TooltipButton
                  title="Logout"
                  placement="top"
                  onClick={this.loagoutHandler}
                >
                  <KeyboardReturn color="primary" />
                </TooltipButton>
                <EditUser />
              </div>
            </Paper>
          ) : (
              <Paper className={classes.paper}>
                <Typography variant="body2" align="center">No Profile Found</Typography>
                <div className={classes.buttons}>
                  <Button variant="contained" color="primary" component={Link} to="/login">Login</Button>
                  <Button variant="contained" color="secondary" component={Link} to="/signup">Signup</Button>
                </div>
              </Paper>
            )
        ) : (
            <div className={classes.spinner}>
              <CircularProgress variant="indeterminate" value={10} color="secondary" />
            </div>
          )}
      </Fragment>
    );

  }
}

Profile.proptype = {
  user: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired,
  uploadImage: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
  user: state.user,
});

const mapActionToProps = { logout, uploadImage };

export default connect(mapStateToProps, mapActionToProps)(withStyles(styles)(Profile));