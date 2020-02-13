import React from 'react';
import DesktopAppBar from './DesktopAppBar';
import MobileAppBar from './MobileAppBar';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import {createMuiTheme, } from '@material-ui/core/styles';
import { ThemeProvider} from '@material-ui/styles'
import { connect } from 'react-redux';

function AppBar(props) {
  const theme = createMuiTheme({
    palette: {
      type: 'dark'
    },
  })

  const matches = useMediaQuery(theme.breakpoints.up('md'));

  const deviceType = () => {
    if (matches === true) {
      return (
        <DesktopAppBar />
      )
    } else {
      return (
        <MobileAppBar />
      )
    }
  }

  const checkAuthState = () => {
    if (props.authenticated ) {
      return (
        <div>
      <ThemeProvider theme={theme}>
        {deviceType()}
      </ThemeProvider>
    </div>
      )
    } 
    // else {
    //   return <Redirect to="/login" />
    // }
  }

 return (
    <div>
      {checkAuthState()}
    </div>
  )
}

const mapStateToProps = state => {
  return {
    // error: state.auth.error,
    // loading: state.auth.loading,
    authenticated: state.auth.token
  }
}

export default connect(mapStateToProps)(AppBar);