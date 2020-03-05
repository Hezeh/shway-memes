import React, {useState, useEffect, Fragment} from 'react'
import Fab from '@material-ui/core/Fab';
import { makeStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import axios from 'axios';
import {groupPostsURL, groupsURL, groupJoinURL} from '../../../constants'
import { connect } from 'react-redux'
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
// import { GroupJoinButton } from '../../common'

export const useStyles = makeStyles(theme => ({
    fabButton: {
      position: 'absolute',
      left: 0,
      right: 0,
      margin: '100px auto',
    },
    groupinput: {
      display: 'none'
    },
    button: {
      position: 'absolute',
      marginTop: '10px',
      marginLeft: '30%',
      // marginRight: '50%',
      paddingLeft: '50px',
      paddingRight: '50px'
    }
}));

function GroupUpload(props) {
    const classes = useStyles();
    const [file, setFile] = useState('');
    const [filename, setFilename] = useState('Choose File');
    // const [uploadedFile, setUploadedFile] = useState({});
    // const [message, setMessage] = useState('');
    // const [uploadPercentage, setUploadPercentage] = useState(0);
    const [preview, setPreview] = useState()
    const [caption, setCaption] = useState('')

    const [ isLoading, setIsLoading] = useState(false)
    const [data, setData] = useState([]);
    const [url] = useState(`${groupsURL}${props.groupid}`);
    const [buttonState, setButtonState] = useState(false);

    const handleClick = () => {
      if ( data.member === true) {
          axios.defaults.headers = {
            "Content-Type": "application/json",
            Authorization: `Token ${props.token}`
          }
          axios.delete(`${groupJoinURL}${data.id}/join`)
      } else {
        axios.defaults.headers = {
            "Content-Type": "application/json",
            Authorization: `Token ${props.token}`
          }
          axios.post(`${groupJoinURL}${data.id}/join`)
      }
      setButtonState(prev => !prev);
    }
  
    async function fetchData() {
        setIsLoading(true)
        axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
        axios.defaults.xsrfCookieName = "csrftoken";
        axios.defaults.headers = {
          "Content-Type": "application/json",
          Authorization: `Token ${props.token}`,
        };
        axios
            .get(url)
            .then(response => {
              setIsLoading(false)
              setData(response.data)
              setButtonState(response.data.member)
              console.log(response.data.member)
            })
            .catch(err => {
              console.log(err)
              setIsLoading(false)
            })
      }

    useEffect(() => {
          fetchData();
      }, []);
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

    const grouphandleOpen = (e) => {
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

    const grouphandleClose = () => {
      setOpen(false);
    };


    const grouphandleSubmit = async () => {
      const groupData = new FormData();
      groupData.append('post', file);
      groupData.append('author', props.author);
      groupData.append('caption', caption)
      groupData.append('group', data.id)
      axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
      axios.defaults.xsrfCookieName = "csrftoken";
      axios.defaults.headers = {
        "Content-Type": "multipart/form-data",
        Authorization: `Token ${props.token}`,
      };

        await axios.post(groupPostsURL, groupData)
          .then(res => {
            if (res.status === 201) {
              grouphandleClose()
            }
          })
    }

    return (
        <Fragment>
          {(isLoading) ? <div></div>  :  <Button
            variant={buttonState === true ? 'outlined' : 'contained'}
            color="secondary"
            className={classes.button}
            onClick={handleClick}
            size="large"
          >
            { buttonState === true ? 'Leave' : 'Join'}
          </Button>}
         
            <input
              accept="image/*"
              className={classes.groupinput}
              id="contained-button-group"
              type="file"
              onChange={grouphandleOpen}
            />
          <label htmlFor="contained-button-group">
            <Fab 
              color="secondary" 
              aria-label="add" 
              className={classes.fabButton} 
              title="Select Memes" 
              type="submit"
              component="span"
              variant="extended"
              disabled={data.member === false}
              >
              <AddIcon />
              Upload
            </Fab>
          </label>
          <Dialog open={open} onClose={grouphandleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Group Upload </DialogTitle>
            <DialogContent>
              <div>{file && <img  height={400} src={preview} /> }</div>
              {/* <TextField
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
              <Button onClick={grouphandleClose}  variant="contained" color="secondary">
                Cancel
              </Button>
              <Button onClick={grouphandleSubmit} variant="contained" color="secondary">
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
    author: state.auth.author,
  };
};

export default connect(mapStateToProps)(GroupUpload)