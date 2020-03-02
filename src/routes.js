import React, { Fragment, Suspense} from 'react';
import './App.css';
import {Switch, Route, Redirect} from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
const AppBar = React.lazy(() => import ('./components/Appbar/Appbar'))
const Trending = React.lazy(() => import ('./components/Trending/Trending'));
const Login = React.lazy(() => import ('./components/Account/Login'));
const Register = React.lazy(() => import ('./components/Account/Register'));
const Aboutus = React.lazy(() => import ('./components/Aboutus/Aboutus'));
const Profile = React.lazy(() => import ('./components/Profile/Profile'))
const Error_404 = React.lazy(() => import ('./components/Errors/Error_404/Error_404'))
const Home = React.lazy(() => import ('./components/Home/Home'))
const Groups = React.lazy(() => import ('./components/Groups/Groups'))
const Group = React.lazy(() => import ('./components/Groups/GroupDetail/Group'))
const UploadDetail = React.lazy(() => import ('./components/Upload/UploadDetail'))

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
                <Route exact path="/" component={Home} />
                <Route path="/trending" component={Trending} />
                <Route path="/aboutus" component={Aboutus}/>
                {/* <Route path="/search" component={Search}/> */}
                <Route path="/@:username" component={Profile}/>
                <Route path="/group/:id" component={Group}/>
                <Route path="/groups" component={Groups}/>
                <Route exact path="/register" component={Register}/>
                <Route exact path="/login" component={Login}/>
                <Route exact path="/upload/:id" component={UploadDetail}/>
                {/* <Route exact path="/resetpassword" component={ResetPassword}/> */}
                <Redirect from="/logout" to="/login" />
                <Route path="*" component={Error_404}/>
              </Switch>
            </Suspense>    
          </Fragment>
      )  
}    
