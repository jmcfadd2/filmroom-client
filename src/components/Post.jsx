import React, { Component } from 'react'
import withStyles from '@material-ui/core/styles/withStyles';
import { Link } from 'react-router-dom'
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import PropTypes from 'prop-types';
import DeletePost from './DeletePost';
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
import ThumbUpAlt from '@material-ui/icons/ThumbUpAlt';
import ThumbUpAltOutlined from '@material-ui/icons/ThumbUpAltOutlined';
// Redux
import { connect } from 'react-redux'
import { likePost, unlikePost } from '../redux/actions/dataActions';
import MyButton from '../util/MyButton';



const styles = {
    card: {
        
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
    likedPost = () => {
        if (this.props.user.likes && this.props.user.likes.find(
            (like) => like.postId === this.props.post.postId
        ))
            return true
        else return false
    }
    likePost = () => {
        this.props.likePost(this.props.post.postId)
    }
    unlikePost = () => {
        this.props.unlikePost(this.props.post.postId)
    }
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
        const likeButton = !authenticated ? (
            <MyButton tip="Give Props">
                <Link to="/login">
                    <ThumbUpAltOutlined color="primary" />
                </Link>
            </MyButton>
        ) : (
                this.likedPost() ? (
                    <MyButton tip="Undo Props" onClick={this.unlikePost}>
                        <ThumbUpAlt color="primary" />
                    </MyButton>
                ) : (
                        <MyButton tip="Give Props" onClick={this.likePost}>
                            <ThumbUpAltOutlined color="primary" />
                        </MyButton>
                    )
            )
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
                    <Typography variant="h5" component={Link} to={`/users/${userHandle}`} color="primary"></Typography>
                    <Typography variant="h5">{body}</Typography>
                    <CardActions disableSpacing >
                        {likeButton}
                        <span> {likeCount} likes </span>
                        <MyButton tip="Comments">
                            <ChatIcon color="primary" />
                        </MyButton>
                        <span> {commentCount} comments </span>
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
