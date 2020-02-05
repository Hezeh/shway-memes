import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

const groups = [
  {
    id: 1,
    primary: 'Programmer Humor',
  },
  {
    id: 2,
    primary: 'Dark Humor',
  },
  {
    id: 3,
    primary: 'High School Humor',
  },
  {
    id: 4,
    primary: 'College Memes',

  },
  {
    id: 5,
    primary: "Workplace Memes",
  },
  {
    id: 6,
    primary: 'Adulting Memes',
  },
  {
    id: 7,
    primary: 'Netflix Memes',
  },
  {
    id: 8,
    primary: 'DC memes',
  },
  {
    id: 9,
    primary: 'Star Wars Memes',
  },
];

const useStyles = makeStyles(theme => ({
  text: {
    padding: theme.spacing(2, 2, 0),
  },
  paper: {
    paddingBottom: 50,
  },
  list: {
    marginBottom: theme.spacing(2),
  },
  subheader: {
    backgroundColor: theme.palette.background.paper,
  }
}));

export default function GroupsSubs() {
  const classes = useStyles();

  return (
    <React.Fragment>
      <CssBaseline />
      <Paper square className={classes.paper}>
        <Typography className={classes.text} variant="h5" gutterBottom>
          Popular Groups
        </Typography>
        <List className={classes.list}>
          {groups.map(({ id, primary, secondary, person }) => (
            <React.Fragment key={id}>
              <ListItem button>
                <ListItemText primary={primary} />
              </ListItem>
            </React.Fragment>
          ))}
        </List>
      </Paper>
    </React.Fragment>
  );
}
