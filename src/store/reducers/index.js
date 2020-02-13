import { combineReducers } from 'redux';
//import loadingBarReducer from './loadingBar'
import authReducer from './auth';
// import {loadingBarReducer } from 'react-redux-loading-bar'

const rootReducer = combineReducers({
    auth: authReducer,
    // loadingBar: loadingBarReducer
})

export default rootReducer;