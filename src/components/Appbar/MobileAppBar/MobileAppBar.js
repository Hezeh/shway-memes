import React, { Fragment, useState } from 'react'
import './MobileAppBar.css';
import { makeStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Fab from '@material-ui/core/Fab';
import MenuIcon from '@material-ui/icons/Menu';
import AddIcon from '@material-ui/icons/Add';
import AccountCircle from '@material-ui/icons/AccountCircle';
import WhatshotIcon from '@material-ui/icons/Whatshot';
import HomeIcon from '@material-ui/icons/Home';
import FavoriteIcon from '@material-ui/icons/Favorite';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import { Link, NavLink } from 'react-router-dom';
import SideListLinks from '../SideList/SideList';
import ImageSearchIcon from '@material-ui/icons/ImageSearch';
import SubscriptionsIcon from '@material-ui/icons/Subscriptions';
import pink from '@material-ui/core/colors/pink';

const color = pink[400];

export const useStyles = makeStyles(theme => ({
  text: {
    padding: theme.spacing(2, 2, 0),
  },
  paper: {
    paddingBottom: 50,
  },
  subheader: {
    backgroundColor: theme.palette.background.paper,
  },
  appBar: {
    top: 'auto',
    bottom: 0,
  },
  grow: {
    flexGrow: 1,
  },
  fabButton: {
    position: 'absolute',
    zIndex: 1,
    top: -15,
    left: 0,
    right: 0,
    margin: '0 auto',
  },
  input: {
    display: 'none'
  }, 
  div: {
    //margin: '30px',
    //padding: '10px'
  },
  activeLink: {
    color: color
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
      <SideListLinks />
    </div>
  )

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
    <Fragment>
      <CssBaseline />
      <AppBar position="fixed" color="default" className={classes.appBar}>
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


          <NavLink exact to="/" activeClassName={classes.activeLink} className="link">
            <IconButton color="inherit" title="Home">
                <HomeIcon />
            </IconButton>
          </NavLink>

          <NavLink to="/trending" activeClassName={classes.activeLink} className="link">
            <IconButton color="inherit" title="Trending">
                <WhatshotIcon />
            </IconButton>
          </NavLink>
          
          
          <input
            accept="image/*"
            className={classes.input}
            id="contained-button-file"
            multiple
            type="file"
          />
          <label htmlFor="contained-button-file">
            <Fab color="secondary" aria-label="add" className={classes.fabButton} title="Select Memes" component="span">
              <AddIcon />
            </Fab>
          </label>

          <div className={classes.grow} />

          <div className={classes.div}>
          <NavLink to="/search" activeClassName={classes.activeLink} className="link">
            <IconButton color="inherit" title="Videos">
                <ImageSearchIcon />
            </IconButton>
          </NavLink>
          </div>

          <NavLink to="/subscriptions" activeClassName={classes.activeLink} className="link">
            <IconButton color="inherit" title="Subscriptions">
              <SubscriptionsIcon />
            </IconButton>
          </NavLink>

          <NavLink to="/profile" activeClassName={classes.activeLink} className="link">
            <IconButton color="inherit" title="Profile">
              <AccountCircle />
            </IconButton>
          </NavLink>
          
          {/* <IconButton
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  color="inherit"
                >
            <Link to="/profile" className="link"></Link>
          </IconButton> */}
        </Toolbar>
      </AppBar>
    </Fragment>
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