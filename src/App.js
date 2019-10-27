import React, { Fragment} from 'react';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { ThemeProvider} from '@material-ui/styles'
import {createMuiTheme} from '@material-ui/core/styles';
import './App.css';
import {Switch, Route, HashRouter as Router } from 'react-router-dom';
import Appbar from './components/Appbar/Appbar';
import MainCard from './components/MainCard/MainCard';
import Videos from './components/Videos/Videos';
import Message from './components/Message/Message';
import Favorites from './components/Favorites/Favorites';
import HotMemes from './components/HotMemes/HotMemes';
import AddMemes from './components/AddMemes/AddMemes';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Challenges from './components/Challenges/Challenges';
import Aboutus from './components/Aboutus/Aboutus';
import Settings from './components/Settings/Settings';
import Feedback from './components/Feedback/Feedback';
import Following from './components/Following/Following';
import Profile from './components/Profile/Profile';
import FrequentlyAskedQuestions from './components/Faqs/Faqs';
import PageNotFound from './components/Error404/Error404';
import Points from './components/Points/Points';
import Policy from './components/Policy/Policy';
import Search from './components/Search/Search';

const App = () => {

  const theme = createMuiTheme({
    palette: {
      type: 'dark'
    }
  })
  
  return (
    <Fragment>
      <ThemeProvider theme={theme}>
        <Appbar />
        <Switch>
          <Route exact path="/" component={MainCard} />
          <Route path="/videos" component={Videos} />
          <Route path="/messages" component={Message} />
          <Route path="/favorites" component={Favorites} />
          <Route path="/hotmemes" component={HotMemes} />
          <Route path="/addmemes" component={AddMemes}/>
          <Route path="/register" component={Register}/>
          <Route path="/login" component={Login}/>
          <Route path="/challenges" component={Challenges}/>
          <Route path="/aboutus" component={Aboutus}/>
          <Route path="/settings" component={Settings}/>
          <Route path="/feedback" component={Feedback}/>
          <Route path="/following" component={Following}/>
          <Route path="/profile" component={Profile}/>
          <Route path="/faqs" component={FrequentlyAskedQuestions}/>
          <Route path="/points" component={Points}/>
          <Route path="/policy" component={Policy}/>
          <Route path="/search" component={Search}/>
          <Route path="" component={PageNotFound}/>
        </Switch>
      </ThemeProvider>
    </Fragment>
  )
}

export default App;
