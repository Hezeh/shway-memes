import React, { Fragment, useState } from 'react'
import './Appbar.css';
import Videos from '../Videos/Videos';
import Message from '../Message/Message';
import ProfileIcon from '../ProfileIcon/ProfileIcon';
import { makeStyles, fade } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import Fab from '@material-ui/core/Fab';
import List from '@material-ui/core/List';
import Avatar from '@material-ui/core/Avatar';
import MenuIcon from '@material-ui/icons/Menu';
import AddIcon from '@material-ui/icons/Add';
import SearchIcon from '@material-ui/icons/Search';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import WhatshotIcon from '@material-ui/icons/Whatshot';
import VideoLibraryIcon from '@material-ui/icons/VideoLibrary';
import HomeIcon from '@material-ui/icons/Home';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Button from '@material-ui/core/Button';
import ChatIcon from '@material-ui/icons/Chat';
import SettingsIcon from '@material-ui/icons/Settings';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import FeedbackIcon from '@material-ui/icons/Feedback';
import InfoIcon from '@material-ui/icons/Info';
import HowToRegIcon from '@material-ui/icons/HowToReg';
import NewReleasesIcon from '@material-ui/icons/NewReleases';
import PeopleIcon from '@material-ui/icons/People';

import { Link } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
  text: {
    padding: theme.spacing(2, 2, 0),
  },
  paper: {
    paddingBottom: 50,
  },
  list: {
    marginBottom: theme.spacing(2),
  },
  subheader: {
    backgroundColor: theme.palette.background.paper,
  },
  appBar: {
    top: 'auto',
    bottom: 0,
  },
  grow: {
    flexGrow: 10,
  },
  fabButton: {
    position: 'absolute',
    zIndex: 1,
    top: -30,
    left: 0,
    right: 0,
    margin: '0 auto',
  },
}));

export  function BottomAppBar() {
  const classes = useStyles();
  const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const [state, setState ] = useState({
    left: false
  })

  const toggleDrawer = (side, open) => event => {
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [side]: open });
  };

  const sideList = side => (
    <div
      className={classes.list}
      role="presentation"
      onClick={toggleDrawer(side, false)}
      onKeyDown={toggleDrawer(side, false)}
    >
      <List>
        <Link to="/login" className="menu-link">
          <ListItem button >
            <ListItemIcon>
              <AccountBoxIcon />
            </ListItemIcon>
            <ListItemText primary="Login" />
          </ListItem>
        </Link>

        <Link to="/register" className="menu-link">
          <ListItem button >
            <ListItemIcon>
              <HowToRegIcon />
            </ListItemIcon>
            <ListItemText primary="Register" />
          </ListItem>
        </Link>

        <Link to="/challenges" className="menu-link">
          <ListItem button >
            <ListItemIcon>
              <NewReleasesIcon />
            </ListItemIcon>
            <ListItemText primary="Challenges" />
          </ListItem>
        </Link>

        <Link to="/messages" className="menu-link">
          <ListItem button >
            <ListItemIcon>
              <ChatIcon />
            </ListItemIcon>
            <ListItemText primary="Messages" />
          </ListItem>
        </Link>

        <Link to="/following" className="menu-link">
          <ListItem button >
            <ListItemIcon>
              <PeopleIcon />
            </ListItemIcon>
            <ListItemText primary="Following" />
          </ListItem>
        </Link>
        
        <Link to="/settings" className="menu-link">
          <ListItem button color="inherit">
            <ListItemIcon>
              <SettingsIcon />
            </ListItemIcon>
            <ListItemText primary="Settings" />
          </ListItem>
        </Link>

        <Link to="/feedback" className="menu-link">
          <ListItem button >
            <ListItemIcon>
              <FeedbackIcon />
            </ListItemIcon>
            <ListItemText primary="Feedback" />
          </ListItem>
        </Link>

        <Link to="/aboutus" className="menu-link">
          <ListItem button >
            <ListItemIcon>
              <InfoIcon />
            </ListItemIcon>
            <ListItemText primary="About Us" />
          </ListItem>
        </Link>

        <Link to="/faqs" className="menu-link">
          <ListItem button >
            <ListItemIcon>
              <InfoIcon />
            </ListItemIcon>
            <ListItemText primary="FAQs" />
          </ListItem>
        </Link>

        <Link to="/search" className="menu-link">
          <ListItem button >
            <ListItemIcon>
              <SearchIcon />
            </ListItemIcon>
            <ListItemText primary="Search" />
          </ListItem>
        </Link>

        <Link to="/Policy" className="menu-link">
          <ListItem button >
            <ListItemIcon>
              <InfoIcon />
            </ListItemIcon>
            <ListItemText primary="Policy" />
          </ListItem>
        </Link>

        
      </List>
    </div>
  );

  function handleChange(event) {
    setAuth(event.target.checked);
  }

  function handleMenu(event) {
    setAnchorEl(event.currentTarget);
  }

  function handleClose() {
    setAnchorEl(null);
  }

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar position="fixed" color="secondary" className={classes.appBar}>
        <Toolbar>

          <IconButton edge="start" color="inherit" aria-label="open drawer" title="Menu" 
            onClick={toggleDrawer('left', true)}>
            <MenuIcon />
          </IconButton>
          <SwipeableDrawer
            open={state.left}
            onClose={toggleDrawer('left', false)}
            onOpen={toggleDrawer('left', true)}
          >
          {sideList('left')}
          </SwipeableDrawer>


          <Link to="/" className="link">
            <IconButton color="inherit" title="Home">
                <HomeIcon />
            </IconButton>
          </Link>
          
          <Link to="/videos" className="link">
            <IconButton color="inherit" title="Videos">
                <VideoLibraryIcon />
            </IconButton>
          </Link>

          <Link to="/search" className="link">
            <IconButton color="inherit" title="Videos">
                <SearchIcon />
            </IconButton>
          </Link>

          <Link to="/addmemes">
            <Fab color="secondary" aria-label="add" className={classes.fabButton} title="Add">
              <AddIcon />
            </Fab>
          </Link>

          <div className={classes.grow} />
          <Link to="/favorites" className="link">
            <IconButton color="inherit" title="Favorites">
              <FavoriteIcon />
            </IconButton>
          </Link>
          
          <IconButton color="inherit" title="Whatshot">
            <Link to="/hotmemes" className="link">
              <WhatshotIcon />
            </Link>
            
          </IconButton>
          {auth && (
            <div>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={open}
                onClose={handleClose}
              >
                <Link to="/profile" className="menu-link">
                  <MenuItem >
                      Profile
                  </MenuItem>
                </Link>
                <Link to="/points" className="menu-link">
                  <MenuItem >
                      Gangster Points
                  </MenuItem>
                </Link>
              </Menu>
              </div>
          )}
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
}

const Appbar = () => {
  return (
    <Fragment>
      <BottomAppBar />
    </Fragment>
  )
}

export default Appbar;