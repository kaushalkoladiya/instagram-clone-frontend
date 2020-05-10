import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';

// MUI
import withStyles from '@material-ui/core/styles/withStyles';
import CardHeader from '@material-ui/core/CardHeader';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';

const styles = {
  avtar: {
    margin: 'auto 10px auto 0'
  }
}

const comment = ({ classes, comments }) => {
  return (
    <Fragment>
      <Grid container>
        {comments.map(({ imageUrl, username, createdAt, body }) => {
          return (
            <Grid item sm={12} key={createdAt}>
              <CardHeader
                avatar={<Avatar alt="Profile" src={imageUrl} />}
                title={
                  <Typography color="primary" component={Link} to={`/user/${username}`}>{username}</Typography>
                }
                subheader={<Moment fromNow date={createdAt} />}
              />
              <Typography variant="body2" style={{ margin: "auto 0px auto 70px", padding: "0" }}>{body}</Typography>
            </Grid>
          )
        })}
      </Grid>
    </Fragment>
  );
}

comment.propTypes = {
  comments: PropTypes.array.isRequired
}

export default withStyles(styles)(comment);