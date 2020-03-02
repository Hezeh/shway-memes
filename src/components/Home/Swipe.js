// import React, { useState, useEffect, Fragment } from 'react';
// import { makeStyles, useTheme } from '@material-ui/core/styles';
// import Card from '@material-ui/core/Card';
// import CardHeader from '@material-ui/core/CardHeader';
// import CardMedia from '@material-ui/core/CardMedia';
// import CardActions from '@material-ui/core/CardActions';
// import IconButton from '@material-ui/core/IconButton'
// import { red } from '@material-ui/core/colors';
// import ShareIcon from '@material-ui/icons/Share';
// import Button from '@material-ui/core/Button';
// import {Link} from 'react-router-dom'
// import SwipeableViews from 'react-swipeable-views';
// import { autoPlay } from 'react-swipeable-views-utils';
// import Switch from '@material-ui/core/Switch';
// import FormGroup from '@material-ui/core/FormGroup';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
// import FormControl from '@material-ui/core/FormControl';
// import ReactGA from 'react-ga';
// import {uploadsURL} from '../../constants';
// import axios from 'axios'
// import {connect} from 'react-redux'
// import { CardLoader,  FollowUserButton, FavoriteAction, RepostAction} from '../common'
// import CardContent from '@material-ui/core/CardContent';
// import Typography from '@material-ui/core/Typography';
// import { virtualize, bindKeyboard } from 'react-swipeable-views-utils';
// // import { mod } from 'react-swipeable-views-core';

// // const AutoPlaySwipeableViews = autoPlay(SwipeableViews);
// const EnhancedSwipeableViews = bindKeyboard(autoPlay(virtualize(SwipeableViews)));
// // const VirtualizeSwipeableViews = bindKeyboard(virtualize(SwipeableViews))


// // TODO: Remember to Implement the backend to resize images to a size of 400px by 500px

// const useStyles = makeStyles(theme => ({
//   card: {
//     maxWidth: '99%',
//     //minHeight: '100%',
//     maxHeight: 800,
//     transition: "0.01s",
//     margin: 'auto',
//     justify: "center",
//     borderRadius: "30px",
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginTop: 20,
//     boxShadow: "0 8px 40px -12px rgba(0,0,0,0.3)",
//     "&:hover": {
//       boxShadow: "0 16px 70px -12.125px rgba(0,0,0,0.3)"
//     }
//   },
//   avatar: {
//     backgroundColor: red[500],
//   },
//   img: {
//     height: 350,
//     display: 'block',
//     overflow: 'hidden',
//     maxWidth: '95%',
//     alignItems: 'center',
//     padding: '5px',
//     margin: 'auto',
//     borderRadius: '10px',
//     position: "static",
//   },
//   menuLink: {
//     textDecoration: 'none',
//     color: '#e91e63'
//   }
// }));

// function MobileCard(props) {
//   const classes = useStyles();
//   const theme = useTheme();
//   const [activeStep, setActiveStep] = React.useState(0);
//   const [autoplay, setAutoplay] = useState(false)
//   const [checked, setChecked] = React.useState(false);
//   const [ isLoading, setIsLoading] = useState(false)
//   const [url, setNextUrl] = useState(uploadsURL);
//   const [loadingMore, setLoadingMore] = useState(false)
//   const [data, setData] = useState([]);
//   // const [url] = useState(uploadsURL);
//   const maxSteps = data.length;

//   console.log(maxSteps)

//   useEffect(() => {
//     return handleSwipe()
//   })

//   function handleSwipe() {
//     if (activeStep === maxSteps -1 ) {
//       fetchMoreData()
//     }
//   }

//   async function fetchData() {
//     setIsLoading(true)
//     axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
//     axios.defaults.xsrfCookieName = "csrftoken";
//     axios.defaults.headers = {
//       "Content-Type": "application/json",
//       Authorization: `Token ${props.token}`,
//     };
//     axios
//         .get(url)
//         .then(response => {
//           setIsLoading(false)
//           setNextUrl(response.data.next)
//           setData(response.data.results)
//         })
//         .catch(err => {
//           console.log(err)
//           setIsLoading(false)
//         })
//   }

//   async function fetchMoreData() {
//     setLoadingMore(true)
//     axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
//     axios.defaults.xsrfCookieName = "csrftoken";
//     axios.defaults.headers = {
//       "Content-Type": "application/json",
//       Authorization: `Token ${props.token}`,
//     };
//     axios
//         .get(url)
//         .then(response => {
//           setNextUrl(response.data.next)
//           setData([...data, ...response.data.results])
//           setLoadingMore(false)
//         })
//         .catch(err => {
//           console.log(err)
//           setLoadingMore(false)
//         })
//   }

