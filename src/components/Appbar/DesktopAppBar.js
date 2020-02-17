import React, { Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { Link, withRouter } from 'react-router-dom';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import UploadFab from '../Upload/DesktopUpload'
import Slide from '@material-ui/core/Slide';
import Button from '@material-ui/core/Button';
import * as actions from '../../store/actions/auth';
import { connect } from 'react-redux';

const useStyles = makeStyles(theme => ({
  grow: {
    flexGrow: 1,
    // padding: '2px'
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  appBarLink: {
    textDecoration: 'none',
    textTransform: 'inherit'
  },
  button: {
    margin: theme.spacing(1),
  },
}));

function AppBarLink(props) {
  const classes = useStyles();
  return (
    <Fragment>
      <Link to={props.linkTo} className={classes.appBarLink}>
        <Button variant="outlined" color="secondary" className={classes.button} onClick={props.onClick}>
          {props.typography}
        </Button>
      </Link>
    </Fragment>
  )
}

function HideOnScroll(props) {
  const { children} = props;
  const trigger = useScrollTrigger();

  return (
    <Slide appear={false} direction="down" in={!trigger} >
      {children}
    </Slide>
  );
}

function DesktopAppBar(props) {
  const classes = useStyles();

  return (
    <div className={classes.grow}>
      <HideOnScroll {...props}>
        <AppBar color="inherit">
          <Toolbar>
            
            <Link to="/" className={classes.appBarLink}>
              <Typography color="secondary" variant="h6" noWrap>
                ShwayMemes
              </Typography>
            </Link>
            
            <div className={classes.grow} />
            <AppBarLink 
              linkTo="/trending"
              typography="Trending"
             />
             <AppBarLink 
              linkTo="/groups"
              typography="Groups"
             />
             <AppBarLink 
              linkTo="/profile"
              typography="Profile"
             />
             <AppBarLink 
              linkTo="/logout"
              typography="Logout"
              onClick={props.logout}
             />
             {/* <AppBarLink 
              linkTo="/aboutus"
              typography="About Us"
             /> */}
            <UploadFab />
          </Toolbar>
        </AppBar>
      </HideOnScroll>
    </div>
  );
}

const mapDispatchToProps = dispatch => {
  return {
      logout: () => dispatch(actions.logout()) 
  }
}

export default withRouter(connect(null, mapDispatchToProps)(DesktopAppBar))