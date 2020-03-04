import React, { useState, useEffect, Fragment, useRef, useCallback } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton'
import { red } from '@material-ui/core/colors';
import ShareIcon from '@material-ui/icons/Share';
import Button from '@material-ui/core/Button';
import {Link} from 'react-router-dom'
import ReactGA from 'react-ga';
import {uploadsURL} from '../../constants';
import axios from 'axios'
import {connect} from 'react-redux'
import { CardLoader,  FollowUserButton, FavoriteAction, RepostAction} from '../common'
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
  card: {
    maxWidth: '99%',
    maxHeight: 650,
    transition: "0.01s",
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
  avatar: {
    backgroundColor: red[500],
  },
  img: {
    objectFit: 'scale-down',
    height: 350,
    display: 'block',
    margin: 'auto',
    borderRadius: '10px',
  },
  menuLink: {
    textDecoration: 'none',
    color: '#e91e63'
  }
}));

function MobileCard(props) {
  const classes = useStyles();
  const theme = useTheme();

  const [ isLoading, setIsLoading] = useState(false)
  const [url, setNextUrl] = useState(uploadsURL);
  const [loadingMore, setLoadingMore] = useState(false)
  const [data, setData] = useState([]);

  // const observer = useRef()
  // const lastImageElementRef = useCallback(node => {
  //   if (isLoading) return
  //   if (observer.current) observer.current.disconnect()
  //   observer.current = new IntersectionObserver(entries => {
  //     if (entries[0].isIntersecting ) {
  //       setPageNumber(prevPageNumber => prevPageNumber + 1)
  //     }
  //   })
  //   if (node) observer.current.observe(node)
  // }, [isLoading, url])


  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll)
  })

  function handleScroll() {
    if (
      (document.documentElement.scrollHeight - document.documentElement.scrollTop) ===
      (document.documentElement.clientHeight)
    ) {
      fetchMoreData()
    }
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
    <Fragment >
    <Typography color="secondary" variant="h6" align="center" noWrap>
                ShwayMemes
    </Typography>
      { isLoading ? (<CardLoader />) : 
      (data.map((step) => (
        <div key={step.id}>
            <Card className={classes.card}>
              <CardHeader
                action={<FollowUserButton token={props.token} user={props.currentUser} step={step}/>}
                title={
                  <Link to={`@${step.author_name}`} className={classes.menuLink}>
                    <Button size="small" color="secondary">
                      {step.author_name}
                    </Button>
                  </Link>
                }
              />
              <CardMedia 
                className={classes.img} 
                image={step.photo} 
                title="Meme" 
                component="img"
                />

              <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">
                  {step.caption}
                </Typography>
              </CardContent>
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
      )))}
    {loadingMore && <Fragment><CardLoader /></Fragment>}
    </Fragment>
  );
}


const mapStateToProps = state => {
  return {
    token: state.auth.token,
    currentUser: state.auth.username
  };
};


export default connect(mapStateToProps)(MobileCard)