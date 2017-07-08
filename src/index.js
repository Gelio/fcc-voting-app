import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';


import * as firebase from 'firebase';

// redux
import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';

// redux-thunk
import thunk from 'redux-thunk';

// router-redux
import createHistory from 'history/createBrowserHistory';
import {
  ConnectedRouter,
  routerReducer,
  routerMiddleware,
} from 'react-router-redux';


import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import reducers from './reducers';

// Initialize Firebase
const config = {
  apiKey: 'AIzaSyBOYMcPGsljGvkgSdxmmM0ggY5heE0mMO8',
  authDomain: 'fcc-voting-app-cee77.firebaseapp.com',
  databaseURL: 'https://fcc-voting-app-cee77.firebaseio.com',
  projectId: 'fcc-voting-app-cee77',
  storageBucket: 'fcc-voting-app-cee77.appspot.com',
  messagingSenderId: '144857868047',
};
firebase.initializeApp(config);

const history = createHistory();

/* eslint-disable */
const store = createStore(
  combineReducers({
    ...reducers,
    router: routerReducer,
  }),
  compose(
    applyMiddleware(routerMiddleware(history), thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__
      ? window.__REDUX_DEVTOOLS_EXTENSION__()
      : f => f,
  ),
);
/* eslint-enable */

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root'),
);
registerServiceWorker();
