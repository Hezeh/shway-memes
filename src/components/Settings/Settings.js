import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import Switch from '@material-ui/core/Switch';
import BluetoothIcon from '@material-ui/icons/Bluetooth';
import BrightnessLowIcon from '@material-ui/icons/BrightnessLow';
import NotificationsIcon from '@material-ui/icons/Notifications';

const useStyles = makeStyles(theme => ({
  root: {
    width: '50%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
    margin: 'auto',
    marginTop: '10px'
  },
}));

export default function SwitchListSecondary() {
  const classes = useStyles();
  const [checked, setChecked] = React.useState(['darktheme']);

  const handleToggle = value => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  return (
    <List subheader={<ListSubheader>Settings</ListSubheader>} className={classes.root}>
      <ListItem>
        <ListItemIcon>
          <BrightnessLowIcon />
        </ListItemIcon>
        <ListItemText id="switch-list-label-darktheme" primary="Dark Theme" />
        <ListItemSecondaryAction>
          <Switch
            edge="end"
            onChange={handleToggle('darktheme')}
            checked={checked.indexOf('darktheme') !== -1}
            inputProps={{ 'aria-labelledby': 'switch-list-label-darktheme' }}
          />
        </ListItemSecondaryAction>
      </ListItem>
      <ListItem>
        <ListItemIcon>
          <NotificationsIcon />
        </ListItemIcon>
        <ListItemText id="switch-list-label-notifications" primary="Notifications" />
        <ListItemSecondaryAction>
          <Switch
            edge="end"
            onChange={handleToggle('notifications')}
            checked={checked.indexOf('notifications') !== -1}
            inputProps={{ 'aria-labelledby': 'switch-list-label-notifications' }}
          />
        </ListItemSecondaryAction>
      </ListItem>
    </List>
  );
}
