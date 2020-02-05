import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';

const useStyles = makeStyles(theme => ({
  root: {
    '& > *': {
      margin: theme.spacing(5),
    },
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
}));

export default function FloatingActionButtons() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Fab variant="extended" color="secondary">
        <CloudUploadIcon className={classes.extendedIcon} />
        Upload
      </Fab>
    </div>
  );
}
