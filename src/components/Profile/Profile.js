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
// import PersonPinIcon from '@material-ui/icons/PersonPin';
import ArtTrackIcon from '@material-ui/icons/ArtTrack';
import FavoriteIcon from '@material-ui/icons/Favorite';
import PeopleIcon from '@material-ui/icons/People';
import Followers from './Followers/Followers'
import Posts from './Posts/Posts'
import Favorites from './Favorites/Favorites'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
}));

export default function ProfileNavTabs(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  let match = useRouteMatch();


  return (
    <div className={classes.root}>
      <Route 
          path="/profile"
          // path={`/@${props.profile.username}`}
          render={({ location }) => (
            <React.Fragment>
            <AppBar position="static" color="inherit">
              <Tabs
                variant="fullWidth"
                value={value}
                onChange={handleChange}
                aria-label="nav tabs example"
              >
                
                <Tab icon={<ArtTrackIcon />} label="POSTS" to={`${match.url}`} component={Link}/>
                <Tab icon={<FavoriteIcon />} label="FAVORITES" to={`${match.url}/favorites`} component={Link}/>
                {/* <Tab icon={<PersonPinIcon />} label="FOLLOWING" to={`${match.url}/following`} component={Link}/> */}
                <Tab icon={<PeopleIcon />} label="FOLLOWERS" to={`${match.url}/followers`} component={Link}/>
              </Tabs>
            </AppBar>
            <Switch>
              <Route path={`${match.url}/favorites`}>
                <Favorites />
              </Route>
              {/* <Route path={`${match.url}/following`}>
                <Following />
              </Route> */}
              <Route path={`${match.url}/followers`}>
                <Followers />
              </Route>
              <Route path={`${match.url}`}>
                <Posts />
              </Route>
            </Switch>
            </React.Fragment>
      )}
      />
    </div>
  );
}