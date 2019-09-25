import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import LinearProgress from '@material-ui/core/LinearProgress';
//import { mergeClasses } from '@material-ui/styles';

const styles = {
    bar: {
      height: 25,
      width: '100%'
    }
  }

class ProgressBar extends React.Component {
    render(){
        const {variant, className} = this.props
        return (
        <LinearProgress
            color="primary"
            value={20}
            variant="determinate"
            className={styles.bar}
         />
    )
    }
}

export default withStyles(styles)(ProgressBar)