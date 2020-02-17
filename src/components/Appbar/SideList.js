import React from 'react'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InfoIcon from '@material-ui/icons/Info';
import { Link } from 'react-router-dom';
import { makeStyles} from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
  menuLink: {
    color: 'yellow !important',
    textDecoration: 'none',
    textTransform: 'inherit'
}
}));

export default function SideListLinks() {
  const classes = useStyles();

  return (
      <List>
        <Link to="/aboutus" className={classes.menuLink}>
          <ListItem button >
            <ListItemIcon>
              <InfoIcon />
            </ListItemIcon>
            <ListItemText primary="About Us" />
          </ListItem>
        </Link>
        {/* Link for sharing the app */}
        {/* <Link to="/share" className={classes.menuLink}>
          <ListItem button >
            <ListItemIcon>
              <InfoIcon />
            </ListItemIcon>
            <ListItemText primary="About Us" />
          </ListItem>
        </Link> */}
      </List>
  )
}