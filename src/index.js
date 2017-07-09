import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';

import * as firebase from 'firebase';

import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';

import './index.css';
import App from './App';
import { store, history } from './store';
import registerServiceWorker from './registerServiceWorker';

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

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root'),
);
registerServiceWorker();
