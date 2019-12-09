import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import PersonPinIcon from '@material-ui/icons/PersonPin';
import PeopleIcon from '@material-ui/icons/People';
import { 
    Switch,
    Route,
    Link,
    useRouteMatch,
} from 'react-router-dom';
import People from './PeopleSubs/PeopleSubs'
import Groups from './GroupsSubs/GroupsSubs'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
}));

export default function SubsNavTabs() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  let match = useRouteMatch();


  return (
    <div className={classes.root}>
      <Route 
          path="/subscriptions"
          render={({ location }) => (
            <React.Fragment>
            <AppBar position="static" color="inherit">
              <Tabs
                variant="fullWidth"
                value={value}
                onChange={handleChange}
                aria-label="nav tabs example"
              >
                <Tab icon={<PeopleIcon />} label="Groups" to={`${match.url}`} component={Link}/>
                <Tab icon={<PersonPinIcon />} label="People" to={`${match.url}/people`} component={Link}/>
              </Tabs>
            </AppBar>
            <Switch>
              
              <Route path={`${match.url}/people`}>
                <People />
              </Route>
              <Route path={`${match.url}`}>
                <Groups />
              </Route>
              
            </Switch>
            </React.Fragment>
      )}
      />
    </div>
  );
}
