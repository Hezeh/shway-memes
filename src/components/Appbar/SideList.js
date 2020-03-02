import React from 'react'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InfoIcon from '@material-ui/icons/Info';
import { Link, withRouter } from 'react-router-dom';
import { makeStyles} from '@material-ui/core/styles';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/auth';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import ShareIcon from '@material-ui/icons/Share';
import GetAppIcon from '@material-ui/icons/GetApp';
import ReactGA from 'react-ga';

export const useStyles = makeStyles(theme => ({
  menuLink: {
    textDecoration: 'none',
    color: '#e91e63'
  }
}));

function SideListLinks(props) {
  const classes = useStyles();

  const shareApp = () => {
    if (navigator.share) {
      navigator.share({
          title: 'Share Cool Memes',
          text: 'Check out ShwayMemes — it rocks!',
          url: 'https://shwaymemes.com',
      })
        // .then(() => (ReactGA)
        .catch((error) => console.log('Error sharing', error));
    }
    ReactGA.event({
      category: 'User',
      action: 'Shared Playstore Link'
    });
  }

  return (
      <List>
        <Link to="/logout" className={classes.menuLink} onClick={props.logout}>
          <ListItem button >
            <ListItemIcon>
              <LockOpenIcon />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItem>
        </Link>

        <Link to="/aboutus" className={classes.menuLink}>
          <ListItem button >
            <ListItemIcon>
              <InfoIcon />
            </ListItemIcon>
            <ListItemText primary="About Us" />
          </ListItem>
        </Link>

        {/* <Link to="/link-to-playstore" className={classes.menuLink}>
          <ListItem button >
            <ListItemIcon>
              <GetAppIcon />
            </ListItemIcon>
            <ListItemText primary="Get App" />
          </ListItem>
        </Link> */}


          <ListItem button >
            <ListItemIcon>
              <ShareIcon onClick={shareApp} />
            </ListItemIcon>
            <ListItemText primary="Share" />
          </ListItem>
      </List>
  )
}


const mapStateToProps = state => {
  return {
    token: state.auth.token,
  };
};

const mapDispatchToProps = dispatch => {
  return {
      logout: () => dispatch(actions.logout()) 
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SideListLinks))