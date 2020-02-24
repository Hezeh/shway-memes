import React, {  useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardActions from '@material-ui/core/CardActions';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import Skeleton from '@material-ui/lab/Skeleton'
import Button from '@material-ui/core/Button';
import RepeatIcon from '@material-ui/icons/Repeat';
import IconButton from '@material-ui/core/IconButton'
import axios from 'axios'
import { uploadsURL, followURL } from '../constants'

const useStyles = makeStyles(theme => ({
  card: {
    flexGrow: 1,
    minWidth: '450px',
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
  mobile: {
    height: '380px',  
    width: '100%'
  },
  mobileCard: {
    flexGrow: 1,
    minWidth: '350px',
    maxHeight: '1000px',
    margin: "10px",
    transition: "0.1s",
    borderRadius: "30px",
    boxShadow: "0 8px 40px -12px rgba(0,0,0,0.3)",
    "&:hover": {
      boxShadow: "0 16px 70px -12.125px rgba(0,0,0,0.3)"
    }
  },
  avatar: {
    backgroundColor: red[500],
  },
  div: {
    alignContent: 'start',
    display: 'block',
  },
  cardloader: {
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
  cardimg: {
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

export const FollowUserButton = (props) => {
  const classes = useStyles();
  const [buttonState, setButtonState] = useState(props.step.following);

  console.log(props.step.following)

  const handleClick = () => {
    if ( props.step.following === true) {
        axios.defaults.headers = {
          "Content-Type": "application/json",
          Authorization: `Token ${props.token}`
        }
        axios.delete(`${followURL}${props.step.username}/follow`)
    } else {
      axios.defaults.headers = {
          "Content-Type": "application/json",
          Authorization: `Token ${props.token}`
        }
        axios.post(`${followURL}${props.step.username}/follow`)
    }
    setButtonState(prev => !prev);
  }

  if (props.user === props.step.username) {
    return (
      <div></div>
    )
  }

  return (
    <Button
      variant={buttonState === true ? 'outlined' : 'contained'}
      color="secondary"
      className={classes.button}
      onClick={handleClick}
    >
      { buttonState === true ? 'Unfollow' : 'Follow'}
    </Button>
  )
}

export const Loader = () => {
    const classes = useStyles();
    return (
      <div className={classes.div}>
      <Card className={classes.card}>
        <CardHeader
          avatar={<Skeleton variant="circle" width={40} height={40} />}
          action={null}
          title={<Skeleton height={35} width="100%" style={{ marginBottom: 6 }} /> }
        />
        {<Skeleton variant="rect" className={classes.media} />}  
        <CardActions >
          <Skeleton height={40} width="80%" />
        </CardActions>
      </Card>
    </div>
    )
}

export const CardLoader = () => {
  const classes = useStyles();
  return (
    <div className={classes.div}>
    <Card className={classes.cardloader}>
      <CardHeader
        // action={<Skeleton variant="rect" width={40} height={40} />}
        title={<Skeleton height={35} width="100%" style={{ marginBottom: 6 }} /> }
      />
      {<Skeleton variant="rect" className={classes.cardimg} />}  
      <CardActions >
        <Skeleton height={40} width="80%" />
      </CardActions>
    </Card>
  </div>
  )
}

export const MobileLoader = () => {
  const classes = useStyles();
  return (
    <div className={classes.div}>
    <Card className={classes.mobileCard}>
      {<Skeleton variant="rect" className={classes.mobile} />}  
    </Card>
  </div>
  )
}


export const FavoriteAction = (props) => {
    const [iconColor, setIconColor] = useState(props.step.favorited) 
  
    const handleClick = () => {
      if ( props.step.favorited === true) {
          axios.defaults.headers = {
            "Content-Type": "application/json",
            Authorization: `Token ${props.token}`
          }
          axios.delete(`${uploadsURL}/${props.step.id}/favorite/`)
      } else {
        axios.defaults.headers = {
            "Content-Type": "application/json",
            Authorization: `Token ${props.token}`
          }
          axios.post(`${uploadsURL}/${props.step.id}/favorite/`)
      }
      setIconColor(prev => !prev);
    }
  

    return (
      <IconButton 
        aria-label="favorite" 
        title="Favorite" 
        onClick={handleClick}
        color={ iconColor === true ? 'secondary' : 'inherit'}>
          <FavoriteIcon />
      </IconButton>
    )
  }
  
  export const RepostAction = (props) => {
    const [iconColor, setIconColor] = useState(props.step.favorited) 
  
    // TODO: step should have a repost attribute
  
    const handleClick = () => {
      console.log('Repost Icon Clicked')
      setIconColor(prev => !prev);
    }
  
    return (
      <IconButton 
        aria-label="favorite" 
        title="Favorite" 
        onClick={handleClick}
        color={iconColor === true ? 'secondary' : 'inherit'}>
          <RepeatIcon />
      </IconButton>
    )
}
  