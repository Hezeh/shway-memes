import React, { Fragment } from 'react';
import './DesktopCard.css';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import LoopIcon from '@material-ui/icons/Loop';
import Grid from '@material-ui/core/Grid';
import Skeleton from '@material-ui/lab/Skeleton'
import { favoriteMeme, repostReaction} from '../Reactions/CardReactions'

const useStyles = makeStyles(theme => ({
  card: {
    flexGrow: 1,
    minWidth: '600px',
    maxHeight: '800px',  // was 1000px
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
    
  }
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

function MainCard() {
  const classes = useStyles();
  const loading = false;
  
  
  return (
    <div>
      <Grid container className={classes.root} spacing={2}>
        <Grid item xs={12}>
          <Grid container justify="center" spacing={2}>
            {tutorialSteps.map((step) => {
                  return (
                    <div key={step.id} className={classes.div}>
                    <Card className={classes.card}>
                      <CardHeader
                        avatar={
                          loading ? (
                            <Skeleton variant="circle" width={40} height={40} />
                          ) : (
                            <Avatar
                              alt="User Avatar"
                              className={classes.avatar}
                          >{step.shortname}</Avatar>
                          )
                        }
                        action={
                          loading ? null : (
                            <IconButton aria-label="more">
                              <MoreVertIcon />
                            </IconButton>
                          )
                        }
                        title={loading ? <Skeleton height={10} width="80%" style={{ marginBottom: 6 }} /> : step.username}
    
                
                      />
                        {loading ? (
                          <Skeleton variant="rect" className={classes.media} />
                        ) : (
                          <CardMedia
                            className={classes.media}
                            image={step.imgPath}
                            title="Meme"
                          />
        
                        )}  
                        <CardActions >
                          {loading ? (
                          <React.Fragment>
                            <Skeleton height={40} width="80%" />
                          </React.Fragment>
                        ) : (
                          <Fragment>
                            <IconButton aria-label="favorite" title="Favorite" onClick={favoriteMeme}>
                              <FavoriteIcon />
                            </IconButton>
                            <IconButton aria-label="share" title="Repost" onClick={repostReaction}>
                              <LoopIcon />
                            </IconButton>
                          </Fragment>
                        )}
                          
                        </CardActions>
                    </Card>
                  </div>
                  )
            })}
            </Grid>
        </Grid>
      </Grid>
      )}
    </div>
  );
}


export default MainCard;