import React, {useState} from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions/auth';
import { useForm } from '../../../useForm'

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
}));

function HashtagInput(props) {
  const classes = useStyles();
  const [values, handleChange] = useForm({ caption: "", hashtag: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(props)
    props.onAuth(values.username, values.password)
    props.history.push('/')
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <form className={classes.form} onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            id="caption"
            label="Caption"
            name="caption"
            autoFocus
            value={values.caption}
            onChange={handleChange}
          />
        </form>
      </div>
    </Container>
  );
}

const mapStateToProps = state => {
  return {
    error: state.auth.error
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onAuth: (username, password) => 
      dispatch(actions.authLogin(username, password))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HashtagInput);