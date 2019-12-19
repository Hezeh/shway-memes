import React, { Fragment, Suspense} from 'react';
import './App.css';
import {Switch, Route, Redirect} from 'react-router-dom';
import AppBar from './components/Appbar/Appbar';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
const Favorites = React.lazy(() => import ('./components/Favorites/Favorites'));
const Trending = React.lazy(() => import ('./components/Trending/Trending'));
const Login = React.lazy(() => import ('./components/Login/Login'));
const Register = React.lazy(() => import ('./components/Register/Register'));
const Aboutus = React.lazy(() => import ('./components/Aboutus/Aboutus'));
//const Settings = React.lazy(() => import ('./components/Settings/Settings'))
const Profile = React.lazy(() => import ('./components/Profile/Profile'))
const PageNotFound = React.lazy(() => import ('./components/PageNotFound/PageNotFound'))
const Search = React.lazy(() => import ('./components/Search/Search'))
const MainCard = React.lazy(() => import ('./components/MainCard/MainCard'))
//const Interests = React.lazy(() => import ('./components/Interests/Interests'))
const Subscriptions = React.lazy(() => import ('./components/Subscriptions/Subscriptions'))

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

const PrivateRoute = ({ component: Component, ...rest}) => {
    const authenticated = localStorage.getItem("token") !== null;
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
    return (
        <Fragment>
        <AppBar />
        
          <Suspense fallback={
          <div className={classes.root}>
            {/* <CircularProgress /> */}
            <CircularProgress color="secondary" />
          </div>}>
              <Switch>
                  <Route exact path="/" component={MainCard} />
                  <Route path="/favorites" component={Favorites} />
                  <Route path="/trending" component={Trending} />
                  <Route path="/register" component={Register}/>
                  <Route path="/login" component={Login}/>
                  <Route path="/aboutus" component={Aboutus}/>
                  <Route path="/profile" component={Profile}/>
                  <Route path="/search" component={Search}/>
                  <Route path="/subscriptions" component={Subscriptions}/>
                  <Route path="" component={PageNotFound}/>
              </Switch>
          </Suspense>
        
    </Fragment>

    )
}