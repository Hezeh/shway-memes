import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import { connect } from 'react-redux';
import { Redirect} from 'react-router-dom';
import { authSignup } from '../../store/actions/auth';
import ReactGA from 'react-ga';
import Fab from '@material-ui/core/Fab';
import SendIcon from '@material-ui/icons/Send';
import * as Yup from 'yup';
import { Formik } from 'formik';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

// import List from '@material-ui/core/List';
// import ListItem from '@material-ui/core/ListItem';
// import ListItemText from '@material-ui/core/ListItemText';
// import ListItemAvatar from '@material-ui/core/ListItemAvatar';
// import ImageIcon from '@material-ui/icons/Image';
// import GroupIcon from '@material-ui/icons/Group';
// import PortraitIcon from '@material-ui/icons/Portrait';
// import WhatshotIcon from '@material-ui/icons/Whatshot';
// import CloudUploadIcon from '@material-ui/icons/CloudUpload';

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
    margin: theme.spacing(1, 0, 2),
    width: '330px'
  },
  margin: {
    margin: theme.spacing(1),
    width: '330px'
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
}));

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const Register = (props) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  let errorMessage = null;
  if (props.error )  {
        errorMessage = (
          <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="error">
              {props.error.message}
            </Alert>
          </Snackbar>
        );

  }

  const [values, setValues] = useState({
    showPassword: false,
  })

  // Is there a conflict with the Formik values?

  const handleClickShowPassword = () => {
    setValues({showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = event => {
    event.preventDefault();
  };
  
  if (props.authenticated) {
    return <Redirect to="/" />;
  }
  return (
    <Formik
      initialValues={{
        username: "", 
        email: "",
        password: "" ,
        confirmPassword: "",
      }}
      validationSchema={Yup.object({
        username: Yup.string()
          .min(3, 'Must be more than 3 characters')
          .max(15, 'Must be 15 characters or less')
          .required('Username is required'),
        email: Yup.string()
          .email("Enter a valid email")
          .required("Email is required"),
        password: Yup.string()
          .min(8, "Password must contain atleast 8 characters")
          .max(20, 'Must be 20 characters or less')
          .required('Password is required'),
        confirmPassword: Yup.string()
          .required("Confirm your password")
          .oneOf([Yup.ref("password")], "Password does not match")
      })}
      onSubmit={(values, actions) => {
        props.onAuth(values.username, values.email, values.password, values.confirmPassword)
        ReactGA.event({
          category: 'User',
          action: 'User Signed Up'
        });
        actions.setSubmitting(false)
        props.history.pushState(null, '/login')
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
          <Typography component="h1" variant="h5">
          Shwaymemes is a community driven platform for sharing cool memes.
         </Typography>
         <Typography  variant="h6">
          Create an account. It is fast and easy!
         </Typography>
         {/* <List className={classes.list}>
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <CloudUploadIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="Share hot and trending memes"/>
            </ListItem>
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <GroupIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="Engage in meme groups"/>
            </ListItem>
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <WhatshotIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="Discover trending memelords" />
            </ListItem>
          </List> */}
          
          <form className={classes.form} onSubmit={formik.handleSubmit}>
            <Grid container spacing={1}> 
              <Grid item xs={12} sm={12}>
                <TextField
                  
                  name="username"
                  variant="outlined"
                  required
                  fullWidth
                  id="userName"
                  label="User Name"
                  autoFocus
                  onChange={formik.handleChange}
                  value={formik.values.username}
                  error={Boolean(formik.errors.username)}
                  helperText={formik.touched ? formik.errors.username: ''}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  
                  onChange={formik.handleChange}
                  value={formik.values.email}
                  error={Boolean(formik.errors.email)}
                  helperText={formik.touched ? formik.errors.email: ''}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type={values.showPassword ? 'text' : 'password'}
                  id="confirmPassword"
                  autoComplete="current-password"
                  onChange={formik.handleChange}
                  value={formik.values.password}
                  error={Boolean(formik.errors.password)}
                  helperText={formik.touched ? formik.errors.password: ''}
                  InputProps= {{
                    endAdornment : 
                      <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                      >
                        {values.showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment> 
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="confirmPassword"
                  label="Confirm Password"
                  type={values.showPassword ? 'text' : 'password'}
                  id="password"
                  autoComplete="current-password"
                  onChange={formik.handleChange}
                  value={formik.values.confirmPassword}
                  error={Boolean(formik.errors.confirmPassword)}
                  helperText={formik.touched ? formik.errors.confirmPassword: ''}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="agreedtoTermsAndPolicy" checked={true} color="secondary" />}
                  label="Agree to Terms and Cookie Policy."
                />
              </Grid>
            </Grid>
            <Fab 
            variant="extended" 
            color="secondary"
            aria-label="submit" 
            type="submit"
            className={classes.submit}
            disabled={!formik.dirty || !formik.isValid || formik.isSubmitting}
           >
             <SendIcon className={classes.extendedIcon} />
               Sign Up
           </Fab>
           <Grid container>
             <Grid item>
               <Link href="/login" variant="body2" color="secondary">
               <Fab 
                  variant="extended" 
                  color="secondary"
                  aria-label="login" 
                  className={classes.margin}
                >
                  Login
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
  )

}

const mapStateToProps = (state) => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    authenticated: state.auth.token !== null
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAuth: (username, email, password1, password2) => dispatch(authSignup(username, email, password1, password2))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Register);