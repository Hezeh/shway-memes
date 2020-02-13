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
}));

export const FollowUserButton = ({step}) => {
  const classes = useStyles();
  const [buttonState, setButtonState] = useState(step.following);

  const handleClick = () => {
    console.log('Follow Button Clicked')
    setButtonState(prev => !prev);

    // TODO:  Make a request to the backend to modify the following attribute
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

export const FavoriteAction = (props) => {
    const [iconColor, setIconColor] = useState(props.step.favorited) 
  
    const handleClick = () => {
      console.log('Favorite Icon Clicked')
      setIconColor(prev => !prev);

      // TODO: Make Post/Delete requests to the backend
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
  