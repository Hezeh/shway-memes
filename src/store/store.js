import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers/index';
import { loadingBarMiddleware } from 'react-redux-loading-bar'

const composeEnhances = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(rootReducer, 
    composeEnhances(
        applyMiddleware(
            thunk, 
            loadingBarMiddleware()  // managers loading bar
        )))

export default store;