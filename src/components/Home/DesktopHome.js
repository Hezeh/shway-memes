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

const useStyles = makeStyles(theme => ({
  card: {
    flexGrow: 1,
    minWidth: '630px',
    // maxHeight: '800px',  // was 1000px
    maxHeight: '1000px',
    margin: "10px",
    transition: "0.1s",
    borderRadius: "30px",
    boxShadow: "0 8px 40px -12px rgba(0,0,0,0.3)",
    "&:hover": {
      boxShadow: "0 16px 70px -12.125px rgba(0,0,0,0.3)"
    }
  },
  media: {
    height: '400px',  
    width: '100%'
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
  const [url] = useState(uploadsURL);

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
  
  return (
    <div>
      <Grid container className={classes.root} spacing={2}>
        <Grid item xs={12}>
          <Grid container justify="center" spacing={2}>
          { isLoading ? (<Fragment><Loader /> <Loader /></Fragment>) : (
              data.map((step) => {
                return (
                  <div key={step.id} className={classes.div}>
                  <Card className={classes.card}>
                    <CardHeader
                      action={<FollowUserButton step={step} />}
                      title={<Link to={`@${step.publisher_name}`} className={classes.menuLink}>
                              <Button size="small" color="secondary">
                                {step.publisher_name}
                              </Button>
                             </Link>
                             }
                    />
                      
                    <CardMedia
                      className={classes.media}
                      image={step.photo.thumbnail}
                      title="Meme"
                    />
      
                    <CardActions >
                        <Fragment>
                          <FavoriteAction step={step}/>
                          {/* <RepostAction step={step}/> */}
                        </Fragment>    
                      </CardActions>
                  </Card>
                </div>
                )
          })
            )}
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