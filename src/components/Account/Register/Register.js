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
import { authSignup } from '../../../store/actions/auth';
import { useForm } from '../../../useForm'
import { useHistory } from "react-router-dom";

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

const Register = (props) => {
  const classes = useStyles();

  const [values, setValues] = useState({
    showPassword: false,
  })

  const [values2, handleChange] = useForm({ 
    email: "",
    username: "", 
    password: "" ,
    confirmPassword: "",
    formError: ""
  });

  const [isLoading, setIsLoading] = useState(true)

  let history = useHistory();

  // const [username, setUsername] = useState("");
  // const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');
  // const [confirmPassword, setConfirmPassword] = useState('');
  // const [formError, setFormError] = useState(null)

  const handleSubmit = (e) => {
    e.preventDefault();
    // if (
    //   values2.username !== "" &&
    //   values2.email !== "" &&
    //   values2.password !== "" &&
    //   values2.confirmPassword !== "" &&
    //   comparePasswordLength() === true
    // )
    props.onAuth(values2.username, values2.email, values2.password, values2.confirmPassword)
  }

  const comparePasswordLength = () => {
    if (values2.password.length >= 6 && values2.confirmPassword.length >= 6) {
      return true;
    } else {
     values2.formError("Your password must be a minimum of 6 characters")
    }
    return false;
  }

  // const handleChange = prop => event => {
  //   setValues({[prop]: event.target.value });
  //   setFormError(null)
  // };

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
    <Container component="main" maxWidth="xs">
          <CssBaseline />            
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
            Sign up to share and view cool memes, follow trending meme hashtags, discover new memelords 
            and engage in meme groups.
            </Typography>
            
            <form className={classes.form} onSubmit={handleSubmit}>
              <Grid container spacing={1}> 
                <Grid item xs={12} sm={12}>
                  <TextField
                    autoComplete="fname"
                    name="username"
                    variant="outlined"
                    required
                    fullWidth
                    id="userName"
                    label="User Name"
                    autoFocus
                    onChange={handleChange}
                    value={values2.username}
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
                    value={values2.email}
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
                    onChange={handleChange}
                    value={values2.password}
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
                    value={values2.confirmPassword}
                   
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
                disabled={props.loading}
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