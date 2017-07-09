import { Map } from 'immutable';

import ownersReducer from './owners';
import {
  addOwner,
  fetchPollsSuccess,
  fetchSinglePollSuccess,
} from '../actions/polls';

it('returns the initial state', () => {
  const state = ownersReducer(undefined, {});

  expect(state.toJS()).toEqual({});
});

it('adds an owner', () => {
  const initialState = Map();

  const state = ownersReducer(initialState, addOwner(1, 'Test'));

  expect(state.toJS()).toEqual({
    1: {
      ownerId: 1,
      name: 'Test',
    },
  });
});

it('adds an owner after fetching polls', () => {
  const initialState = Map({
    3: {
      ownerId: 3,
      name: 'Test 3',
    },
  });

  const action = fetchPollsSuccess({}, [], {
    1: {
      ownerId: 1,
      name: 'Test',
    },
    2: {
      ownerId: 2,
      name: 'Test 2',
    },
  });

  const state = ownersReducer(initialState, action);

  expect(state.toJS()).toEqual({
    1: {
      ownerId: 1,
      name: 'Test',
    },
    2: {
      ownerId: 2,
      name: 'Test 2',
    },
    3: {
      ownerId: 3,
      name: 'Test 3',
    },
  });
});

it('adds an owner after fetching a single poll', () => {
  const initialState = Map({
    3: {
      ownerId: 3,
      name: 'Test 3',
    },
  });

  const action = fetchSinglePollSuccess(
    {},
    {
      ownerId: 2,
      name: 'Test 2',
    },
  );

  const state = ownersReducer(initialState, action);

  expect(state.toJS()).toEqual({
    2: {
      ownerId: 2,
      name: 'Test 2',
    },
    3: {
      ownerId: 3,
      name: 'Test 3',
    },
  });
});
