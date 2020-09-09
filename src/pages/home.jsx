import React, { Component } from 'react'
import { Grid } from '@material-ui/core'
import axios from 'axios'
import PropTypes from 'prop-types';

// Components
import Post from '../components/Post'
import Profile from '../components/Profile'
// Redux 
import { connect } from 'react-redux'
import { getPosts } from '../redux/actions/dataActions';



export class home extends Component {
    
    componentDidMount() {
        this.props.getPosts();
    }
    
    render() {
        const { posts, loading } = this.props.data;
        let recentPostsMarkup = !loading ? (
        posts.map(post => <Post key={post.postId} post={post}/>)
        ) : <p>Loading...</p>
        return (
            <Grid container spacing={2}>
                <Grid item md={6} xs={12}>
                    {recentPostsMarkup}
                </Grid>
                <Grid item md={4} sm={12}>
                    <Profile />
                </Grid>
            </Grid>
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
)(home);

