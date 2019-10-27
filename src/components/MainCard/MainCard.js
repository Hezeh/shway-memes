import React, { Component } from 'react';
import './MainCard.css';
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

const useStyles = makeStyles(theme => ({
  card: {
    maxWidth: '500px',
    maxHeight: '1000px',
    margin: "auto",
    transition: "0.3s",
    paddingTop: '10px',
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

function MemesCard() {
  const classes = useStyles();

  const shareMeme = () => {
    if (navigator.share) {
      navigator.share({
          title: 'Web Fundamentals',
          text: 'Check out Web Fundamentals — it rocks!',
          url: 'https://developers.google.com/web',
      })
        .then(() => console.log('Successful share'))
        .catch((error) => console.log('Error sharing', error));
    }
  }

  return (
    <Card className={classes.card}>
      <CardHeader
        avatar={
          <Avatar aria-label="user-avatar" className={classes.avatar} title="User">
            HM
          </Avatar>
        }
        action={
          <IconButton aria-label="settings" title="Settings">
            <MoreVertIcon />
          </IconButton>
        }
      />
      <CardMedia
        className={classes.media}
        image="https://images.unsplash.com/photo-1566039263025-caf125cd0994?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
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

export default MemesCard;
