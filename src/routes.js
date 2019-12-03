import React, { Fragment, Suspense} from 'react';
import './App.css';
import {Switch, Route, Redirect} from 'react-router-dom';
import AppBar from './components/Appbar/Appbar';
import Following from './components/Following/Following';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary'
const Videos = React.lazy(() => import ('./components/Videos/Videos'));
const Message = React.lazy(() => import ('./components/Message/Message'));
const Favorites = React.lazy(() => import ('./components/Favorites/Favorites'));
const Trending = React.lazy(() => import ('./components/Trending/Trending'));
//import HotMemes from './components/HotMemes/HotMemes';
//const AddMemes = React.lazy(() => import ('./components/AddMemes/AddMemes'));
const Login = React.lazy(() => import ('./components/Login/Login'));
const Register = React.lazy(() => import ('./components/Register/Register'));
const Aboutus = React.lazy(() => import ('./components/Aboutus/Aboutus'));
const Settings = React.lazy(() => import ('./components/Settings/Settings'))
const Feedback = React.lazy(() => import ('./components/Feedback/Feedback'))
const Profile = React.lazy(() => import ('./components/Profile/Profile'))
const FrequentlyAskedQuestions = React.lazy(() => import ('./components/Faqs/Faqs'))
const PageNotFound = React.lazy(() => import ('./components/Error404/Error404'))
//const Points = React.lazy(() => import ('./components/Points/Points'))
const Policy = React.lazy(() => import ('./components/Policy/Policy'))
const Search = React.lazy(() => import ('./components/Search/Search'))
const MainCard = React.lazy(() => import ('./components/MainCard/MainCard'))
//const Trending = React.lazy(() => import ('./components/Challenges/Challenge'))
const Interests = React.lazy(() => import ('./components/Interests/Interests'))

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

const BaseRouter = () => (
    <Fragment>
        <AppBar />
        <ErrorBoundary>
          <Suspense fallback={<div>Loading...</div>}>
              <Switch>
                  <Route exact path="/" component={MainCard} />
                  <Route path="/videos" component={Videos} />
                  <PrivateRoute path="/messages" component={Message} />
                  <PrivateRoute path="/favorites" component={Favorites} />
                  <Route path="/trending" component={Trending} />
                  {/*<Route path="/addmemes" component={AddMemes}/>*/}
                  <Route path="/register" component={Register}/>
                  <Route path="/login" component={Login}/>
                  <PrivateRoute path="/challenges" component={Trending}/>
                  <Route path="/aboutus" component={Aboutus}/>
                  <Route path="/settings" component={Settings}/>
                  <PrivateRoute path="/feedback" component={Feedback}/>
                  <PrivateRoute path="/following" component={Following}/>
                  <PrivateRoute path="/profile" component={Profile}/>
                  <Route path="/faqs" component={FrequentlyAskedQuestions}/>
                  {/*<PrivateRoute path="/points" component={Points}/>*/}
                  <Route path="/policy" component={Policy}/>
                  <Route path="/search" component={Search}/>
                  <Route path="/interests" component={Interests}/>
                  <Route path="" component={PageNotFound}/>
              </Switch>
          </Suspense>
        </ErrorBoundary>
    </Fragment>
)

export default BaseRouter;