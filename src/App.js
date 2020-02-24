import React, { Fragment, useEffect} from 'react';
import { ThemeProvider} from '@material-ui/styles'
import {createMuiTheme} from '@material-ui/core/styles';
import './App.css';
import * as actions from './store/actions/auth';
import { BrowserRouter as Router} from 'react-router-dom';
import { connect } from 'react-redux';
import BaseRouter from './routes';
import ReactGA from 'react-ga';

const App = (props) => {

  useEffect(() => {
    ReactGA.initialize('UA-157796668-2', {
      debug: false,
      titleCase: false,
      gaOptions: {
        siteSpeedSampleRate: 100 
      }});
    ReactGA.pageview(window.location.pathname + window.location.search);

  }, [])
  
  const theme = createMuiTheme({
    palette: {
      type: 'dark'
    },
  })

  useEffect(() => {
    props.onTryAutoSignup()
  })

  return (
    <Fragment>
      <Router>
        <ThemeProvider theme={theme}>
          <BaseRouter />
        </ThemeProvider>
     </Router>
    </Fragment>
  )
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
