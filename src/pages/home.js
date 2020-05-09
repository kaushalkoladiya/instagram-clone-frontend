import React, { Component } from 'react';
import PropTypes from 'prop-types';

// MUI
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';

// Redux
import { connect } from 'react-redux';
import { getPosts } from '../redux/actions/dataAction';

// Components
import Post from '../components/Post/Post';
import Profile from '../components/Profile/Profile';

import style from './style.module.css';

class Home extends Component {
  componentDidMount() {
    this.props.getPosts();
  }

  render() {
    const { data: { posts }, loading } = this.props;
    // console.log(data);
    return (
      <Grid container>
        <Grid item sm={4} xs={12}>
          <Profile />
        </Grid>
        <Grid item sm={8} xs={12} className={style.postsContainer}>
          {posts.length !== 0 && !loading ? (
            posts.map((post, index) => <Post post={post} key={index} />)
          ) : (
              <div style={{ margin: '50px auto 50px auto', textAlign: 'center' }}>
                <CircularProgress value={10} variant="indeterminate" color="secondary" />
              </div>
            )}
        </Grid>
      </Grid>
    );
  }
}

Home.propTypes = {
  getPosts: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
  data: state.data
})

export default connect(mapStateToProps, { getPosts })(Home);