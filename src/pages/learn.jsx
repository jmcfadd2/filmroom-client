import React, { Component } from 'react'
import { Button, Grid, Paper, Typography, withStyles } from '@material-ui/core'
import PropTypes from 'prop-types';

// Components
import Post from '../components/post/Post'
import Profile from '../components/profile/Profile'
import PostSkeleton from '../util/PostSkeleton';
import { Box } from '@material-ui/core'

// Redux 
import { connect } from 'react-redux'
import { getPosts } from '../redux/actions/dataActions';

const styles = (theme) => ({
  ...theme.spreadThis,
  homeGrid: {
    marginTop: 50,
  }
})

export class learn extends Component {

  componentDidMount() {
    this.props.getPosts();
  }

  render() {
    const { classes } = this.props
    const { posts, loading } = this.props.data;
    let recentPostsMarkup = !loading ? (
      posts.map(post => <Post key={post.postId} post={post} />)
    ) : <PostSkeleton />
    return (
      <Box mt={10}>
        <Grid className={classes.homeGrid} container spacing={2}>

          <Grid item md={4} sm={12} xs={12}>
            <Profile />
          </Grid>

          <Grid item md={6} style={{ paddingLeft: 25, paddingRight: 25 }} sm={12} xs={12}>
            <Paper>
              <Typography> Upload your own course and become a Reppit coach today</Typography>
              <Button href='/upload-training'>
                Upload Now!
              </Button>

            </Paper>
          </Grid>
        </Grid>
      </Box>
    )
  }
}

learn.propTypes = {
  getPosts: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  data: state.data
});

export default connect(
  mapStateToProps,
  { getPosts }
)(withStyles(styles)(learn));

