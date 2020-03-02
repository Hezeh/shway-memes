import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { connect } from 'react-redux';
import { authLogin } from '../../store/actions/auth';
import { Redirect } from "react-router-dom";
import ReactGA from 'react-ga';
import Fab from '@material-ui/core/Fab';
import SendIcon from '@material-ui/icons/Send';
import * as Yup from 'yup';
import { Formik } from 'formik';
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
    margin: theme.spacing(1),
    width: '330px'
  },
  margin: {
    margin: theme.spacing(1),
    width: '330px'
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
  list: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}


function Login(props) {
  const classes = useStyles();
  const isAuthenticated = props.authenticated;
  const [open, setOpen] = React.useState(true);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  let errorMessage = null;
  if (props.error)  {
        errorMessage = (
          <Snackbar open={open} >
            <Alert severity="error">
              {props.error.message}
            </Alert>
          </Snackbar>
        );
  }
  if (isAuthenticated) {
    return <Redirect to="/" />;
  }

    return (
      <Formik
        initialValues={{
          username: '',
          password: ''
        }}
       validationSchema={Yup.object({
         username: Yup.string()
           .min(3, 'Must be more than 3 characters')
           .max(15, 'Must be 15 characters or less')
           .required('Username is required'),
         password: Yup.string()
         .min(8, "Password must contain atleast 8 characters")
           .max(20, 'Must be 20 characters or less')
           .required('Password is required'),
       })}
       onSubmit={(values, actions) => {
        props.onAuth(values.username, values.password)
        ReactGA.event({
          category: 'User',
          action: 'User Logged In'
        });
        actions.setSubmitting(false)
       }}
      >
        {formik => (
          <React.Fragment>
            {errorMessage}
          <Container component="main" maxWidth="xs">
       <CssBaseline />
       <div className={classes.paper}>
         <Avatar className={classes.avatar}>
           <LockOutlinedIcon />
         </Avatar>
         <Typography variant="h6">
           Login
         </Typography>
         <form className={classes.form} onSubmit={formik.handleSubmit}>
           <TextField
             variant="outlined"
             margin="normal"
             required
             fullWidth
             id="username"
             label="Username"
             name="username"
             autoFocus
             value={formik.values.username}
             onChange={formik.handleChange}
             error={Boolean(formik.errors.username)}
             helperText={formik.touched ? formik.errors.username: ''}
           />
           <TextField
             variant="outlined"
             margin="normal"
             required
             fullWidth
             name="password"
             label="Password"
             type="password"
             id="password"
             autoComplete="current-password"
             value={formik.values.password}
             onChange={formik.handleChange}
             error={Boolean(formik.errors.password)}
             helperText={formik.touched ? formik.errors.password: ''}
           />
          <Fab 
            variant="extended" 
            color="secondary"
            aria-label="submit" 
            type="submit"
            className={classes.submit}
            disabled={!formik.dirty || !formik.isValid || formik.isSubmitting}
           >
             <SendIcon className={classes.extendedIcon} />
               Sign In
           </Fab>
           <Grid container>
             <Grid item>
               <Link href="/register" variant="body2" color="secondary">
               <Fab 
                  variant="extended" 
                  color="secondary"
                  aria-label="signup" 
                  className={classes.margin}
                >
                  Sign up
               </Fab>
               </Link>
             </Grid>
           </Grid>
         </form>
       </div>
     </Container>
       </React.Fragment>
        )}
      </Formik>
    );
}

const mapStateToProps = state => {
  return {
    error: state.auth.error,
    loading: state.auth.loading,
    authenticated: state.auth.token
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onAuth: (username, password) => dispatch(authLogin(username, password))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);