import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import PersonPinIcon from '@material-ui/icons/PersonPin';
import PeopleIcon from '@material-ui/icons/People';
import { 
    Switch,
    Route,
    Link,
    useRouteMatch,
} from 'react-router-dom';
import People from './People/People'
import Groups from './GroupsList/GroupsList'
import Hashtags from './Hashtags/Hashtags'

function a11yProps(index) {
  return {
    id: `nav-tab-${index}`,
    'aria-controls': `nav-tabpanel-${index}`,
  };
}

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  fab: {
    position: 'absolute',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
}));

export default function TrendingNavTabs() {
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  let match = useRouteMatch();

  const transitionDuration = {
    enter: theme.transitions.duration.enteringScreen,
    exit: theme.transitions.duration.leavingScreen,
  };


  return (
    <div className={classes.root}>
      <Route 
          path="/trending"
          render={({ location }) => (
            <React.Fragment>
            <AppBar position="static" color="inherit">
              <Tabs
                variant="fullWidth"
                value={value}
                onChange={handleChange}
                aria-label="nav tabs example"
              >
                <Tab icon={<TrendingUpIcon />} label="Hashtags" to={`${match.url}`} {...a11yProps(0)} component={Link} />
                <Tab icon={<PeopleIcon />} label="Groups" to={`${match.url}/groups`} {...a11yProps(1)} component={Link}/>
                <Tab icon={<PersonPinIcon />} label="Meme lords" to={`${match.url}/people`} {...a11yProps(2)} component={Link}/>
              </Tabs>
            </AppBar>
            <Switch>
              <Route path={`${match.url}/groups`}>
                <Groups />
              </Route>
              <Route path={`${match.url}/people`}>
                <People />
              </Route>
              <Route path={`${match.url}`}>
                <Hashtags />
              </Route>
            </Switch>
            </React.Fragment>
      )}
      />
    </div>
  );
}