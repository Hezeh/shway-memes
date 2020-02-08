import React, { Fragment , useState, useEffect} from 'react';
// import './DesktopCard.css';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
// import LoopIcon from '@material-ui/icons/Loop';
import Grid from '@material-ui/core/Grid';
import Skeleton from '@material-ui/lab/Skeleton'
import { favoriteMeme, repostReaction} from '../Reactions/CardReactions'
import tutorialSteps from '../Data'
import Button from '@material-ui/core/Button';
import {Link} from 'react-router-dom'
// import { useFetch } from '../../../useFetch';
import RepeatIcon from '@material-ui/icons/Repeat';

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
  root: {
    marginTop: '30px',
    paddingTop: '30px'
  },
}));


function MainCard() {
  const classes = useStyles();
  // const loading = true;
  const [values, setValues] = useState({
    loading: true,
  })
  
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
                          values.loading ? (
                            <Skeleton variant="circle" width={40} height={40} />
                          ) : (
                            <Avatar
                              alt="User Avatar"
                              className={classes.avatar}
                            >
                              {step.shortname}
                            </Avatar>
                          )}
                        action={
                          values.loading ? null : (
                            <Link to="/profile" className="menu-link">
                              <Button size="small"  color="secondary">
                                {step.username}
                              </Button>
                            </Link>
                          )
                        }
                        title={values.loading ? 
                                <Skeleton height={35} width="100%" style={{ marginBottom: 6 }} /> 
                                : step.username}
                      />
                        {values.loading ? (
                          <Skeleton variant="rect" className={classes.media} />
                        ) : (
                          <CardMedia
                            className={classes.media}
                            image={step.imgPath}
                            title="Meme"
                          />
        
                        )}  
                        <CardActions >
                          {values.loading ? (
                          <React.Fragment>
                            <Skeleton height={40} width="80%" />
                          </React.Fragment>
                        ) : (
                          <Fragment>
                            <IconButton aria-label="favorite" title="Favorite" onClick={favoriteMeme}>
                              <FavoriteIcon />
                            </IconButton>
                            <IconButton aria-label="share" title="Repost" onClick={repostReaction}>
                              <RepeatIcon />
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