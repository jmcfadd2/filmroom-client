import React, { Component } from 'react'
import withStyles from '@material-ui/core/styles/withStyles';
import { Link } from 'react-router-dom'
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import PropTypes from 'prop-types';
import DeletePost from './DeletePost';
import PostDialog from './PostDialog'
import LikeButton from './LikeButton'
// MUI Cards
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
// Icons
import ChatIcon from '@material-ui/icons/Chat';

// Redux
import { connect } from 'react-redux'
import { likePost, unlikePost } from '../../redux/actions/dataActions';
import MyButton from '../../util/MyButton';



const styles = {
    card: {
        postion: "relative",
        marginBottom: 20,

    },
    image: {
        minWidth: 200,
        objectFit: 'cover',
    },
    content: {
        padding: 25
    }

}

export class Post extends Component {
    
    render() {
        dayjs.extend(relativeTime)
        const { classes, post: { body,
            createdAt,
            userImage,
            userHandle,
            postId,
            likeCount,
            commentCount },
            user: {
                authenticated,
                credentials: { handle }

            } } = this.props;
        
        const deleteButton = authenticated && userHandle === handle ? (
            <DeletePost postId={postId} />
        ) : null;
        return (
            <Card className={classes.card}>
                <CardHeader
                    avatar={
                        <Avatar component={Link} to={`/users/${userHandle}`}  src={userImage} className={classes.avatar}>
                        </Avatar>
                    }
                    action={
                        deleteButton
                    }
                    title={
                    <Link to={`/users/${userHandle}`}>{userHandle}</Link>
                    }
                    subheader={dayjs(createdAt).fromNow()} 
                    
                    />
                <CardContent className={classes.content}>
                    
                    <Typography variant="h5">{body}</Typography>
                    <CardActions disableSpacing >
                        <LikeButton postId={postId}/>
                        <span> {likeCount} likes </span>
                        <MyButton tip="Comments">
                            <ChatIcon color="primary" />
                        </MyButton>
                        <span> {commentCount} comments </span>
                    <PostDialog 
                        postId={postId}
                        userHandle={userHandle}
                        openDialog={this.props.openDialog}
                        />
                    </CardActions>
                </CardContent>
                
                
            </Card>
            
        )
    }
}

Post.propTypes = {
    likePost: PropTypes.func.isRequired,
    unlikePost: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    post: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
    openDialog: PropTypes.bool
};

const mapStateToProps = (state) => ({
    user: state.user
});

const mapActionsToProps = {
    likePost,
    unlikePost
}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(Post));
