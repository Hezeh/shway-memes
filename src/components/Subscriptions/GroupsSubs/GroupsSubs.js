import React, {Fragment, useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { groupsURL } from '../../../constants'
import axios from 'axios'
import {connect} from 'react-redux'
import Skeleton from '@material-ui/lab/Skeleton';

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

function Groups(props) {
  const classes = useStyles();

  const [ isLoading, setIsLoading] = useState(false)
  const [data, setData] = useState([]);
  const [url] = useState(groupsURL);

  async function fetchData() {
      setIsLoading(true)
      axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
      axios.defaults.xsrfCookieName = "csrftoken";
      axios.defaults.headers = {
        "Content-Type": "application/json",
        Authorization: `Token ${props.token}`,
      };
      axios
          .get(url)
          .then(response => {
            setIsLoading(false)
            setData(response.data.results)
          })
          .catch(err => {
            console.log(err)
            setIsLoading(false)
          })
    }

    useEffect(() => {
        fetchData();
    }, []);

    // console.log(data)

  if (isLoading === true) {
    return (
      <Fragment>
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]}
        <Skeleton animation="wave" width={800} height={400}/>
      </Fragment>
      
    )
  }

   
  return (
    <React.Fragment>
      <CssBaseline />
      <Paper square className={classes.paper}>
        <Typography className={classes.text} variant="h5" gutterBottom>
          Group Updates
        </Typography>
        <List className={classes.list}>
          {data.map(({ id, group_name}) => (
            <React.Fragment key={id}>
              <ListItem button>
                <ListItemText primary={group_name} />
              </ListItem>
            </React.Fragment>
          ))}
        </List>
      </Paper>
    </React.Fragment>
  );
}

const mapStateToProps = state => {
  return {
    token: state.auth.token
  };
};


export default connect(mapStateToProps)(Groups)
