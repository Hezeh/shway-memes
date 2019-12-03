import React, { useState } from 'react';
//import Follow from '../Follow/Follow';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import {Link} from 'react-router-dom'
//import LoopIcon from '@material-ui/icons/Loop';
//import MoodBadIcon from '@material-ui/icons/MoodBad';
//import MoodIcon from '@material-ui/icons/Mood';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
import './MobileCard.css';
// TODO: Remember to Implement the backend to resize images to a size of 400px by 500px

const useStyles = makeStyles(theme => ({
  card: {
    maxWidth: '99%',
    maxHeight: 800,  // 1000
    transition: "0.1s",
    margin: 'auto',
    justify: "center",
    borderRadius: "30px",
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: "0 8px 40px -12px rgba(0,0,0,0.3)",
    "&:hover": {
      boxShadow: "0 16px 70px -12.125px rgba(0,0,0,0.3)"
    }
  },
  avatar: {
    backgroundColor: red[500],
  },
  img: {
    height: 400,
    display: 'block',
    overflow: 'hidden',
    maxWidth: '95%',
    alignItems: 'center',
    padding: '10px',
    margin: 'auto',
    borderRadius: '10px',
    position: "static",
  },
}));

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const tutorialSteps = [
  {
    id: 1,
    label: 'San Francisco – Oakland Bay Bridge, United States',
    username: 'Hezekiah',
    shortname: 'HM',
    imgPath:
    'https://preview.redd.it/tlnxohgeqrw31.jpg?width=640&height=351&crop=smart&auto=webp&s=8dc4fe0fb703f680931d506be02b740f32a523c8',
  },
  {
    id: 2,
    label: 'Bird',
    username: 'Maish',
    shortname: 'MH',
    imgPath:
      'https://images.unsplash.com/photo-1538032746644-0212e812a9e7?auto=format&fit=crop&w=400&h=250&q=60',
  },
  {
    id: 3,
    label: 'Bali, Indonesia',
    username: 'Waithira',
    shortname: 'PW',
    imgPath:
      'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=400&h=250&q=80',
  },
  {
    id: 4,
    label: 'NeONBRAND Digital Marketing, Las Vegas, United States',
    username: 'Namatsi',
    shortname: 'NM',
    imgPath:
      'https://images.unsplash.com/photo-1518732714860-b62714ce0c59?auto=format&fit=crop&w=400&h=250&q=60',
  },
  {
    id: 5,
    label: 'Goč, Serbia',
    username: 'Tito',
    shortname: 'TO',
    imgPath:
      'https://images.unsplash.com/photo-1512341689857-198e7e2f3ca8?auto=format&fit=crop&w=400&h=250&q=60',
  },
];

function MemesVideos() {
  const classes = useStyles();
  const [follow, setFollow] = useState(false);
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const maxSteps = tutorialSteps.length;

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
         <Button variant="contained" color="secondary" className={classes.button} onClick={handleUnFollow}>
           Unfollow
         </Button>
       )
      }
  }

  const handleFollow = () => {
    return (
      setFollow(false)
    )
  }

  const handleUnFollow = () => {
    return (
      setFollow(true)
    )
  }

  const handleNext = () => {
    setActiveStep(prevActiveStep => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };

  const handleStepChange = step => {
    setActiveStep(step);
  };

  const favoriteMeme = () => {
    return (
      console.log('Favorited this meme!')
    )
  }

  const laughReaction = () => {
    return (
      console.log('This meme is quite hilarious')
    )
  }

  const ghostReaction = () => {
    return (
      console.log('Ghosted')
    )
  }

  const disgustReaction = () => {
    return (
      console.log('Disgusting meme!')
    )
  }

  const repostReaction = () => {
    return (
      console.log('Reposted this meme')
    )
  }

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
                      <Link to="/profile" className="link">
                        <Avatar aria-label="user-avatar" className={classes.avatar} title="User">
                        {tutorialSteps[activeStep].shortname}
                        </Avatar>
                      </Link>
                    }
                    action={followUser}
                    title={
                      <Link to="/profile" className="menu-link">
                        <Button size="small"  color="secondary">
                          {tutorialSteps[activeStep].username}
                        </Button>
                      </Link>
                    }
                  />
                  <CardMedia className="img" image={step.imgPath} title="Meme" />
                  <CardActions>
                    <IconButton aria-label="add to favorites" title="Favorite" onClick={favoriteMeme} color="secondary">
                      <span role="img" aria-label="add to favorites">💖</span>
                    </IconButton>
                    <IconButton aria-label="laugh" title="Laugh" onClick={laughReaction}>
                      <span role="img" aria-label="Very funny">🤣</span>
                    </IconButton>
                    <IconButton aria-label="ghost-face" title="GhostReaction" onClick={ghostReaction}>
                      <span role="img" aria-label="ghost-face">💀</span>
                    </IconButton>
                    <IconButton aria-label="disgusting" title="Disgust" onClick={disgustReaction}>
                      <span role="img" aria-label="disgusting">🤦</span>
                    </IconButton>
                    <IconButton aria-label="Repost" title="Rememe" onClick={repostReaction}>
                      <span role="img" aria-label="repost">🌀</span>
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
  );
}

{/*
🥺🥶😙😂🤩😊🙂😌🤬😡🤤🤒🤕🤥💩🤡👿😈😇💀🤤😪🤐🥴🤧🤒👹👺👻☠️👽👾🤖🎃😺😸😹😻😼😽
🤔🤓🤒🤬🤣🤤🤢🤦🙅‍♂️🤭💖🥰️🤭🥺️🤨🙌 💜
*/}
export default MemesVideos;
