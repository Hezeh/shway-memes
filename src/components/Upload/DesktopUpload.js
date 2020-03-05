import React, {Fragment, useState, useEffect} from 'react'
import Fab from '@material-ui/core/Fab';
import { makeStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import axios from 'axios';
import {uploadsURL} from '../../constants'
import { connect } from 'react-redux'
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';


const useStyles = makeStyles(theme => ({
    input: {
      display: 'none'
    }, 
    fabButton: {
      position: 'relative',
      left: 0,
      right: 0,
      margin: '0 auto',
    },
}));

function UploadFab(props) {
    const classes = useStyles();
    // let history = useHistory();

    const [file, setFile] = useState('');
    const [filename, setFilename] = useState('Choose File');
    // const [uploadedFile, setUploadedFile] = useState({});
    // const [message, setMessage] = useState('');
    // const [uploadPercentage, setUploadPercentage] = useState(0);
    const [preview, setPreview] = useState()
    const [caption, setCaption] = useState('')
    const [submiting, setSubmiting] = useState(false)

    // create a preview as a side effect, whenever selected file is changed
    useEffect(() => {
        if (!file) {
            setPreview(undefined)
            return
        }

        const objectUrl = URL.createObjectURL(file)
        setPreview(objectUrl)

        // free memory when ever this component is unmounted
        return () => URL.revokeObjectURL(objectUrl)
    }, [file])

    const [open, setOpen] = React.useState(false);

    const handleOpen = (e) => {
      if (!e.target.files || e.target.files.length === 0) {
        setFile(undefined)
        return
      }
      setFile(e.target.files[0])
      setFilename(e.target.files[0].name)
      setOpen(true);
    };

    const handleCaptionChange = (e) => {
      setCaption(e.target.caption)
    }

    const handleClose = () => {
      setOpen(false);
    };


    const handleSubmit = async () => {
      // console.log('Called Submit Component')
      setSubmiting(true)
      const formData = new FormData();
      formData.append('photo', file);
      formData.append('author', props.author);
      formData.append('caption', caption)
      axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
      axios.defaults.xsrfCookieName = "csrftoken";
      axios.defaults.headers = {
        "Content-Type": "multipart/form-data",
        Authorization: `Token ${props.token}`,
      };

        await axios.post(uploadsURL, formData)
          .then(res => {
            if (res.status === 201) {
              handleClose()
              setSubmiting(false)
            }
          })
    }


    return (
        <Fragment>
            <input
              accept="image/*"
              className={classes.input}
              id="contained-button-file"
              multiple
              type="file"
              onChange={handleOpen}
            />
          <label htmlFor="contained-button-file">
            <Fab 
              color="secondary" 
              aria-label="add" 
              className={classes.fabButton} 
              title="Select Memes"
              component="span">
                <AddIcon />
            </Fab>
          </label>
          <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Upload</DialogTitle>
            <DialogContent>
              <div>
                {file && 
               <img height={400} src={preview} /> }
              </div>
              {/* <img height={400} src={preview} />
              <TextField
                autoFocus
                margin="dense"
                id="caption"
                fullWidth
                label="Caption"
                variant="outlined"
                color="secondary"
                onChange={handleCaptionChange}
              /> */}
            </DialogContent>
            <DialogActions>
            
              <Button onClick={handleClose}  variant="contained" color="secondary">
                Cancel
              </Button>
              <Button onClick={handleSubmit} disabled={submiting === true} variant="contained" color="secondary">
                Submit
              </Button>
            </DialogActions>
          </Dialog>
          </Fragment>
    )
}

const mapStateToProps = state => {
  return {
    token: state.auth.token,
    username: state.auth.username,
    author: state.auth.author,
  };
};

export default connect(mapStateToProps)(UploadFab)