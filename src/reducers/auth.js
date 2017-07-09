import { Map } from 'immutable';
import { SIGN_IN_BEGIN, LOGOUT_BEGIN } from '../actions/auth';

const defaultState = Map({
  authenticated: false,
  userId: null,
});

function auth(state = defaultState, action) {
  switch (action.type) {
    case SIGN_IN_BEGIN:
      return state.merge({
        authenticated: true,
        userId: action.userId,
      });

    case LOGOUT_BEGIN:
      return state.merge({
        authenticated: false,
        userId: null,
      });

    default:
      return state;
  }
}

export default auth;
