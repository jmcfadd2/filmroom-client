import { Card, CardContent, CardMedia, Link, makeStyles, Typography } from '@material-ui/core'
import React, { useEffect } from 'react'

const useStyles = makeStyles((theme) => ({
  media: {
    height: 200
  },
  title: {
    marginBottom: 10
  },
  courseCard: {
    backgroundColor: theme.palette.secondary.dark
  }
})) 

export default function CourseCard(props) {
  const classes = useStyles()
  const { body, title, videos, courseId, image } = props.course
  return (
    <div>
      <Link href={`/courses/${courseId}`} underline="none">
      <Card className={classes.courseCard}>
        <CardMedia
          className={classes.media}
          image={ image ? image : `https://image.mux.com/${videos[0]}/thumbnail.png`}
          height={'100%'} width={'100%'}
        />
        <CardContent>
          
          <Typography color='textSecondary' className={classes.title} variant="h5"> {title} </Typography>
            <Typography color='textSecondary' variant="body1"> {body} </Typography>
        </CardContent>
      </Card>
      </Link>
    </div>
  )
}
