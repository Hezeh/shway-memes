import React from 'react'
import List from '@material-ui/core/List';
import SearchIcon from '@material-ui/icons/Search';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ChatIcon from '@material-ui/icons/Chat';
import SettingsIcon from '@material-ui/icons/Settings';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import FeedbackIcon from '@material-ui/icons/Feedback';
import InfoIcon from '@material-ui/icons/Info';
import HowToRegIcon from '@material-ui/icons/HowToReg';
import NewReleasesIcon from '@material-ui/icons/NewReleases';
import PeopleIcon from '@material-ui/icons/People';
import { Link } from 'react-router-dom';

export default function SideListLinks() {
  return (
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
            <ListItemText primary="Latest" />
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
  )
}