import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
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
import { authSignup as signup} from '../../store/actions/auth';
import Fab from '@material-ui/core/Fab';
import TwitterIcon from '@material-ui/icons/Twitter';
import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';

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
  },
  margin: {
    margin: theme.spacing(1)
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
}));

const Register = ({authenticated, loading, signup, error}) => {
  const classes = useStyles();

  const [values, setValues] = useState({
    showPassword: false
  })

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [formError, setFormError] = useState(null)

  const handleSubmit = e => {
    e.preventDefault();
    if (
      username !== "" &&
      email !== "" &&
      password !== "" &&
      confirmPassword !== "" &&
      comparePasswordLength() === true
    )
    signup(username, email, password, confirmPassword)
  }

  const comparePasswordLength = () => {
    if (password.length >= 6 && confirmPassword.length >= 6) {
      return true;
    } else {
      setFormError("Your password must be a minimum of 6 characters")
    }
    return false;
  }

  const handleChange = prop => event => {
    setValues({[prop]: event.target.value });
    setFormError(null)
  };

  const handleClickShowPassword = () => {
    setValues({showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = event => {
    event.preventDefault();
  };

  if (authenticated) {
    return <Redirect to="/" />
  } else {
    return (
        <Container component="main" maxWidth="xs">
          <CssBaseline />            
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign up to view Memes.
            </Typography>
            <Fab variant="extended" color="secondary" aria-label="add" className={classes.margin}>
              <TwitterIcon className={classes.extendedIcon} />
              Sign in with Twitter
            </Fab>
            <Fab variant="extended" fullWidth color="secondary" aria-label="add" className={classes.margin}>
              <FacebookIcon className={classes.extendedIcon} />
              Sign in with Facebook
            </Fab>
            <Fab variant="extended" color="secondary" aria-label="add" className={classes.margin}>
              <InstagramIcon className={classes.extendedIcon} />
              Sign in with Instagram
            </Fab>
            <form className={classes.form} Validate onSubmit={handleSubmit}>
              <Grid container spacing={1}> 
                <Grid item xs={12} sm={12}>
                  <TextField
                    autoComplete="fname"
                    name="userName"
                    variant="outlined"
                    required
                    fullWidth
                    id="firstName"
                    label="User Name"
                    autoFocus
                    onChange={handleChange}
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
                    autoComplete="email"
                    onChange={handleChange}
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
                    id="password"
                    autoComplete="current-password"
                    onChange={handleChange}
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
                    onChange={handleChange}
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
                  <FormControlLabel
                    control={<Checkbox value="agreedtoTermsAndConditions" checked={true} color="secondary" />}
                    label="Agree to Terms and Conditions."
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="secondary"
                className={classes.submit}
                disabled={loading}
              >
                Sign Up
              </Button>
              <Grid container justify="flex-end">
                <Grid item>
                  <Link href="/login" variant="body2" color="secondary">
                    Already have an account? Sign in
                  </Link>
                </Grid>
              </Grid>
            </form>
          </div>
      </Container>
      )
    }
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
    signup: (username, email, password1, password2) =>
      dispatch(signup(username, email, password1, password2))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Register);