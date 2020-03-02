import React , { useEffect, useState, Fragment }from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import axios from 'axios'
import {trendingGroupsURL} from '../../constants'
import {connect} from 'react-redux'
import Skeleton from '@material-ui/lab/Skeleton';
import { Link } from 'react-router-dom'
// import {groupPostsURL} from '../../constants'

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
  },
  menuLink: {
    textDecoration: 'none',
    color: '#e91e63'
  }
}));

function TrendingGroups(props) {
  const classes = useStyles();
  const [ isLoading, setIsLoading] = useState(false)
  const [data, setData] = useState([]);
  const [url, setNextUrl] = useState(trendingGroupsURL);

  const [loadingMore, setLoadingMore] = useState(false)

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll)
  })

  function handleScroll() {
    if ( window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight || isLoading) return;
    fetchMoreData()
  }

  async function fetchMoreData() {
    setLoadingMore(true)
    axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
    axios.defaults.xsrfCookieName = "csrftoken";
    axios.defaults.headers = {
      "Content-Type": "application/json",
      Authorization: `Token ${props.token}`,
    };
    axios
        .get(url)
        .then(response => {
          setNextUrl(response.data.next)
          setData([...data, ...response.data.results])
          setLoadingMore(false)
        })
        .catch(err => {
          console.log(err)
          setLoadingMore(false)
        })
  }

  useEffect(() => {
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
            setNextUrl(response.data.next)
            setData(response.data.results)
          })
          .catch(err => {
            console.log(err)
            setIsLoading(false)
          })
    }
      fetchData();
  }, []);

  if (isLoading === true) {
    return (
      <Fragment>
        <Skeleton animation="wave" height={400}/>
      </Fragment>
      
    )
  }


  return (
    <React.Fragment>
      <CssBaseline />
      <Paper square className={classes.paper}>
        <Typography className={classes.text} variant="h5" gutterBottom>
          Trending Groups
        </Typography>
        <List className={classes.list}>
          {data.map(({ id, group_name}) => (
            <React.Fragment key={id}>
              <Link to={`/groups/${id}`} className={classes.menuLink}>
                <ListItem button >
                  <ListItemText primary={group_name} />
                </ListItem>
              </Link>
            </React.Fragment>
          ))}
          {loadingMore && <Fragment><div>Loading More</div></Fragment>}
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


export default connect(mapStateToProps)(TrendingGroups)
