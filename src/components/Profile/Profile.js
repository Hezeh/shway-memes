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
    NavLink
} from 'react-router-dom';
// import PersonPinIcon from '@material-ui/icons/PersonPinCircle'
import ArtTrackIcon from '@material-ui/icons/ArtTrack';
import FavoriteIcon from '@material-ui/icons/Favorite';
// import PeopleIcon from '@material-ui/icons/People';
// import Followers from './Followers'
import Posts from './Posts'
import Favorites from './Favorites'
import Reposts from './Reposts'
import {connect} from 'react-redux'
import {Redirect, useParams} from 'react-router-dom'
import RepeatIcon from '@material-ui/icons/Repeat';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    [theme.breakpoints.up('md')]: {
      paddingTop: '60px',
    },
    overflowX: 'hidden',
    overflowY: 'scroll',
  },
  
}));

function ProfileNavTabs(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const { username } = useParams()

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
          path={`/@${username}`}
          render={() => (
            <React.Fragment>
            <AppBar position="static" color="inherit">
              <Tabs
                variant="fullWidth"
                value={value}
                onChange={handleChange}
                aria-label="Profile Tabs"
                indicatorColor="secondary"
                textColor="secondary"
              >
                
                <Tab icon={<ArtTrackIcon />} label="POSTS" to={`${match.url}`} component={NavLink}/>
                <Tab icon={<FavoriteIcon />} label="FAVORITES" to={`${match.url}/favorites`} component={NavLink}/>
                <Tab icon={<RepeatIcon />} label="Reposts" to={`${match.url}/reposts`} component={NavLink}/>
                {/* <Tab icon={<PersonPinIcon />} label="FOLLOWING" to={`${match.url}/following`} component={Link}/>  */}
                {/* <Tab icon={<PeopleIcon />} label="FOLLOWERS" to={`${match.url}/followers`} component={Link}/> */}
              </Tabs>
            </AppBar>
            <Switch>

              {/* <Route path={`${match.url}/following`}>
                <Following />
              </Route> */}
              {/* <Route path={`${match.url}/followers`}>
                <Followers />
              </Route> */}
              <Route path={`${match.url}/favorites`}>
                <Favorites user={username} />
              </Route>

              <Route path={`${match.url}/reposts`}>
                <Reposts user={username} />
              </Route>

              <Route path={`${match.url}`}>
                <Posts user={username} />
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
    token: state.auth.token,
    userId: state.auth.userId,
  }
}

export default connect(mapStateToProps)(ProfileNavTabs);