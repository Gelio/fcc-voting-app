import { fromJS } from 'immutable';
import { SIGN_IN_BEGIN, LOGOUT_BEGIN } from '../actions/auth';

const defaultState = fromJS({
  authenticated: false,
  userId: null,
  username: null,
});

function auth(state = defaultState, action) {
  switch (action.type) {
    case SIGN_IN_BEGIN:
      return state.merge({
        authenticated: true,
        userId: action.userId,
        username: action.username,
      });

    case LOGOUT_BEGIN:
      return state.merge({
        authenticated: false,
        userId: null,
        username: null,
      });

    default:
      return state;
  }
}

export default auth;
