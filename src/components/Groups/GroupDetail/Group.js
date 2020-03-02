import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { 
    Switch,
    Route,
    Link,
    useRouteMatch,
} from 'react-router-dom';
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import GroupUpload from './Join&Upload'
import Members from './MembersList'
import GroupsDetail from './GroupDetail'
import PeopleOutlineIcon from '@material-ui/icons/PeopleOutline';
import PhotoLibraryIcon from '@material-ui/icons/PhotoLibrary';
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import CallToActionIcon from '@material-ui/icons/CallToAction';

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
    return <Redirect to="/register" />;
  }
  return (
    <div className={classes.root}>
      <Route 
          path={`/group/${match.params.id}`}
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
                <Tab icon={<PhotoLibraryIcon />} label="Group Posts" to={`${match.url}`} component={Link}/>
                <Tab icon={<CallToActionIcon />} label="Join &#38; Upload" to={`${match.url}/upload`} component={Link}/>
                <Tab icon={<PeopleOutlineIcon />} label="Members" to={`${match.url}/members`} component={Link}/>
              </Tabs>
            </AppBar>
            <Switch>
              
              <Route path={`${match.url}/upload`}>
                <GroupUpload groupid={match.params.id}/>
              </Route>
              <Route path={`${match.url}/members`}>
                <Members />
              </Route>
              <Route path={`${match.url}`}>
                <GroupsDetail id={match.params.id}/>
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