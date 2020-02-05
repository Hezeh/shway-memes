import React, { Fragment, Suspense, useEffect} from 'react';
import './App.css';
import {Switch, Route, Redirect} from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
const AppBar = React.lazy(() => import ('./components/Appbar/Appbar'))
const Trending = React.lazy(() => import ('./components/Trending/Trending'));
const Login = React.lazy(() => import ('./components/Account/Login/Login'));
const Register = React.lazy(() => import ('./components/Account/Register/Register'));
const Aboutus = React.lazy(() => import ('./components/Aboutus/Aboutus'));
const Profile = React.lazy(() => import ('./components/Profile/Profile'))
const Error_404 = React.lazy(() => import ('./components/Errors/Error_404/Error_404'))
const Search = React.lazy(() => import ('./components/Search/Search'))
const MainCard = React.lazy(() => import ('./components/MainCard/MainCard'))
const Subscriptions = React.lazy(() => import ('./components/Subscriptions/Groups'))
const ResetPassword = React.lazy(() => import ('./components/Account/ResetPassword/ResetPassword'))
// const Groups = React.lazy(() => import ('./components/Groups/Groups'))
const Upload = React.lazy(() => import ('./components/Upload/Upload'))

const useStyles = makeStyles(theme => ({
    root: {
      display: 'flex',
      '& > * + *': {
        marginLeft: theme.spacing(2),
      },
      margin: 'auto',
      padding: '200px'
    },
}));


export default function BaseRouter() {
    const classes = useStyles();
        return (
          <Fragment>
            <Suspense fallback={
              <div className={classes.root}>
                <CircularProgress color="secondary" />
              </div>
            }>
            <AppBar />
              <Switch>
                <Route exact path="/" component={MainCard} />
                <Route path="/trending" component={Trending} />
                <Route path="/aboutus" component={Aboutus}/>
                <Route path="/profile" component={Profile}/>
                <Route path="/search" component={Search}/>
                {/* <PrivateRoute path="/@:username" component={Profile}/> */}
                {/* <PrivateRoute path="/@:username/favorites" component={Profile}/> */}
                {/* <Route path="/groups" component={Groups}/> */}
                <Route path="/groups" component={Subscriptions}/>
                <Route path="/home" component={Upload}/>
                <Route exact path="/register" component={Register}/>
                <Route exact path="/login" component={Login}/>
                <Route exact path="/resetpassword" component={ResetPassword}/>
                {/* <Redirect from="/login" to="/" />
                <Redirect from="/register" to="/" /> */}
                <Route path="*" component={Error_404}/>
              </Switch>
            </Suspense>    
          </Fragment>
      )  
}    


// const authenticated = localStorage.getItem("token") !== null;

// const PrivateRoute = ({ component: Component, ...rest}) => {
//     // const authenticated = localStorage.getItem("token") !== null;
//     return (
//         <Route 
//           {...rest}
//           render={props =>
//             authenticated === true ? (
//                 <Component {...props} />
//             ): (
//                 <Redirect 
//                   to={{
//                       pathname: "/login",
//                       state: { from: props.location}
//                   }}
//                 />
//             )
//         }
//         />
//     );
// };


// export default function BaseRouter() {
//     const classes = useStyles();

//     const authenticatedView = () => {
//       if (authenticated) {
//         return (
  
//           <Fragment>
//             <Suspense fallback={
//               <div className={classes.root}>
//                 <CircularProgress color="secondary" />
//               </div>
//             }>
//             <AppBar />
  
//               <Switch>
//                 <Route exact path="/" component={MainCard} />
//                 <Route path="/trending" component={Trending} />
//                 <Route path="/aboutus" component={Aboutus}/>
//                 {/* <Route path="/profile" component={Profile}/> */}
//                 <Route path="/search" component={Search}/>
//                 {/* <PrivateRoute path="/@:username" component={Profile}/> */}
//                 {/* <PrivateRoute path="/@:username/favorites" component={Profile}/> */}
//                 <Route path="/groups" component={Groups}/>
//                 <Route path="/subscriptions" component={Subscriptions}/>
//                 <Route path="/home" component={Upload}/>
//                 <Redirect from="/login" to="/" />
//                 <Redirect from="/register" to="/" />
//                 <Route path="*" component={Error_404}/>
//               </Switch>
//             </Suspense>    
//           </Fragment>
//       )      
//       } else {
//         return (
//           <Fragment>
//             <Suspense fallback={
//               <div className={classes.root}>
//                 <CircularProgress color="secondary" />
//               </div>
//             }>
//             <Switch>
//               <Route exact path="/register" component={Register}/>
//               <Route exact path="/login" component={Login}/>
//               <Route exact path="/resetpassword" component={ResetPassword}/>
//               {/* <Redirect from="/" to="/login" /> */}
//               {/* <Route path="*" component={PrivateRoute}/> */}
//             </Switch>
//             </Suspense>
//           </Fragment>
//         )
//       }

//     }
//     return (
//       <div>
//         {authenticatedView()}
//       </div>
//     )   
// }
