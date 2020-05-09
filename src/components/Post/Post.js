import React from 'react';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import PropTypes from 'prop-types';

// Redux
import { connect } from 'react-redux';

// MUI
import withStyle from '@material-ui/core/styles/withStyles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';

// Icons
import ChatIcon from '@material-ui/icons/Chat';

// Components
import TooltipButton from '../Button/Button';
import DeletePost from './DeletePost';
import PostDialog from './PostDialog';
import LikeButton from '../Button/LikeButton';

const styles = {
  card: {
    marginBottom: 20,
    position: 'relative',
  },
  content: {
    padding: 25,
    objectFit: 'cover'
  },
  image: {
    minWidth: 110,
  },
  media: {
    height: 0,
    paddingTop: '56.25%',
  },
}

const post = ({ classes,
  post: { postId, imageUrl, image, username, body, createdAt, likeCount, commentCount },
  user }) => {

  const deleteButton = user.isAuth && username === user.user.username ? (
    <DeletePost postId={postId} />
  ) : null;

  return (
    <Card className={classes.card}>
      <CardHeader
        avatar={<Avatar alt="Profile" src={imageUrl} />}
        action={deleteButton}
        title={
          <Typography color="primary" component={Link} to={`/user/${username}`}>{username}</Typography>
        }
        subheader={<Moment format="MMM DD, YYYY" date={createdAt} />}
      />
      <CardMedia
        className={classes.media}
        image={image}
        title="image"
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary">{body}</Typography>
        {deleteButton}
      </CardContent>
      <CardActions disableSpacing>
        <LikeButton postId={postId} /><span>{likeCount} Likes</span>
        <TooltipButton title="Comment" placement="top" >
          <ChatIcon color="primary" />
        </TooltipButton><span>{commentCount} Comments</span>
        <PostDialog username={username} postId={postId} />
      </CardActions>
    </Card>
  );
}

post.propTypes = {
  user: PropTypes.object.isRequired,
  post: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
}

const mapToStateProps = state => ({
  user: state.user
})

export default connect(mapToStateProps)(withStyle(styles)(post));