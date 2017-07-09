import { List } from 'immutable';

import visiblePollsReducer from './visible-polls';
import {
  setVisiblePolls,
  fetchPollsSuccess,
  fetchSinglePollSuccess,
} from '../actions/polls';

it('returns the initial state', () => {
  const state = visiblePollsReducer(undefined, {});

  expect(state.toJS()).toEqual([]);
});

it('sets visible polls', () => {
  const initialState = List([5]);
  const action = setVisiblePolls([1, 2, 3]);

  const state = visiblePollsReducer(initialState, action);

  expect(state.toJS()).toEqual([1, 2, 3]);
});

it('sets visible polls after fetching them', () => {
  const initialState = List([5]);
  const action = fetchPollsSuccess({}, [1, 2, 3], {});

  const state = visiblePollsReducer(initialState, action);

  expect(state.toJS()).toEqual([1, 2, 3]);
});

it('adds the single fetched poll', () => {
  const initialState = List([5]);
  const poll = {
    pollId: 1,
    ownerId: 2,
    title: 'Test',
    options: [
      {
        votesCount: 1,
        title: 'Only option',
      },
    ],
    optionPicked: 0,
  };

  const action = fetchSinglePollSuccess(poll, {});

  const state = visiblePollsReducer(initialState, action);

  expect(state.toJS()).toEqual([5, 1]);
});
