import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';

// Redux
import { connect } from 'react-redux';
import { getPost } from '../../redux/actions/dataAction';

// MUI
import withStyle from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import CircularProgress from '@material-ui/core/CircularProgress';
import Avatar from '@material-ui/core/Avatar';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';

// Icons
import CloseIcon from '@material-ui/icons/Close';
import UnfoldMore from '@material-ui/icons/UnfoldMore';
import ChatIcon from '@material-ui/icons/Chat';

// Components
import TooltipButton from '../Button/Button';
import LikeButton from '../Button/LikeButton';
import Comments from '../Comment/Comment';
import AddComment from '../Comment/AddComment';

const styles = {
  closeButton: {
    position: 'absolute',
    right: '10px',
    top: '5px'
  },
  media: {
    height: 0,
    paddingTop: '56.25%',
  },
  expand: {
    position: 'absolute',
    right: '10px'
  },
  spinner: {
    margin: '50px auto 50px auto',
    textAlign: 'center',
  }
};

class PostDialog extends Component {

  state = {
    open: false,
  }

  openHandler = () => {
    this.setState({ open: true });
    this.props.getPost(this.props.postId);
  }

  closeHandler = () => {
    this.setState({ open: false });
  }

  render() {
    const { classes, UI: { loading }, post: { imageUrl, image, createdAt, username, postId, likeCount, commentCount, body, comments } } = this.props;
    return (
      <Fragment>
        <TooltipButton title="See Post" placement="top" onClick={this.openHandler} className={classes.expand}>
          <UnfoldMore color="primary" />
        </TooltipButton>
        <Dialog open={this.state.open} onClose={this.closeHandler} fullWidth maxWidth="sm" >
          {loading ? (
            <div className={classes.spinner}>
              <CircularProgress value={10} variant="indeterminate" color="secondary" />
            </div>
          ) : (
              <Fragment>
                <DialogContent>
                  <CardHeader
                    avatar={<Avatar alt="Profile" src={imageUrl} />}
                    action={
                      <TooltipButton title="Close" onClick={this.closeHandler} btnClass={classes.closeButton}>
                        <CloseIcon color="primary" />
                      </TooltipButton>
                    }
                    title={
                      <Typography component={Link} color="primary" to={`/user/${username}`}>
                        {username}
                      </Typography>
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
                  </CardContent>
                  <CardActions disableSpacing>
                    <LikeButton postId={postId} /><span>{likeCount} Likes</span>
                    <TooltipButton title="Comment" placement="top" >
                      <ChatIcon color="primary" />
                    </TooltipButton><span>{commentCount} Comments</span>
                  </CardActions>
                  <AddComment postId={postId} />
                  <Comments comments={comments} />
                </DialogContent>
              </Fragment>
            )}
        </Dialog>
      </Fragment>
    )
  }
}

PostDialog.propTypes = {
  getPost: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired,
  postId: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
}

const mapStateToProps = state => ({
  UI: state.UI,
  post: state.data.post
});

export default connect(mapStateToProps, { getPost })(withStyle(styles)(PostDialog));