import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';

// MUI
import withStyles from '@material-ui/core/styles/withStyles';
import MUILink from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

// Icons
import LocationIcon from '@material-ui/icons/LocationOn';
import LinkIcon from '@material-ui/icons/Link';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';


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

const StaticProfile = ({ classes, profile: { imageUrl, username, bio, location, website, createdAt }, loading, isAuth }) => {
  return (

    <Paper className={classes.paper}>
      <div className={classes.profile}>
        <div className="image-wrapper">
          <img src={imageUrl} alt="profile" className="profile-image" />
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
  );

}

StaticProfile.proptype = {
  profile: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
}



export default withStyles(styles)(StaticProfile);