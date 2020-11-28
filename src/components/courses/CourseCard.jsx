import { Card, CardContent, CardMedia, Typography } from '@material-ui/core'
import React, { useEffect } from 'react'

export default function CourseCard(props) {
  const { body, videos } = props.course
  return (
    <div>
      <Card>
        <CardMedia
          image={`https://image.mux.com/${videos[0]}/thumbnail.png?width=214&height=121&fit_mode=pad`}
          
        />
        <CardContent>
          {console.log(videos[0])}
          <Typography> {body} </Typography>
        </CardContent>
      </Card>
    </div>
  )
}
