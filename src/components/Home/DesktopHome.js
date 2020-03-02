import React, { Fragment , useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardActions from '@material-ui/core/CardActions';
import { red } from '@material-ui/core/colors';
import Grid from '@material-ui/core/Grid';
import {Loader, FollowUserButton, FavoriteAction, RepostAction} from '../common'
import {uploadsURL} from '../../constants';
import axios from 'axios'
import {connect} from 'react-redux'
import Button from '@material-ui/core/Button';
import {Link} from 'react-router-dom'
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
  card: {
    flexGrow: 1,
    minWidth: '630px',
    maxHeight: '650px',
    margin: "10px",
    transition: "0.1s",
    borderRadius: "30px",
    boxShadow: "0 8px 40px -12px rgba(0,0,0,0.3)",
    "&:hover": {
      boxShadow: "0 16px 70px -12.125px rgba(0,0,0,0.3)"
    }
  },
  media: {
    objectFit: 'scale-down',
    height: '500px',
    display: 'block',
    margin: 'auto',
    borderRadius: '10px',
  },
  avatar: {
    backgroundColor: red[500],
  },
  div: {
    alignContent: 'start',
    display: 'block',
  },
  root: {
    marginTop: '30px',
    paddingTop: '30px'
  },
  menuLink: {
    textDecoration: 'none'
  }
}));


function MainCard(props) {
  const classes = useStyles();
  const [ isLoading, setIsLoading] = useState(false)
  const [data, setData] = useState([]);
  const [url, setNextUrl] = useState(uploadsURL);
  const [loadingMore, setLoadingMore] = useState(false)

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll)
  })

  function handleScroll() {
    if ( window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight || isLoading) return;
    fetchMoreData()
  }

  // async function fetchData() {
  //   setIsLoading(true)
  //   axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
  //   axios.defaults.xsrfCookieName = "csrftoken";
  //   axios.defaults.headers = {
  //     "Content-Type": "application/json",
  //     Authorization: `Token ${props.token}`,
  //   };
  //   axios
  //       .get(url)
  //       .then(response => {
  //         setIsLoading(false)
  //         setNextUrl(response.data.next)
  //         setData(response.data.results)
  //       })
  //       .catch(err => {
  //         console.log(err)
  //         setIsLoading(false)
  //       })
  // }

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
  
  return (
    <div>
      <Grid container className={classes.root} spacing={2}>
        <Grid item xs={12}>
          <Grid container justify="center" spacing={2}>
          { isLoading ? (<Fragment><Loader /></Fragment>) : (
              data.map((step) => {
                return (
                  <div key={step.id} className={classes.div}>
                  <Card className={classes.card}>
                    <CardHeader
                      action={<FollowUserButton token={props.token} step={step} />}
                      title={<Link to={`@${step.author_name}`} className={classes.menuLink}>
                              <Button size="small" color="secondary">
                                {step.author_name}
                              </Button>
                             </Link>
                             }
                    />
                      
                    <CardMedia
                      className={classes.media}
                      image={step.photo}
                      title="Meme"
                      component="img"
                      // height="auto"
                    />

                    <CardContent>
                      <Typography variant="body2" color="textSecondary" component="p">
                        {step.caption}
                      </Typography>
                    </CardContent>
      
                    <CardActions >
                        <Fragment>
                          <FavoriteAction token={props.token} step={step}/>
                          <RepostAction token={props.token} step={step}/>
                        </Fragment>    
                      </CardActions>
                  </Card>
                </div>
                )
          })
            )}
            {loadingMore && <Fragment><Loader /></Fragment>}
            </Grid>
        </Grid>
      </Grid>
      )}
    </div>
  );
}

const mapStateToProps = state => {
  return {
    token: state.auth.token
  };
};


export default connect(mapStateToProps)(MainCard)