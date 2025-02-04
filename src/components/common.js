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
import { uploadsURL, followURL, groupJoinURL } from '../constants'

const useStyles = makeStyles(theme => ({
  card: {
    flexGrow: 1,
    minWidth: '700px',
    maxHeight: '1000px',
    margin: "10px",
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
    minWidth: '380px',
    maxHeight: 800, 
    margin: '10px',
    justify: "center",
    borderRadius: "30px",
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    boxShadow: "0 8px 40px -12px rgba(0,0,0,0.3)",
    "&:hover": {
      boxShadow: "0 16px 70px -12.125px rgba(0,0,0,0.3)"
    }
  },
  cardimg: {
    objectFit: 'scale-down',
    height: 500,
    display: 'block',
    overflow: 'hidden',
    maxWidth: '95%',
    alignItems: 'center',
    padding: '5px',
    margin: 'auto',
    borderRadius: '10px',
    position: "static",
  },
}));

export const FollowUserButton = (props) => {
  const classes = useStyles();
  const [buttonState, setButtonState] = useState(props.step.following);

  const handleClick = () => {
    if ( props.step.following === true) {
        axios.defaults.headers = {
          "Content-Type": "application/json",
          Authorization: `Token ${props.token}`
        }
        axios.delete(`${followURL}${props.step.author_name}/follow`)
    } else {
      axios.defaults.headers = {
          "Content-Type": "application/json",
          Authorization: `Token ${props.token}`
        }
        axios.post(`${followURL}${props.step.author_name}/follow`)
    }
    setButtonState(prev => !prev);
  }

  if (props.step.following === null) {
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
          axios.delete(`${uploadsURL}${props.step.id}/favorite/`)
      } else {
        axios.defaults.headers = {
            "Content-Type": "application/json",
            Authorization: `Token ${props.token}`
          }
          axios.post(`${uploadsURL}${props.step.id}/favorite/`)
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
    const [iconColor, setIconColor] = useState(props.step.reposted) 
  
    const handleClick = () => {
      if ( props.step.reposted === true) {
          axios.defaults.headers = {
            "Content-Type": "application/json",
            Authorization: `Token ${props.token}`
          }
          axios.delete(`${uploadsURL}${props.step.id}/repost/`)
      } else {
        axios.defaults.headers = {
            "Content-Type": "application/json",
            Authorization: `Token ${props.token}`
          }
          axios.post(`${uploadsURL}${props.step.id}/repost/`)
      }
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
  