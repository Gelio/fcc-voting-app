import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import 'bootstrap/dist/css/bootstrap.css';

// Router
import { BrowserRouter } from 'react-router-dom';
import { Router, Route,  } from 'react-router';
import { routerReducer  } from 'react-router-redux';

// Redux
import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';
import reducers from './reducers';

const store = createStore(
  combineReducers({
  ...reducers
}));



ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();
