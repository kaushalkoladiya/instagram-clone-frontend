import React from 'react';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import PropTypes from 'prop-types';

// Redux
import { connect } from 'react-redux';
import { likePost, unlikePost } from '../../redux/actions/dataAction';

// MUI
import withStyle from '@material-ui/core/styles/withStyles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

// Icons
import ChatIcon from '@material-ui/icons/Chat';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';

// Components
import TooltipButton from '../Button/Button';

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

const post = ({ classes,
  post: { postId, imageUrl, username, body, createdAt, likeCount, commentCount },
  user,
  likePost: likePostFunc,
  unlikePost: unlikePostFunc }) => {

  const likedPost = () => {
    const like = user.likes.find(like => like.postId === postId);
    // console.log(like, 'data');
    if (user.likes && like) {
      console.log('true');
      return true;
    } else {
      console.log('false');
      return false;
    }
  }

  const likePost = () => {
    likePostFunc(postId);
  }

  const unlikePost = () => {
    unlikePostFunc(postId);
  }

  const likeButton = !user.isAuth ? (
    <TooltipButton
      title="Like"
      placement="top" >
      <Link to="/login">
        <FavoriteBorder color="error" />
      </Link>
    </TooltipButton >
  ) : (
      likedPost() ? (
        <TooltipButton
          title="Undo Like"
          placement="top"
          onClick={unlikePost} >
          <FavoriteIcon color="error" />
        </TooltipButton >
      ) : (
          <TooltipButton
            title="Like"
            placement="top"
            onClick={likePost} >
            <FavoriteBorder color="error" />
          </TooltipButton >
        )
    );

  return (
    <Card className={classes.card}>
      <CardMedia image={imageUrl} title="Profile Image" className={classes.image} />
      <CardContent className={classes.content}>
        <Typography variant="h5" color="secondary" component={Link} to={`/user/${username}`}>{username}</Typography> <br />
        <Typography variant="overline"><Moment format="YYYY, MMM DD" date={createdAt} /></Typography>
        <Typography variant="body1">{body}</Typography>
        {likeButton}<span>{likeCount} Likes</span>
        <TooltipButton title="Comment" placement="top" >
          <ChatIcon color="primary" />
        </TooltipButton><span>{commentCount} Comments</span>
      </CardContent>
    </Card>
  );
}

post.propTypes = {
  likePost: PropTypes.func.isRequired,
  unlikePost: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  post: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
}

const mapToStateProps = state => ({
  user: state.user
})

export default connect(mapToStateProps, { likePost, unlikePost })(withStyle(styles)(post));