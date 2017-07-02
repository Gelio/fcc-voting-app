import { fromJS } from 'immutable';
import { SIGN_IN, LOGOUT } from '../actions/auth';

const defaultState = fromJS({
  authenticated: false,
  userId: null,
  username: null
});

function auth(state = defaultState, action) {
  switch (action.type) {
    case SIGN_IN:
      return state.merge({
        authenticated: true,
        userId: action.userId,
        username: action.username
      });

    case LOGOUT:
      return state.merge({
        authenticated: false,
        userId: null,
        username: null
      });

    default:
      return state;
  }
}

export default auth;
