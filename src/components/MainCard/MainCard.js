import React from 'react';
import DesktopAppBar from './DesktopCard/DesktopCard';
import MobileAppBar from './MobileCard/MobileCard';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
//import {createMuiTheme, } from '@material-ui/core/styles';
import { ThemeProvider} from '@material-ui/styles'
import { Redirect} from 'react-router-dom';
import { connect } from 'react-redux';

function Card(props) {
  
  const theme = useTheme();
  
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
    else {
      return <Redirect to="/login" />
    }
  }

 return (
    <div>
      {checkAuthState()}
    </div>
  )
}


const mapStateToProps = state => {
  return {
    error: state.auth.error,
    loading: state.auth.loading,
    authenticated: state.auth.token
  }
}

export default connect(mapStateToProps)(Card);