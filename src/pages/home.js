import React, { Component } from 'react';
import axios from 'axios';

import Grid from '@material-ui/core/Grid';

import Post from '../components/Post/Post';
import Profile from '../components/Profile/Profile';

import style from './style.module.css';

class Home extends Component {

  state = {
    posts: []
  }

  async componentDidMount() {
    try {
      const { data: { posts } } = await axios.get('/post');
      this.setState({ posts });
    } catch (error) {
      console.error(error);
    }
  }

  render() {

    return (
      <Grid container>
        <Grid item sm={4} xs={12}>
          <Profile />
        </Grid>
        <Grid item sm={8} xs={12} className={style.postsContainer}>
          {this.state.posts.length !== 0 ? (
            this.state.posts.map((post, index) => <Post post={post} key={index} />)
          ) : (
              <h3>Loading...</h3>
            )}
        </Grid>
      </Grid>
    );
  }
}

export default Home;