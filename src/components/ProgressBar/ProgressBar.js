import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { LinearProgress } from '@material-ui/core';

const styles = {
  root: {
    display: 'flex',
    alignItems: 'center',
    flexGrow: 1,
    height: 8,
    borderRadius: '20px',
    margin: '10px',
  },
  colorPrimary: {
    background: 'linear-gradient(45deg, #aba9bb 30%, #aba9bb 90%)'
  }
};

class ColoredLinearProgress extends Component {
  render() {
    const { classes, progress } = this.props;
    return( 
      <div className={classes.root}>
    <LinearProgress value={progress} variant='determinate' color='primary' {...this.props} clasName={classes.colorPrimary}/> 
    </div>
    )
  }
}

export default  withStyles(styles)(ColoredLinearProgress);