import React from 'react';
import DesktopSearch from '../Search/Desktop/DesktopSearch';
import MobileSearch from '../Search/Mobile/MobileSearch';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import { ThemeProvider} from '@material-ui/styles'

export default function Search() {
  const theme = useTheme();
  
  const matches = useMediaQuery(theme.breakpoints.up('md'));

  const deviceType = () => {
    if (matches === true) {
      return (
        <DesktopSearch />
      )
    } else {
      return (
        <MobileSearch />
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