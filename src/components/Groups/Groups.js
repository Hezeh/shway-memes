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
import CreateGroup from './Create'
import Groups from './GroupsList'
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import MyGroups from './MyGroups'
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    [theme.breakpoints.up('md')]: {
      paddingTop: '60px',
    },
  },
}));

function GroupsNavTabs(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  let match = useRouteMatch();

  if (!props.token) {
    return <Redirect to="/login" />;
  }
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
                aria-label="Groups Tabs"
              >
                <Tab icon={<PeopleIcon />} label="All Groups" to={`${match.url}`} component={Link}/>
                <Tab icon={<PeopleIcon />} label="My Groups" to={`${match.url}/mygroups`} component={Link}/>
                <Tab icon={<GroupAddIcon />} label="Add Group" to={`${match.url}/addgroup`} component={Link}/>
              </Tabs>
            </AppBar>
            <Switch>
              
              <Route path={`${match.url}/addgroup`}>
                <CreateGroup />
              </Route>
              <Route path={`${match.url}/mygroups`}>
                <MyGroups />
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

const mapStateToProps = state => {
  return {
    token: state.auth.token
  };
};

export default connect(mapStateToProps)(GroupsNavTabs)