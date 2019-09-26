import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button';
//import { mergeClasses } from '@material-ui/styles';

const styles = {
    bar: {
      background: 'linear-gradient(45deg, #008a67 30%, #008a67 90%)',
      height: 30,
      width: '20%',
      color: 'white'
    }
  }

  const MaterialButton = props => {
      const {onClick, classes, paused} = props
    return (
        <Button
            onClick={onClick}
            className={(classes.bar)}
            color='secondary'
         >{paused ? 'Pause' : 'Play'}</Button>
    )
    }


export default withStyles(styles)(MaterialButton)