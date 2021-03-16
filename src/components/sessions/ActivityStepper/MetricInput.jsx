import React from 'react';
import { useFormik } from 'formik';
import { makeStyles } from '@material-ui/core/styles';
import { TextField, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  ...theme.spreadThis,

  labelClass: {
    color: 'white'
  },
  numberField: {
    width: 100,
    height: 100,
    backgroundColor: theme.palette.primary.light,
    borderRadius: 10,
  },
  numberFieldInput: {
    width: 100,
    height: 100,
    borderRadius: 10,
    fontSize: 30,
    backgroundColor: theme.palette.primary.light,
  },
  metricContainer: {
    display: 'flex',
    justifyContent: 'space-around',
    marginTop: 20,
    marginBottom: 20,
  },
  forwardSlash: {
    fontSize: 70,
    color: 'white',

  }

}))


export const MetricInput = ({ drill, }) => {
  const classes = useStyles()
  const formik = useFormik({
    initialValues: { firstCompoundMetric: '', secondCompoundMetric: '' },
    
  })

  return (
    <form>
      {drill.metrics.map((metric, index) => (

        <div key={index}>

          {metric.includes("/") || metric.includes(" x ") ? (
            <div className={classes.metricContainer} key={index}>

              <TextField
                key={index}
                className={classes.numberField}
                rows="1"
                type="number"
                label={metric.split(/(\sx\s|\/)/)[0]}
                name={metric.split(/(\sx\s|\/)/)[0]}
                defaultValue=""
                InputLabelProps={{ className: classes.labelClass }}
                InputProps={{
                  className: classes.numberFieldInput
                }}
                variant="filled"
                onChange={handleFirstCompoundMetric}

              />
              <Typography className={classes.forwardSlash}>/</Typography>
              <TextField
                key={index}
                className={classes.numberField}
                rows="1"
                type="number"
                label={metric.split(/(\sx\s|\/)/)[2]}
                name={metric.split(/(\sx\s|\/)/)[2]}
                InputLabelProps={{ className: classes.labelClass }}
                InputProps={{ className: classes.numberFieldInput }}
                defaultValue=""
                variant="filled"
                onChange={handleSecondCompoundMetric}

              />
            </div>
          ) : (
            <Textfield
              key={index}
              className={classes.numberField}
              rows="1"
              type="number"
              label={metric}
              InputProps={{ className: classes.numberFieldInput }}
              name={metric}
              defaultValue=""
              variant="filled"
              onChange={handleMetric}
              size="small"
            />
          )}
        </div>
      ))}




    </form>
  )
}