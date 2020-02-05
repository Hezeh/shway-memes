import React from 'react'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
// import AccountBoxIcon from '@material-ui/icons/AccountBox';
import InfoIcon from '@material-ui/icons/Info';
// import HowToRegIcon from '@material-ui/icons/HowToReg';
import { Link } from 'react-router-dom';
import PeopleOutlineIcon from '@material-ui/icons/PeopleOutline';

export default function SideListLinks() {
  return (
      <List>
        {/* <Link to="/login" className="menu-link">
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
        </Link> */}

        <Link to="/aboutus" className="menu-link">
          <ListItem button >
            <ListItemIcon>
              <InfoIcon />
            </ListItemIcon>
            <ListItemText primary="About Us" />
          </ListItem>
        </Link>

        <Link to="/groups" className="menu-link">
          <ListItem button >
            <ListItemIcon>
              <PeopleOutlineIcon />
            </ListItemIcon>
            <ListItemText primary="Groups" />
          </ListItem>
        </Link>
      </List>
  )
}