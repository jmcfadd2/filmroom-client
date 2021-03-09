import { makeStyles, Typography } from '@material-ui/core';
import React from 'react';

const useStyles = makeStyles((theme) => ({
  ...theme.spreadThis,
  hit: {
    listStyleType: 'none'
  }
}))

const SearchHits = ({ hit }) => {
  const classes = useStyles()
  return (
    <div>
      <Typography variant='body' className={classes.hit}>{hit.userHandle}</Typography>
    </div>
  );
}

export default SearchHits;
