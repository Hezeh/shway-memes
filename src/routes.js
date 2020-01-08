import React, { Fragment, Suspense} from 'react';
import './App.css';
import {Switch, Route, Redirect} from 'react-router-dom';
// import AppBar from './components/Appbar/Appbar';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
const AppBar = React.lazy(() => import ('./components/Appbar/Appbar'))
// const Favorites = React.lazy(() => import ('./components/Favorites/Favorites'));
const Trending = React.lazy(() => import ('./components/Trending/Trending'));
const Login = React.lazy(() => import ('./components/Account/Login/Login'));
const Register = React.lazy(() => import ('./components/Account/Register/Register'));
const Aboutus = React.lazy(() => import ('./components/Aboutus/Aboutus'));
//const Settings = React.lazy(() => import ('./components/Settings/Settings'))
const Profile = React.lazy(() => import ('./components/Profile/Profile'))
const Error_404 = React.lazy(() => import ('./components/Errors/Error_404/Error_404'))
const Search = React.lazy(() => import ('./components/Search/Search'))
const MainCard = React.lazy(() => import ('./components/MainCard/MainCard'))
//const Interests = React.lazy(() => import ('./components/Interests/Interests'))
const Subscriptions = React.lazy(() => import ('./components/Subscriptions/Subscriptions'))
const ResetPassword = React.lazy(() => import ('./components/Account/ResetPassword/ResetPassword'))

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

const authenticated = localStorage.getItem("token") !== null;

const PrivateRoute = ({ component: Component, ...rest}) => {
    // const authenticated = localStorage.getItem("token") !== null;
    return (
        <Route 
          {...rest}
          render={props =>
            authenticated === true ? (
                <Component {...props} />
            ): (
                <Redirect 
                  to={{
                      pathname: "/login",
                      state: { from: props.location}
                  }}
                />
            )
        }
        />
    );
};



export default function BaseRouter() {
    const classes = useStyles();
    if (authenticated === true) {
      return (
        <Fragment>
          <AppBar />
          <Suspense fallback={
            <div className={classes.root}>
              <CircularProgress color="secondary" />
            </div>
          }>
            <Switch>
              <Route exact path="/" component={MainCard} />
              {/* <Route path="/favorites" component={Favorites} /> */}
              <Route path="/trending" component={Trending} />
              <Route path="/aboutus" component={Aboutus}/>
              <Route path="/profile" component={Profile}/>
              <Route path="/search" component={Search}/>
              <Route path="/subscriptions" component={Subscriptions}/>
              <Route path="" component={Error_404}/>
            </Switch>
          </Suspense>    
        </Fragment>
    )      
    } else {
      return (
        <Fragment>
          <Suspense fallback={
            <div className={classes.root}>
              <CircularProgress color="secondary" />
            </div>
          }>
          <Switch>
            <Route path="/register" component={Register}/>
            <Route path="/login" component={Login}/>
            <Route path="/resetpassword" component={ResetPassword}/>
            <Route path="" component={PrivateRoute}/>
          </Switch>
          </Suspense>
        </Fragment>
      )
    }
}