// redux
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';

// redux-thunk
import thunk from 'redux-thunk';

// router-redux
import createHistory from 'history/createBrowserHistory';
import {
  routerReducer,
  routerMiddleware,
} from 'react-router-redux';

import reducers from './reducers';

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

export {
  history,
  store,
};
