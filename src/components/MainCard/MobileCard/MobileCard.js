import React, { useState, useEffect } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import Button from '@material-ui/core/Button';
import {Link} from 'react-router-dom'
import LoopIcon from '@material-ui/icons/Loop';
import SwipeableViews from 'react-swipeable-views';
import './MobileCard.css';
import { favoriteMeme, repostReaction} from '../Reactions/CardReactions'
import { autoPlay } from 'react-swipeable-views-utils';
import Switch from '@material-ui/core/Switch';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import tutorialSteps from '../Data'
import RepeatIcon from '@material-ui/icons/Repeat';
import ReactGA from 'react-ga';

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


function MobileCard() {
  const classes = useStyles();
  const [follow, setFollow] = useState(true);
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const [autoplay, setAutoplay] = useState(true)
  // const maxSteps = tutorialSteps.length;
  const [checked, setChecked] = React.useState(true);
  const [iconColor, setIconColor] = React.useState('default')
  const [favorited, setFavorited] = React.useState(false)

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

  const favoriteMeme = () => {
    // setIconColor('default' => !'secondary');
    // setFavorited(prev => !prev)
  }

  const followUser = () => {
     if ( follow === true ) { 
       return (
         <Button variant="contained" color="secondary" className={classes.button} onClick={handleFollow}>
           Follow
         </Button>
       )
      } else {
        return (
         <Button variant="outlined" color="secondary" className={classes.button} onClick={handleFollow}>
           Unfollow
         </Button>
       )
      }
  }

  const handleFollow = () => {
    return (
      setFollow(prev => !prev)
    )
  }

  const handleStepChange = step => {
    setActiveStep(step);
  };

  const handleAutoplay = () => {
    if ( autoplay === true ) {
      return (
        <AutoPlaySwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={activeStep}
        onChangeIndex={handleStepChange}
        enableMouseEvents
      >
        {tutorialSteps.map((step, index) => (
            <div key={step.id}>
              {Math.abs(activeStep - index) <= 2 ? (
                <Card className={classes.card}>
                  <CardHeader
                    avatar={
                      <Avatar
                        alt="User Avatar"
                        className={classes.avatar}
                      >{step.shortname}</Avatar>
                    }
                    action={followUser()}
                    title={
                      <Link to="/profile" className="menu-link">
                        <Button size="small"  color="secondary">
                          {step.username}
                        </Button>
                      </Link>
                    }
                  />
                  <CardMedia 
                    className={classes.img} 
                    image={step.imgPath} 
                    title="Meme" />
                  <CardActions>
                    <IconButton aria-label="favorite" title="Favorite" onClick={favoriteMeme} color={iconColor}>
                      <FavoriteIcon />
                    </IconButton>
                    <IconButton aria-label="share" title="Repost" onClick={repostReaction}>
                      <RepeatIcon />
                    </IconButton>
                    <IconButton aria-label="share" title="Share" onClick={shareMeme}>
                      <ShareIcon />
                    </IconButton>
                    
                  </CardActions>
                </Card>
        ) : null}
        </div>
      ))}
    </AutoPlaySwipeableViews>

      )
      
    } else {
      return (
        <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={activeStep}
        onChangeIndex={handleStepChange}
        enableMouseEvents
      >
        {tutorialSteps.map((step, index) => (
            <div key={step.id}>
              {Math.abs(activeStep - index) <= 2 ? (
                <Card className={classes.card}>
                  <CardHeader
                    avatar={
                      <Avatar
                        alt="User Avatar"
                        className={classes.avatar}
                      >{step.shortname}</Avatar>
                    }
                    action={followUser()}
                    title={
                      <Link to="/profile" className="menu-link">
                        <Button size="small"  color="secondary">
                          {step.username}
                        </Button>
                      </Link>
                    }
                  />
                  <CardMedia 
                    className={classes.img} 
                    image={step.imgPath} 
                    title="Meme" />
                  <CardActions>
                    <IconButton aria-label="favorite" title="Favorite" onClick={favoriteMeme} >
                      <FavoriteIcon />
                    </IconButton>
                    <IconButton aria-label="share" title="Repost" onClick={repostReaction}>
                      <RepeatIcon />
                    </IconButton>
                    <IconButton aria-label="share" title="Share" onClick={shareMeme}>
                      <ShareIcon />
                    </IconButton>
                    
                  </CardActions>
                </Card>
        ) : null}
        </div>
      ))}
    </SwipeableViews>
      )
      
    }
  }

  return (
    <div>
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
      {handleAutoplay()}
    </div>
  );
}

export default MobileCard;
