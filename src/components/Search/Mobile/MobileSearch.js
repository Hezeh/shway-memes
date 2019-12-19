import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import SearchBar from './SearchBar';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    position: 'static',
    overflow: 'hidden'
  },
  paper: {
    height: 250,
    width: 150,
    marginTop: '5px',
  },
}));

export default function SpacingGrid() {
  const classes = useStyles();

  return (
    <React.Fragment>
        <SearchBar />
        <Grid container className={classes.root} >
        <Grid item xs={12}>
            <Grid container justify="center" spacing={1}>
            {[0, 1, 2, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(value => (
                <Grid key={value} item>
                <Paper className={classes.paper} />
                </Grid>
            ))}
            </Grid>
        </Grid>
        </Grid>
    </React.Fragment>
  );
}