//   useEffect(() => {
//       fetchData();
//   }, []);

//   const toggleChecked = () => {
//     setChecked(prev => !prev);
//     setAutoplay(prev => !prev);
//   };

//   const shareMeme = () => {
//     if (navigator.share) {
//       navigator.share({
//           title: 'Cool Meme',
//           text: 'Check out this meme on Shwaymemes — it rocks!',
//           url: `https://shwaymemes.com/upload/${data.id}`,
//       })
//         .then(() => {
//           ReactGA.event({
//             category: 'User',
//             action: 'Shared link to meme'
//           })}
//         )
//         .catch((error) => console.log('Error sharing', error));
//     }
//   }
  
//   const handleStepChange = step => {
//     setActiveStep(step);
//   };

//   const cardRenderer = () => {
//     return (
//       <Fragment>
//         { isLoading ? (<CardLoader />) : 
//         (data.map((step, index) => (
//           <div key={step.id}>
//               {Math.abs(activeStep - index) <= 2 ? (
//               <Card className={classes.card}>
//                 <CardHeader
//                   action={<FollowUserButton token={props.token} user={props.currentUser} step={step}/>}
//                   title={
//                     <Link to={`@${step.author_name}`} className={classes.menuLink}>
//                       <Button size="small" color="secondary">
//                         {step.author_name}
//                       </Button>
//                     </Link>
//                   }
//                 />
//                 <CardMedia 
//                   className={classes.img} 
//                   image={step.photo} 
//                   title="Meme" />
  
//                 <CardContent>
//                   <Typography variant="body2" color="textSecondary" component="p">
//                     {step.caption}
//                   </Typography>
//                 </CardContent>
//                 <CardActions>
//                   <FavoriteAction token={props.token} step={step}/>
//                   <RepostAction step={step}/>
//                   <IconButton aria-label="share" title="Share" onClick={shareMeme}>
//                     <ShareIcon />
//                   </IconButton>
                  
//                 </CardActions>
//               </Card>
//       ) : null}
//       </div>
//       )))}
//       </Fragment>
//     )
//   }

//   return (
//     <Fragment>
//       <FormControl>
//       <FormGroup>
//         <FormControlLabel
//           value="autoplay"
//           control={<Switch color="secondary" checked={checked} onChange={toggleChecked} />}
//           label="Autoplay"
//           labelPlacement="start"
//         />
//       </FormGroup>
//     </FormControl>
//     <EnhancedSwipeableViews
//         axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
//         index={activeStep}
//         onChangeIndex={handleStepChange}
//         enableMouseEvents
//         interval={3000}
//         autoplay={autoplay}
//         slideRenderer={cardRenderer}
//         // slideCount={maxSteps}
//     />

//     {/* <EnhancedSwipeableViews
//         axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
//         index={activeStep}
//         onChangeIndex={handleStepChange}
//         enableMouseEvents
//         interval={3000}
//         autoplay={autoplay}
//       >
//       { isLoading ? (<CardLoader />) : 
//       (data.map((step, index) => (
//         <div key={step.id}>
//             {Math.abs(activeStep - index) <= 2 ? (
//             <Card className={classes.card}>
//               <CardHeader
//                 action={<FollowUserButton token={props.token} user={props.currentUser} step={step}/>}
//                 title={
//                   <Link to={`@${step.author_name}`} className={classes.menuLink}>
//                     <Button size="small" color="secondary">
//                       {step.author_name}
//                     </Button>
//                   </Link>
//                 }
//               />
//               <CardMedia 
//                 className={classes.img} 
//                 image={step.photo} 
//                 title="Meme" />

//               <CardContent>
//                 <Typography variant="body2" color="textSecondary" component="p">
//                   {step.caption}
//                 </Typography>
//               </CardContent>
//               <CardActions>
//                 <FavoriteAction token={props.token} step={step}/>
//                 <RepostAction step={step}/>
//                 <IconButton aria-label="share" title="Share" onClick={shareMeme}>
//                   <ShareIcon />
//                 </IconButton>
                
//               </CardActions>
//             </Card>
//     ) : null}
//     </div>
//     )))}
//     </EnhancedSwipeableViews> */}
//     </Fragment>
//   );
// }

// const mapStateToProps = state => {
//   return {
//     token: state.auth.token,
//     currentUser: state.auth.username
//   };
// };


// export default connect(mapStateToProps)(MobileCard)