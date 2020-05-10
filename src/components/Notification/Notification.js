import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import PropTypes from 'prop-types';

// Redux
import { connect } from 'react-redux';
import { markAsRead } from '../../redux/actions/userAction';

// MUI
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import Badge from '@material-ui/core/Badge';
import IconButton from '@material-ui/core/IconButton';

// Icons
import ChatIcon from '@material-ui/icons/Chat';
import FavoriteIcon from '@material-ui/icons/Favorite';
import NotificationIcon from '@material-ui/icons/Notifications';

class Notification extends Component {

  state = {
    anchorEl: null
  }

  openHandler = (event) => {
    this.setState({ anchorEl: event.target });
  }

  closeHandler = () => {
    this.setState({ anchorEl: null });
  }

  onMenuOpened = () => {
    let unreadNotiIds = this.props.notifications
      .filter(not => !not.read)
      .map(not => not.notificationId);
    this.props.markAsRead(unreadNotiIds);
  }

  render() {
    const { notifications } = this.props;

    let notificationIcon;
    if (notifications && notifications.length > 0) {
      notifications.filter(noti => noti.read === false).length > 0
        ? (notificationIcon = (
          <Badge
            badgeContent={
              notifications.filter(noti => noti.read === false).length
            }
            color="secondary" >
            <NotificationIcon />
          </Badge>
        )) : (notificationIcon = <NotificationIcon />)
    } else {
      notificationIcon = <NotificationIcon />
    };

    let notificationMarkup = notifications && notifications.length > 0 ? (
      notifications.map((noti) => {
        const verb = noti.type === 'like' ? 'liked' : 'commented on';
        const time = <Moment fromNow date={noti.createdAt} />;
        const color = noti.read ? 'primary' : 'secondary';
        const icon = noti.type === 'like' ? (
          <FavoriteIcon color={color} style={{ marginRight: 10 }} />
        ) : (<ChatIcon color={color} style={{ marginRight: 10 }} />
          );
        return (
          <MenuItem key={noti.createdAt} onClick={this.closeHandler} >
            {icon}
            <Typography
              component={Link}
              variant="body1"
              color="initial"
              to={`/user/${noti.recipient}/post/${noti.postId}`}
            >
              {noti.sender} {verb} your post - {time}
            </Typography>
          </MenuItem>
        );
      })
    ) : (
        <MenuItem onClick={this.closeHandler} >
          You have no notification yet!
        </MenuItem>
      );
    return (
      <Fragment>
        <Tooltip placement="top" title="Notifications">
          <IconButton
            aria-owns={this.state.anchorEl ? 'simple-menu' : undefined}
            aria-haspopup="true"
            onClick={this.openHandler}
          >
            {notificationIcon}
          </IconButton>
        </Tooltip>
        <Menu
          anchorEl={this.state.anchorEl}
          open={Boolean(this.state.anchorEl)}
          onClose={this.closeHandler}
          onEntered={this.onMenuOpened} >
          {notificationMarkup}
        </Menu>
      </Fragment>
    );
  }

}

Notification.propTypes = {
  notifications: PropTypes.array.isRequired,
  markAsRead: PropTypes.func.isRequired,
}

const mapToStateProps = state => ({
  notifications: state.user.notifications
})

export default connect(mapToStateProps, { markAsRead })(Notification);