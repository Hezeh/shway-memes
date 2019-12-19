import React, { useState } from 'react';
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

const tutorialSteps = [
  {
    id: 1,
    label: 'San Francisco – Oakland Bay Bridge, United States',
    username: 'Hezekiah',
    shortname: 'HM',
    imgPath:
    'https://storage.googleapis.com/spikey-shway-001/memes/Screenshot_20190422-193426.png'
  },
  {
    id: 2,
    label: 'Bird',
    username: 'Maish',
    shortname: 'MH',
    imgPath:
    'https://storage.googleapis.com/spikey-shway-001/memes/Screenshot_20190423-152551.png'
  },
  {
    id: 3,
    label: 'Bali, Indonesia',
    username: 'Waithira',
    shortname: 'PW',
    imgPath:
      'https://storage.googleapis.com/spikey-shway-001/memes/Screenshot_20190430-190922.png',
  },
  {
    id: 4,
    label: 'NeONBRAND Digital Marketing, Las Vegas, United States',
    username: 'Namatsi',
    shortname: 'NM',
    imgPath:
      'https://storage.googleapis.com/spikey-shway-001/memes/Screenshot_20190422-193129.png',
  },
  {
    id: 5,
    label: 'Goč, Serbia',
    username: 'Tito',
    shortname: 'TO',
    imgPath:
      'https://storage.googleapis.com/spikey-shway-001/memes/Screenshot_20190422-193213.png',
  },
  {
    id: 6,
    label: 'Goč, Serbia',
    username: 'Tito',
    shortname: 'TO',
    imgPath:
      'https://storage.googleapis.com/spikey-shway-001/memes/Screenshot_20190427-093901.png',
  },
  {
    id: 7,
    label: 'Goč, Serbia',
    username: 'Tito',
    shortname: 'TO',
    imgPath:
      'https://storage.googleapis.com/spikey-shway-001/memes/Screenshot_20190430-042750.png',
  },
  {
    id: 8,
    label: 'Goč, Serbia',
    username: 'Tito',
    shortname: 'TO',
    imgPath:
      'https://storage.googleapis.com/spikey-shway-001/memes/Screenshot_20190501-084245.png',
  },
  
];

function MobileCard() {
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

  const handleStepChange = step => {
    setActiveStep(step);
  };

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
                    //action={followUser}
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
                    <IconButton aria-label="favorite" title="Favorite" onClick={favoriteMeme}>
                      <FavoriteIcon />
                    </IconButton>
                    <IconButton aria-label="share" title="Repost" onClick={repostReaction}>
                      <LoopIcon />
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
  );
}

export default MobileCard;
