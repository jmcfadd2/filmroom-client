import React, { Component } from 'react'
import {  Grid, withStyles } from '@material-ui/core'
import PropTypes from 'prop-types';

// Components
import Profile from '../components/profile/Profile'
import PostSkeleton from '../util/PostSkeleton';
import { Box } from '@material-ui/core'

// Redux 
import { connect } from 'react-redux'
import { getCourses } from '../redux/actions/courseActions';
import CourseCard from '../components/courses/CourseCard';

const styles = (theme) => ({
  ...theme.spreadThis,
  homeGrid: {
    marginTop: 50,
  },
  upload: {
    marginTop: 20,
    backgroundColor: theme.palette.secondary.dark
  }
})

export class learn extends Component {

  componentDidMount() {
    this.props.getCourses();
  }

  render() {
    const { classes } = this.props
    const { courses, loading } = this.props.courses;
    let recentCoursesMarkup = !loading ? (
      courses.map((course, idx) => {
        return <CourseCard id={`course${idx + 1}`} key={course.courseId}  course={course} />
      })
    ) : <PostSkeleton />
    return (
      <Box mt={10}>
        <Grid className={classes.homeGrid} container spacing={2}>

          <Grid item md={4} sm={12} xs={12}>
            <Profile />
          </Grid>

          <Grid item md={6} style={{ paddingLeft: 25, paddingRight: 25, paddingTop: 25 }} sm={12} xs={12}>
            
              {recentCoursesMarkup}
            

            {/* <Paper className={classes.upload}>
              <Typography color='textSecondary'>
                Upload your own course and become a FilmRoom coach today
              </Typography>
              <Button color='primary' variant="contained" href='/upload-training'>
                Upload Now!
              </Button>
            </Paper> */}
          </Grid>
        </Grid>
      </Box>
    )
  }
}

learn.propTypes = {
  getCourses: PropTypes.func.isRequired,
  courses: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  courses: state.courses
});

export default connect(
  mapStateToProps,
  { getCourses }
)(withStyles(styles)(learn));

