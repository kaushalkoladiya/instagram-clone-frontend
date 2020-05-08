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
import IconButton from '@material-ui/core/IconButton';
import ToolTip from '@material-ui/core/Tooltip';

// Icons
import LocationIcon from '@material-ui/icons/LocationOn';
import LinkIcon from '@material-ui/icons/Link';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import EditIcon from '@material-ui/icons/Edit';


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
  invisibleSeparator: {
    border: 'none',
    margin: 4
  },
  visibleSeparator: {
    width: '100%',
    borderBottom: '1px solid rgba(0,0,0,0.1)',
    marginBottom: 20
  },
  paper: {
    padding: 20
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
    const fileInput = document.getElementById('image');
    fileInput.click();
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
                  <input name="image" id="image" type="file" hidden="hidden" />
                  <ToolTip title="Edit Profile Image" placement="top">
                    <IconButton onClick={this.handleEditImage} className="button">
                      <EditIcon color="primary" />
                    </IconButton>

                  </ToolTip>
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
            <CircularProgress variant="determinate" value={10} color="secondary" />
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