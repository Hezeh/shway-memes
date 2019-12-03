import React, {useEffect} from 'react';
import MemesList from '../MemesList/MemesList'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'
import {
    FOLLOW_USER,
    UNFOLLOW_USER,
    PROFILE_PAGE_LOADED,
    PROFILE_PAGE_UNLOADED
} from '../../store/actions/actionTypes'
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import FavoriteIcon from '@material-ui/icons/Favorite';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import PersonPinIcon from '@material-ui/icons/PersonPin';
import ArtTrackIcon from '@material-ui/icons/ArtTrack';
import Favorites from '../Favorites/Favorites';

const useStyles = makeStyles({
  root:{
    flexGrow: 1,
    maxWidth: 500,
  },
});

function LabelTabs() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Paper square className={classes.root}>
      <Tabs
        value={value}
        onChange={handleChange}
        variant="fullWidth"
        indicatorColor="secondary"
        textColor="secondary"
        aria-label="icon label tabs example"
      >
        <Tab icon={<ArtTrackIcon />} label="RECENTS" />
        <Tab icon={<FavoriteIcon />} label="FAVORITES" />
        <Tab icon={<PersonPinIcon />} label="FOLLOWING" />
      </Tabs>
    </Paper>
  );
}

const EditProfileSettings = props => {
    if (props.isUser) {
        return (
            <Link 
              to="/settings"
            > Edit Profile Settings</Link>
        )
    }
    return null;
}

const FollowUserButton = props => {
    const classes = useStyles();
    if (props.isUser) {
        return null;
    }

    let changeColor = 'default'
    if (props.user.following) {
        changeColor = 'primary'
    } else {
        changeColor = 'secondary'
    }

    const handleClick = event => {
        event.preventDefault();
        if (props.user.following) {
            props.unfollow(props.user.username)
        } else {
            props.follow(props.user.username)
        }
    };

    return (
        <div className={classes.root}>
            <Fab color="secondary" aria-label="edit">
              <EditIcon />
            </Fab>
            <Fab variant="extended" aria-label="add">
              <AddIcon className={classes.extendedIcon} />
    {props.user.following ? 'Unfollow' : 'Follow'} {props.user.username}
            </Fab>
            <Fab disabled aria-label="like">
              <FavoriteIcon />
            </Fab>
        </div>
    )
}

const mapStateToProps = state => ({
    ...state.articleList,
    currentUser: state.common.currentUser,
    profile: state.profile
})

const mapDispatchToProps = dispatch => ({
    onFollow: username => dispatch({
        type: FOLLOW_USER,
        payload: Profile.follow(username)
    }),
    onLoad: payload => dispatch({ type: PROFILE_PAGE_LOADED, payload}),
    onUnfollow: username => dispatch({
        type: UNFOLLOW_USER,
        payload: Profile.unfollow(username)
    }),
    onUnload: () => dispatch({ type: PROFILE_PAGE_UNLOADED})
});

const Profile = (props) => {
  
  return (
    <div>
      <FollowUserButton />
      <LabelTabs />
      <EditProfileSettings />
      <Favorites />
    </div>
  )
}

// const Profile = (props) =>? {
//     useEffect({
//         props.onLoad(Promise.all([
//             agent.Profile.get(props.match.params.username),
//             agent.Articles.byAuthor(props.match.params.username)
//         ]))
//     })

//     useEffect({
//         props.onUnload()
//     })
//     return (
//         <div>

//         </div>
//     )
// }

export default connect(mapStateToProps, mapDispatchToProps)(Profile);