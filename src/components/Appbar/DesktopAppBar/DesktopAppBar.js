import React, { useState } from 'react';
import './DesktopAppBar.css';
import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import MenuIcon from '@material-ui/icons/Menu';
import SideListLinks from '../SideList/SideList';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import { Link } from 'react-router-dom';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
// import PropTypes from 'prop-types';
// import Fab from '@material-ui/core/Fab';
// import PublishIcon from '@material-ui/icons/Publish';
// import { useHistory } from "react-router-dom";
import UploadFab from '../../Upload/Desktop/UploadFab'
import ReactGA from 'react-ga';
import Slide from '@material-ui/core/Slide';



const useStyles = makeStyles(theme => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: 200,
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  input: {
    display: 'none'
  }, 

}));

function HideOnScroll(props) {
  const { children} = props;
  const trigger = useScrollTrigger();

  return (
    <Slide appear={false} direction="down" in={!trigger} >
      {children}
    </Slide>
  );
}
export default function DesktopAppBar(props) {
  const classes = useStyles();
  // const [anchorEl, setAnchorEl] = React.useState(null);
  // const [auth, setAuth] = React.useState(true);
  // const open = Boolean(anchorEl);
  const [state, setState ] = useState({
    left: false
  })

  // let history = useHistory();

  // function handleChange() {
  //   history.push("/home");
  // }

  const toggleDrawer = (side, open) => event => {
  if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setState({ ...state, [side]: open });
    ReactGA.event({
      category: 'User',
      action: 'Toggled Drawer'
    });
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
    <div className={classes.grow}>
      <HideOnScroll {...props}>
        <AppBar  color="inherit">
          <Toolbar>
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer('left', true)}
            >
              <MenuIcon />
            </IconButton>
            <SwipeableDrawer
              open={state.left}
              onClose={toggleDrawer('left', false)}
              onOpen={toggleDrawer('left', true)}
            >
            {sideList('left')}
            </SwipeableDrawer>

            <Typography className={classes.title} variant="h6" noWrap>
              <Link to="/" className="appbarLinks">ShwayMemes</Link>
            </Typography>
            
            <div className={classes.grow} />
            <UploadFab />
            {/* <input
              accept="image/*"
              className={classes.input}
              id="contained-button-file"
              multiple
              type="file"
              onChange={handleChange}
            />
            
          <label htmlFor="contained-button-file">
            <Fab color="secondary" aria-label="add" className={classes.fabButton} title="Select Memes" component="span">
              <PublishIcon />
            </Fab>
          </label> */}
          </Toolbar>
        </AppBar>
      </HideOnScroll>
    </div>
  );
}
