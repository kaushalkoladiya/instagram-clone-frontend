import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';

// MUI
import withStyles from '@material-ui/core/styles/withStyles';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Avtar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';

const styles = {
}

const comment = ({ classes, comments }) => {
  return (
    <Fragment>
      <CardContent>
        <Grid container>
          {comments.map(comment => {
            const { imageUrl, username, createdAt, body } = comment;
            return (
              <Fragment>
                <Grid item sm={12}>
                  <Grid container>
                    <Grid item sm={2} style={{ float: 'right' }}>
                      <Avtar src={imageUrl} />
                    </Grid>
                    <Grid item sm={10}>
                      <Grid container>
                        <Grid item sm={12}>
                          <Typography variant="h6" component={Link} to={`/user/${username}`}>{username}</Typography>
                          <Typography variant="caption"><Moment fromNow date={createdAt} /></Typography>
                        </Grid>
                      </Grid>
                      <Grid container>
                        <Grid item sm={12}>
                          <Typography variant="body2">{body}</Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>

              </Fragment>
            )
          })}
        </Grid>
      </CardContent>
    </Fragment>
  );
}

comment.propTypes = {
  user: PropTypes.array.isRequired
}

export default withStyles(styles)(comment);