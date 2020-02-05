import React from 'react'
import Fab from '@material-ui/core/Fab';
import PublishIcon from '@material-ui/icons/Publish';
import { useHistory } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    input: {
      display: 'none'
    }, 
}));

export default function UploadFab() {
    const classes = useStyles();
    let history = useHistory();
    function handleChange() {
        history.push("/home");
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
            <Fab color="secondary" aria-label="add" title="Select Memes" component="span">
              <PublishIcon />
            </Fab>
          </label>
        </div>
    )
}
