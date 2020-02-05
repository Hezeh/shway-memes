import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import StarIcon from '@material-ui/icons/Star';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import axios from 'axios'
import {connect} from 'react-redux'
import { tagsURL } from '../../../constants'

const useStyles = makeStyles(theme => ({
  text: {
    padding: theme.spacing(2, 2, 0),
  },
  paper: {
    paddingBottom: 100,
  },
  list: {
    marginBottom: theme.spacing(2),
  },
  subheader: {
    backgroundColor: theme.palette.background.paper,
  }
}));

function Hashtags(props) {
  const classes = useStyles();
  const [ isLoading, setIsLoading] = useState(false)
  const [data, setData] = useState([]);
  const [url] = useState(tagsURL);

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
            // console.log(response)
            setData(response.data.tags)
          })
          .catch(err => {
            console.log(err)
            setIsLoading(false)
          })
    }

    useEffect(() => {
        fetchData();
    }, []);

    console.log(data)

  // const [starred, setStarred] = useState(true)

  return (
    <React.Fragment>
      <CssBaseline />
      <Paper className={classes.paper}>
        <Typography className={classes.text} variant="h5" gutterBottom>
          Popular Trends
        </Typography>
        <List className={classes.list}>
          {data.map(({ id, title}) => (
            <React.Fragment key={id}>
              <ListItem button>
                <ListItemText primary={title} />
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


export default connect(mapStateToProps)(Hashtags)
