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
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
// Icons
import ChatIcon from '@material-ui/icons/Chat';

// Redux
import { connect } from 'react-redux'
import { likePost, unlikePost } from '../../redux/actions/dataActions';
import MyButton from '../../util/MyButton';
import { Grid, GridList, GridListTile } from '@material-ui/core';
import ReactPlayer from 'react-player';



const styles = {
  card: {
    postion: "relative",
    marginBottom: 20,
    backgroundColor: '#262F50'
  },
  image: {
    minWidth: 200,
    objectFit: 'cover',
  },
  content: {
    padding: 25,
    paddingLeft: 30,
    marginBottom: 8,
  },
  sessionTitle: {
    fontWeight: 600,
    marginBottom: 15,
  },
  subActivity: {
    fontWeight: 700,
    marginTop: 15,
    marginBottom: 15,
  },
  results: {
    marginLeft: 30
  }


}

export class Post extends Component {

  sortValues = () => {

  }

  render() {
    dayjs.extend(relativeTime)
    const { classes, post: {
      body,
      createdAt,
      userImage,
      userHandle,
      title,
      session,
      videos,
      images,
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
            <Avatar component={Link} to={`/users/${userHandle}`} src={userImage} className={classes.avatar}>
            </Avatar>
          }
          action={
            deleteButton
          }
          title={
            <Typography
              component={Link}
              color='textSecondary'
              to={`/users/${userHandle}`} variant='body1'
            >
              {userHandle}
            </Typography>

          }
          subheader={dayjs(createdAt).format("MMMM D, YYYY")}

        />
        <CardContent className={classes.content}>
          {title && <Typography variant="h4" color={'textSecondary'} className={classes.sessionTitle}>{title}</Typography>}
          <Typography color={'textSecondary'} variant="h5">{body}</Typography>
          <Grid container justify="center">
            {session && <Typography variant="h6" color={'textSecondary'} className={classes.subActivity}>Drills</Typography>}
            <Grid justify="space-around" alignItems="center" container >

              {session &&
                session.drillResults.map((result, index) => (
                  <Grid item key={index}  >
                    <Typography
                      variant="body1"
                      color={'textSecondary'}
                    >
                      {result.drillName}
                    </Typography>
                    {!result.results.compoundMetric ?
                      result.results.map((metric, index) => (
                        <div key={index}>
                          <Typography color={'textSecondary'}>{metric}</Typography>
                        </div>
                      )) : (
                        <div style={styles.compoundMetric}>
                          <Typography color={'textSecondary'}>
                            {result.results.compoundMetric[0]}/{result.results.compoundMetric[1]}
                          </Typography>
                          <Typography color={'textSecondary'}>
                            {(result.results.compoundMetric[0] / result.results.compoundMetric[1] * 100).toPrecision(3)}%
                        </Typography>
                        </div>
                      )}

                  </Grid>
                ))}
            </Grid>
            <GridList cellHeight={160} style={{ flexWrap: 'nowrap' }}>
              {videos && videos.map((video, index) => (
                <GridListTile key={index} style={{ minWidth: "250px" }}>
                  <ReactPlayer
                    url={`https://stream.mux.com/${video}.m3u8`}
                    light={`https://image.mux.com/${video}/thumbnail.png?width=428&start=3.0864165`} height="100%"
                    width="100%" />
                </GridListTile>
              ))}
              {images && images.map((image, index) => (
                <GridListTile key={index}>
                  <img src={image} alt="post" />
                </GridListTile>
              ))}
            </GridList>
          </Grid>
        </CardContent>
        <CardActions disableSpacing >
          <LikeButton postId={postId} />
          <Typography color={'textSecondary'}> {likeCount} likes </Typography>
          <MyButton tip="Comments">
            <ChatIcon color="primary" />
          </MyButton>
          <Typography color={'textSecondary'}> {commentCount} comments </Typography>
          <PostDialog
            postId={postId}
            userHandle={userHandle}
            openDialog={this.props.openDialog}
          />
        </CardActions>


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
