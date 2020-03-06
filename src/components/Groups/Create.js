import React, {useState, useEffect, Fragment} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useForm } from '../../useForm'
import { useHistory, Redirect } from "react-router-dom";
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import axios from 'axios'
import {connect} from 'react-redux'
// import {Redirect} from 'react-router-dom'
import {groupsURL} from '../../constants'
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

const useStyles = makeStyles(theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.dark,
    },
  },
  paper: {
    marginTop: theme.spacing(1),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(),
  },
  margin: {
    margin: theme.spacing(1),
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
  formControl: {
    margin: theme.spacing(3),
  },
}));

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function AddGroup(props) {
  const classes = useStyles();
  const [values, handleChange] = useForm({ groupname: "", grouptype: "true" })
  const [open, setOpen] = React.useState(true);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  // let errorMessage = null;
  // if (props.error )  {
  //       errorMessage = (
  //         <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
  //           <Alert onClose={handleClose} severity="error">
  //             Username or Email already exists
  //           </Alert>
  //         </Snackbar>
  //       );

  // }

  let history = useHistory()
  
  // const successMessage = () => {
  //     return (
  //       <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
  //         <Alert onClose={handleClose} severity="success">
  //           Group Created Successfully
  //         </Alert>
  //       </Snackbar>
  //     )
  // }
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
    axios.defaults.xsrfCookieName = "csrftoken";
    axios.defaults.headers = {
      "Content-Type": "application/json",
      Authorization: `Token ${props.token}`,
    };
    
    await axios.post(groupsURL, {
        name: values.groupname,
        is_public: values.grouptype,
      })
        .then(res => {
          if (res.status === 201) {
            history.push(`/group/${res.data.id}`);
          }
        })
  }
  if (!props.token) {
      return <Redirect to="/register" />;
  }
  return (
        <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>

        <form className={classes.form} onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="groupname"
            label="Groupname"
            name="groupname"
            color="secondary"
            autoFocus
            value={values.groupname}
            onChange={handleChange}
          />
          <FormControl component="fieldset" className={classes.formControl}>
            <FormLabel component="legend" color="secondary">Group Type</FormLabel>
            <RadioGroup  aria-label="group type" name="grouptype" value={values.grouptype} onChange={handleChange}>
              <FormControlLabel
                value="true"
                control={<Radio color="secondary" />}
                label="Public"
                labelPlacement="start"
              />
              <FormControlLabel
                value="false"
                control={<Radio color="secondary" />}
                label="Private"
                labelPlacement="start"
              />
            </RadioGroup>
            
          </FormControl>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="secondary"
            className={classes.submit}
            disabled={props.loading}
          >
            Add Group
          </Button>
        </form>
      </div>
    </Container>
      )
}

const mapStateToProps = state => {
  return {
    token: state.auth.token,
    admin: state.auth.author
  };
};

export default connect(mapStateToProps)(AddGroup)