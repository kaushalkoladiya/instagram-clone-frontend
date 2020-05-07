import React from 'react';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';


import withStyle from '@material-ui/core/styles/withStyles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

const styles = {
  card: {
    display: 'flex',
    marginBottom: 20
  },
  content: {
    padding: 25,
    objectFit: 'cover'
  },
  image: {
    minWidth: 110,
  }
}

const post = ({ classes, post: { imageUrl, username, body, createdAt } }) => {
  return (
    <Card className={classes.card}>
      <CardMedia image={imageUrl} title="Profile Image" className={classes.image} />
      <CardContent className={classes.content}>
        <Typography variant="h5" color="secondary" component={Link} to={`/user/${username}`}>{username}</Typography> <br />
        <Typography variant="overline"><Moment format="YYYY, MMM DD" date={createdAt} /></Typography>
        <Typography variant="body1">{body}</Typography>
      </CardContent>
    </Card>
  );
}

export default withStyle(styles)(post);