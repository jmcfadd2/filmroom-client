import React, { Component } from 'react'
import { Grid, Paper, withStyles } from '@material-ui/core'
import PropTypes from 'prop-types';
import SearchBar from '../components/layout/SearchBar';

// Components
import Post from '../components/post/Post'
import Profile from '../components/profile/Profile'
import PostSkeleton from '../util/PostSkeleton';
import { Box } from '@material-ui/core'

// Redux 
import { connect } from 'react-redux'
import { getPosts } from '../redux/actions/dataActions';

const styles = (theme) =>({
    ...theme.spreadThis,
    homeGrid: {
        marginTop: 50,
    },
    searchBar: {
      minHeight: '10vh',
      
      backgroundColor: theme.palette.secondary.dark 
    }
})

export class home extends Component {
    
    componentDidMount() {
        this.props.getPosts();
    }
    
    render() {
        const { classes } = this.props
        const { posts, loading } = this.props.data;
        let recentPostsMarkup = !loading ? (
        posts.map(post => <Post key={post.postId} post={post}/>)
        ) : <PostSkeleton />
        return (
            <Box mt={10}>
                <Grid className={classes.homeGrid} container spacing={2}>
                    
                        <Grid item md={4} sm={12} xs={12}>
                            <Profile />
                        </Grid>
                    
                    <Grid item md={4} style={{ paddingLeft: 25, paddingRight: 25 }} sm={12} xs={12}>
                        {recentPostsMarkup}
                    </Grid>
                    <Grid item md={4}>
                <Paper elevation={2} className={classes.searchBar}>
                  <SearchBar />
                </Paper>
                    </Grid>
                </Grid>
            </Box>
        )
    }
}

home.propTypes = {
    getPosts: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    data: state.data
});

export default connect(
    mapStateToProps,
    { getPosts }
)(withStyles(styles)(home));

