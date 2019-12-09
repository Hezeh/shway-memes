import React from 'react';
import DesktopAppBar from './DesktopCard/DesktopCard';
import MobileAppBar from './MobileCard/MobileCard';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
//import {createMuiTheme, } from '@material-ui/core/styles';
import { ThemeProvider} from '@material-ui/styles'

export default function Card() {
  
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

  return (
    <div>
      <ThemeProvider theme={theme}>
        {deviceType()}
      </ThemeProvider>
    </div>
  )
}
