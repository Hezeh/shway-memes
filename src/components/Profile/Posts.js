import React, { Fragment , useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import { red } from '@material-ui/core/colors';
import Grid from '@material-ui/core/Grid';
import {uploadsURL} from '../../constants'
import axios from 'axios'
import {connect} from 'react-redux'
import {MobileLoader} from '../common'
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton'
import ShareIcon from '@material-ui/icons/Share';
import ReactGA from 'react-ga';
import { CardLoader,  FollowUserButton, FavoriteAction, RepostAction} from '../common'

const useStyles = makeStyles(theme => ({
  card: {
    maxWidth: '90%',
    maxHeight: 650,
    // transition: "0.01s",
    margin: 'auto',
    justify: "center",
    borderRadius: "30px",
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    // marginBottom: 10,
    boxShadow: "0 8px 40px -12px rgba(0,0,0,0.3)",
    "&:hover": {
      boxShadow: "0 16px 70px -12.125px rgba(0,0,0,0.3)"
    }
  },
  media: {
    objectFit: 'scale-down',
    height: 600,
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
}));

function UserPosts(props) {
  const classes = useStyles()
  const [ isLoading, setIsLoading] = useState(false)
  const [loadingMore, setLoadingMore] = useState(false)
  const [data, setData] = useState([]);
  const [url, setNextUrl] = useState(`${uploadsURL}?author=${props.user}`);


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
  
  return (
    <div>
      <Grid container className={classes.root} spacing={2}>
        <Grid item xs={12}>
          <Grid container spacing={2}>
            { isLoading ? (<Fragment><MobileLoader /> <MobileLoader /> <MobileLoader /></Fragment>) : (
              data.map((step) => {
                return (
                  <div key={step.id} className={classes.div}>
                  <Card className={classes.card}>  
                    <CardMedia
                      className={classes.media}
                      image={step.photo}
                      title="Meme"
                      component="img"
                        />   
                    
                    <CardActions>
                      <FavoriteAction token={props.token} step={step}/>
                      <RepostAction  token={props.token} step={step}/>
                      <IconButton aria-label="share" title="Share" onClick={
                        () => {
                          if (navigator.share) {
                            navigator.share({
                                title: 'Cool Meme',
                                text: 'Check out this meme on Shwaymemes — it rocks!',
                                url: `https://shwaymemes.com/upload/${step.id}`,
                            })
                              .then(() => {
                                ReactGA.event({
                                  category: 'User',
                                  action: 'Shared link to meme'
                                })}
                              )
                              .catch((error) => console.log('Error sharing', error));
                          }
                        }
                      }>
                        <ShareIcon />
                      </IconButton>
                    </CardActions>           
                  </Card>
                </div>
                )
            })
            )}
            {loadingMore && <Fragment><MobileLoader /> <MobileLoader /> <MobileLoader /></Fragment>}
            </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    token: state.auth.token
  };
};


export default connect(mapStateToProps)(UserPosts)
