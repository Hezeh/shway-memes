import React from 'react';
import GlobalDesktop from './DesktopHome';
import GlobalMobile from './MobileHome';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import { ThemeProvider} from '@material-ui/styles'
import { Redirect} from 'react-router-dom';
import { connect } from 'react-redux';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import PeopleIcon from '@material-ui/icons/People';
import { 
    Switch,
    Route,
    Link,
    useRouteMatch,
} from 'react-router-dom';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import FollowingMobile from './FollowingMobile';
import FollowingDesktop from './FollowingDesktop'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    [theme.breakpoints.up('md')]: {
      paddingTop: '60px',
    },
  },
}));

function Home(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  let match = useRouteMatch();

  const theme = useTheme();
  
  const matches = useMediaQuery(theme.breakpoints.up('md'));

  // const globaldeviceType = () => {
  //   if (matches === true) {
  //     return (
  //       <GlobalDesktop />
  //     )
  //   } else {
  //     return (
  //       <GlobalMobile />
  //     )
  //   }
  // }

  // const followingdeviceType = () => {
  //   if (matches === true ) {
  //     return (
  //       <FollowingDesktop />
  //     )
  //   } else {
  //     return (
  //       <FollowingMobile />
  //     )
  //   }
  // }

  // const deviceType = () => {
  //   
  // }

  // const checkAuthStateDesktop = () => {
  //   if (props.authenticated ) {
  //     return (
  //       <div>
  //     <ThemeProvider theme={theme}>
  //       {deviceType()}
  //     </ThemeProvider>
  //   </div>
  //     )
  //   } 
  //   else {
  //     return <Redirect to="/register" />
  //   }
  // }

  // const checkAuthStateMobile = () => {
  //   if (props.authenticated ) {
  //     return (
  //       <div>
  //     <ThemeProvider theme={theme}>
  //       {deviceType()}
  //     </ThemeProvider>
  //   </div>
  //     )
  //   } 
  //   else {
  //     return <Redirect to="/register" />
  //   }
  // }

//  return (
//     <div>
//       {checkAuthState()}
//     </div>
//   )

  if (!props.authenticated) {
    return <Redirect to="/login"/>
  }

return (
  <div className={classes.root}>
      <Route 
         path={`/home`}
          render={({ location }) => (
            <React.Fragment>
            <AppBar position="static" color="inherit">
              <Tabs
                variant="fullWidth"
                value={value}
                onChange={handleChange}
                aria-label="Groups Tabs"
                indicatorColor="secondary"
                textColor="secondary"
              >
                <Tab icon={<PeopleIcon />} label="Global" to={`${match.url}`} component={Link}/>
                <Tab icon={<SupervisorAccountIcon/>} label="Following" to={`${match.url}/following`} component={Link}/>
              </Tabs>
            </AppBar>
            <Switch>
            <Route path={`${match.url}/following`} >
                {matches === true && <FollowingDesktop />}
                {matches === false && <FollowingMobile />}
              </Route>  

              <Route path={`${match.url}`}>
                {matches === true && <GlobalDesktop />}
                {matches === false && <GlobalMobile />}
              </Route> 
                     
            </Switch>
            </React.Fragment>
      )}
      />
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

export default connect(mapStateToProps)(Home);