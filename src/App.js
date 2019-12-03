import React, { Fragment, useEffect} from 'react';
import { ThemeProvider} from '@material-ui/styles'
import {createMuiTheme} from '@material-ui/core/styles';
import './App.css';
import * as actions from './store/actions/auth';
//import { setLoadingBarProgress } from './store/actions/progressBar';
import { BrowserRouter as Router} from 'react-router-dom';
import { connect } from 'react-redux';
import BaseRouter from './routes';
//import store from './store/store'
//import LoadingBar from 'react-top-loading-bar'


//const { loadingBar } = store.getState();

const App = (props) => {
  const theme = createMuiTheme({
    palette: {
      type: 'dark'
    }
  })

  useEffect(() => {
    props.onTryAutoSignup()
  })

  //theme = responsiveFontSizes(theme)

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
  console.log(state)
  return {
    isAuthenticated: state.auth.token !== null,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
