import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
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
import CreateGroup from './Create/Create'
import Groups from './GroupsSubs/GroupsSubs'
import GroupAddIcon from '@material-ui/icons/GroupAdd';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
}));

export default function SubsNavTabs(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  let match = useRouteMatch();


  return (
    <div className={classes.root}>
      <Route 
          path="/groups"
          // path={`@${props.profile.username}`}
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
                <Tab icon={<GroupAddIcon />} label="Add Group" to={`${match.url}/addgroup`} component={Link}/>
              </Tabs>
            </AppBar>
            <Switch>
              
              <Route path={`${match.url}/addgroup`}>
                <CreateGroup />
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
