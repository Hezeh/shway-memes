import React, { useState } from 'react';
import Follow from '../Follow/Follow';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
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
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import {Link} from 'react-router-dom'

// TODO: Remember to Implement the backend to resize images to a size of 400px by 500px

const useStyles = makeStyles(theme => ({
  card: {
    maxWidth: 500,
    maxHeight: 1000,
    transition: "0.3s",
    margin: 'auto',
    justify: "center",
    borderRadius: "15px",
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
}));

function MemesVideos() {
  const classes = useStyles();
  const [follow, setFollow] = useState(false)

  const shareMeme = () => {
    if (navigator.share) {
      navigator.share({
          title: 'Cool Memes',
          text: 'Check out Shway Memes — it rocks!',
          url: 'https://facebook.com',
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

  return (
    <Card className={classes.card}>
      <CardHeader
        avatar={
          <Link to="/profile" className="link">
            <Avatar aria-label="user-avatar" className={classes.avatar} title="User">
              HM
            </Avatar>
          </Link>
        }
        action={followUser()}
        title={
          <Link to="/profile" className="menu-link">
            <Button size="large" color="secondary" >
              Maish
            </Button>
          </Link>
        }
      />
      <CardMedia
        className={classes.media}
        image="https://images.unsplash.com/photo-1569984750127-9f7c01a30cdf?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1534&q=80"
        title="Meme"
      />
      <CardContent>
      </CardContent>
      <CardActions >
        <IconButton aria-label="add to favorites" title="Favorite">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share" title="Share" onClick={shareMeme}>
          <ShareIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
}

export default MemesVideos;