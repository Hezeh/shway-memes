import React from 'react'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InfoIcon from '@material-ui/icons/Info';
import { Link } from 'react-router-dom';
import { makeStyles} from '@material-ui/core/styles';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/auth';
import LockOpenIcon from '@material-ui/icons/LockOpen';

export const useStyles = makeStyles(theme => ({
  menuLink: {
    textDecoration: 'none',
    color: '#e91e63'
  }
}));

function SideListLinks(props) {
  const classes = useStyles();

  return (
      <List>
        {/* TODO: Link for sharing the app */}
        {/* TODO: Link to Playstore */}
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

      </List>
  )
}


const mapDispatchToProps = dispatch => {
  return {
      logout: () => dispatch(actions.logout()) 
  }
}

export default connect(mapDispatchToProps)(SideListLinks)