import { Map } from 'immutable';

import authReducer from './auth';
import { signInBegin, logoutBegin } from '../actions/auth';

it('returns the initial state', () => {
  const state = authReducer(undefined, { });
  expect(state.toJS()).toEqual({
    authenticated: false,
    userId: null,
  });
});

it('signs in', () => {
  const initialState = Map({
    authenticated: false,
    userId: null,
  });

  const state = authReducer(initialState, signInBegin(1));

  expect(state.toJS()).toEqual({
    authenticated: true,
    userId: 1,
  });
});

it('logs out', () => {
  const initialState = Map({
    authenticated: true,
    userId: 1,
  });

  const state = authReducer(initialState, logoutBegin(1));

  expect(state.toJS()).toEqual({
    authenticated: false,
    userId: null,
  });
});
