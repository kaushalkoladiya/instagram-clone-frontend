import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

// Redux
import { connect } from 'react-redux';
import { getUser } from '../redux/actions/dataAction';

// MUI
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';


// Components
import Post from '../components/Post/Post';
import StaticProfile from '../components/Profile/StaticProfile'


class User extends Component {

  state = {
    profile: null,
    error: null,
    postId: null
  }

  componentDidMount() {
    const username = this.props.match.params.username;
    const postId = this.props.match.params.postId;
    if (postId) this.setState({ postId: postId });

    this.props.getUser(username);
    axios.get(`/user/${username}`)
      .then((res) => {
        this.setState({ profile: res.data.userData.user })
      })
      .catch(err => {
        this.setState({ error: err.response.data.error });
        console.log(err.response.data.error)
      });
  }

  render() {
    const { posts, loading } = this.props.data;
    return (
      <Grid container>
        <Grid item sm={4} xs={12} style={{ padding: 10 }}>
          {this.state.profile !== null ? (
            <StaticProfile profile={this.state.profile} />
          ) : this.state.error ? (
            <h1>{this.state.error}</h1>
          ) : (
                <div style={{ margin: '50px auto 50px auto', textAlign: 'center' }}>
                  <CircularProgress value={10} variant="indeterminate" color="secondary" />
                </div>
              )}
        </Grid>
        <Grid item sm={8} xs={12}>
          {loading ? (
            <div style={{ margin: '50px auto 50px auto', textAlign: 'center' }}>
              <CircularProgress value={10} variant="indeterminate" color="secondary" />
            </div>
          ) : posts === null ? (
            <h1>No Posts Found</h1>
          ) : !this.state.postId ? (
            posts.map((post, index) => <Post post={post} key={index} />)
          ) : (
                  posts.map((post, index) => {
                    if (post.postId !== this.state.postId)
                      return <Post post={post} key={index} />
                    else {
                      return <Post post={post} key={index} openDialog />
                    }
                  })
                )}


        </Grid>
      </Grid >
    );
  }

}

User.propTypes = {
  getUser: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  data: state.data
})

export default connect(mapStateToProps, { getUser })(User);