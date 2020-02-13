import React, { useState, useEffect, Fragment } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton'
import { red } from '@material-ui/core/colors';
import ShareIcon from '@material-ui/icons/Share';
import Button from '@material-ui/core/Button';
import {Link} from 'react-router-dom'
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
import Switch from '@material-ui/core/Switch';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import ReactGA from 'react-ga';
import {uploadsURL} from '../../constants';
import axios from 'axios'
import {connect} from 'react-redux'
import { Loader,  FollowUserButton, FavoriteAction, RepostAction } from '../common'

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);


// TODO: Remember to Implement the backend to resize images to a size of 400px by 500px

const useStyles = makeStyles(theme => ({
  card: {
    maxWidth: '99%',
    //minHeight: '100%',
    maxHeight: 800,  // 1000
    transition: "0.01s",
    margin: 'auto',
    justify: "center",
    borderRadius: "30px",
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    // position: 'fixed',
    // height: '100%',
    boxShadow: "0 8px 40px -12px rgba(0,0,0,0.3)",
    "&:hover": {
      boxShadow: "0 16px 70px -12.125px rgba(0,0,0,0.3)"
    }
  },
  avatar: {
    backgroundColor: red[500],
  },
  img: {
    //minHeight: 500,
    //lineHeight: 350,
    height: 350,
    display: 'block',
    overflow: 'hidden',
    maxWidth: '95%',
    alignItems: 'center',
    padding: '5px',
    margin: 'auto',
    borderRadius: '10px',
    position: "static",
    [theme.breakpoints.down('xs')]: {
      //display: 'block',
      //height: 350,
    },  
  },
}));

function MobileCard(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const [autoplay, setAutoplay] = useState(false)
  const [checked, setChecked] = React.useState(false);
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

  const toggleChecked = () => {
    setChecked(prev => !prev);
    setAutoplay(prev => !prev);
  };

  const shareMeme = () => {
    if (navigator.share) {
      navigator.share({
          title: 'Cool Memes',
          text: 'Check out Shway Memes — it rocks!',
          url: 'https://shwaymemes.com',
      })
        .then(() => console.log('Successful share'))
        .catch((error) => console.log('Error sharing', error));
    }
    ReactGA.event({
      category: 'User',
      action: 'Shared link to photo/meme'
    });
  }
  
  const handleStepChange = step => {
    setActiveStep(step);
  };

  return (
    <Fragment>
      <FormControl>
      <FormGroup>
        <FormControlLabel
          value="autoplay"
          control={<Switch color="secondary" checked={checked} onChange={toggleChecked} />}
          label="Autoplay"
          labelPlacement="start"
        />
      </FormGroup>
    </FormControl>
    <AutoPlaySwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={activeStep}
        onChangeIndex={handleStepChange}
        enableMouseEvents
        interval={3000}
        autoplay={autoplay}
      >
      { isLoading ? (<Loader />) : 
      (data.map((step, index) => (
        <div key={step.id}>
            {Math.abs(activeStep - index) <= 2 ? (
            <Card className={classes.card}>
              <CardHeader
                avatar={
                  <Avatar
                    alt="User Avatar"
                    className={classes.avatar}
                  >HM</Avatar>
                }
                action={<FollowUserButton step={step}/>}
                title={
                  <Link to="/profile" className="menu-link">
                    <Button size="small"  color="secondary">
                      {step.publisher_name}
                    </Button>
                  </Link>
                }
              />
              <CardMedia 
                className={classes.img} 
                image={step.photo.medium_square_crop} 
                title="Meme" />
              <CardActions>
                <FavoriteAction step={step}/>
                <RepostAction step={step}/>
                <IconButton aria-label="share" title="Share" onClick={shareMeme}>
                  <ShareIcon />
                </IconButton>
                
              </CardActions>
            </Card>
    ) : null}
    </div>
    )))}
    </AutoPlaySwipeableViews>
    </Fragment>
  );
}

const mapStateToProps = state => {
  return {
    token: state.auth.token
  };
};


export default connect(mapStateToProps)(MobileCard)