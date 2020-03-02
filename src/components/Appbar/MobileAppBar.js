import React, { Fragment, useState } from 'react'
import { makeStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import WhatshotIcon from '@material-ui/icons/Whatshot';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import { NavLink } from 'react-router-dom';
import SideListLinks from './SideList';
import pink from '@material-ui/core/colors/pink';
import PropTypes from 'prop-types';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import Slide from '@material-ui/core/Slide';
import UploadFab from '../Upload/MobileUpload'
import GroupIcon from '@material-ui/icons/Group';
import { connect} from 'react-redux'
// import ViewCarouselIcon from '@material-ui/icons/ViewCarousel';
import HomeIcon from '@material-ui/icons/Home';

const color = pink[400];

export const useStyles = makeStyles(theme => ({
  appBar: {
    top: 'auto',
    bottom: 0,
  },
  grow: {
    flexGrow: 1,
  },
  activeLink: {
    color: color
  },
  link: {
    color: 'white',
    textDecoration: 'none',
    textTransform: 'inherit'
  },
  activeMenuLink: {
    color: '#ff4081',
    textDecoration: 'none',
    textTransform: 'inherit'
  }
}));

function HideOnScroll(props) {
  const { children} = props;
  const trigger = useScrollTrigger();

  return (
    <Slide appear={false} direction="up" in={!trigger}>
      {children}
    </Slide>
  );
}

HideOnScroll.propTypes = {
  children: PropTypes.element.isRequired,
};


export  function BottomAppBar(props) {
  const classes = useStyles();
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

  return (
    <Fragment>
      <CssBaseline />
      <HideOnScroll {...props}>
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


          <NavLink exact to="/" activeClassName={classes.activeMenuLink} className={classes.link}>
            <IconButton color="inherit" title="Home">
                <HomeIcon />
            </IconButton>
          </NavLink>

          <NavLink to="/trending" activeClassName={classes.activeMenuLink} className={classes.link}>
            <IconButton color="inherit" title="Trending">
                <WhatshotIcon />
            </IconButton>
          </NavLink>
          
          <UploadFab />

          <div className={classes.grow} />

          <NavLink to="/groups" activeClassName={classes.activeMenuLink} className={classes.link}>
            <IconButton color="inherit" title="Groups">
              <GroupIcon />
            </IconButton>
          </NavLink>

          <NavLink to={`/@${props.username}`} activeClassName={classes.activeMenuLink} className={classes.link}>
            <IconButton color="inherit" title="Profile">
              <AccountCircle />
            </IconButton>
          </NavLink>
        </Toolbar>
      </AppBar>
      </HideOnScroll>
    </Fragment>
  );
}

const mapStateToProps = state => {
  return {
    token: state.auth.token,
    username: state.auth.username
  }
}

export default connect(mapStateToProps)(BottomAppBar);