import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import PortraitIcon from '@material-ui/icons/Portrait';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    margin: '10px',
    padding: '10px',
    backgroundColor: theme.palette.background.paper,
  },
  iconbutton: {
    margin: '50'
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
}));

function generate(element) {
  return [0, 1, 2].map(value =>
    React.cloneElement(element, {
      key: value,
    }),
  );
}

export default function InteractiveList() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
     <Grid>
        <Grid item xs={12} md={12}>
          <div>
            <List>
              {generate(
                <ListItem >
                  <ListItemAvatar>
                    <Avatar>
                      < PortraitIcon/>
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary="Hezekiah"
                  />
                  <ListItemSecondaryAction>
                      <Fab color="secondary" aria-label="add" variant="extended">
                        <AddIcon className={classes.extendedIcon}/>
                        Follow
                      </Fab>
                  </ListItemSecondaryAction>
                </ListItem>
              )}
            </List>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}
