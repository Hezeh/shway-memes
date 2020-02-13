import React from 'react';
import { makeStyles} from '@material-ui/core/styles';
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
import People from './Memelords'
import Groups from './GroupsList'
import Hashtags from './Hashtags'

function a11yProps(index) {
  return {
    id: `nav-tab-${index}`,
    'aria-controls': `nav-tabpanel-${index}`,
  };
}

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    // paddingTop: '60px',
    [theme.breakpoints.up('md')]: {
      paddingTop: '60px',
    },
  },
  fab: {
    position: 'absolute',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
}));

export default function TrendingNavTabs() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  let match = useRouteMatch();

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
                aria-label="Trending Tabs"
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