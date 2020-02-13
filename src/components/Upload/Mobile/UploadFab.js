import React from 'react'
import Fab from '@material-ui/core/Fab';
import { useHistory } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';

export const useStyles = makeStyles(theme => ({
    fabButton: {
      position: 'absolute',
      zIndex: 1,
      top: -30,
      left: 0,
      right: 0,
      margin: '0 auto',
    },
    input: {
      display: 'none'
    }, 
}));
  

export default function UploadFab() {
    const classes = useStyles();
    let history = useHistory();

    function handleChange() {
        history.push("/upload");
    }
    
    return (
        <div>
            <input
              accept="image/*"
              className={classes.input}
              id="contained-button-file"
              multiple
              type="file"
              onChange={handleChange}
            />
          <label htmlFor="contained-button-file">
            <Fab color="secondary" aria-label="add" className={classes.fabButton} title="Select Memes" component="span">
              <AddIcon />
            </Fab>
          </label>
        </div>
    )
}
