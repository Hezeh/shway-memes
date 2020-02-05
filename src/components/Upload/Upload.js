import React from 'react';
import DesktopUpload from './Desktop/UploadDesktop';
import MobileUpload from './Mobile/UploadMobile';
import useMediaQuery from '@material-ui/core/useMediaQuery';
//import { useTheme } from '@material-ui/core/styles';
import {createMuiTheme, } from '@material-ui/core/styles';
import { ThemeProvider} from '@material-ui/styles'


export default function Upload() {
  //const theme = useTheme();
  const theme = createMuiTheme({
    palette: {
      type: 'dark'
    },
  })

  const matches = useMediaQuery(theme.breakpoints.up('md'));

  const deviceType = () => {
    if (matches === true) {
      return (
        <DesktopUpload />
      )
    } else {
      return (
        <MobileUpload />
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