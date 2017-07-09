import { fromJS, Map } from 'immutable';

import pollsReducer from './polls';
import {
  importPoll,
  vote,
  addOption,
  fetchPollsSuccess,
  fetchSinglePollSuccess,
} from '../actions/polls';

it('returns the initial state', () => {
  const state = pollsReducer(undefined, {});

  expect(state.toJS()).toEqual({});
});

it('imports a poll', () => {
  const initialState = fromJS({
    1: {
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
    },
  });

  const action = importPoll(
    2,
    3,
    'Test 3',
    [
      {
        votesCount: 0,
        title: 'A',
      },
      {
        votesCount: 1,
        title: 'B',
      },
    ],
    1,
  );

  const immutableState = pollsReducer(initialState, action);
  const state = immutableState.toJS();
  expect(state[2]).toEqual({
    pollId: 2,
    ownerId: 3,
    title: 'Test 3',
    options: [
      {
        votesCount: 0,
        title: 'A',
      },
      {
        votesCount: 1,
        title: 'B',
      },
    ],
    optionPicked: 1,
  });
});

it('adds a vote', () => {
  const initialState = fromJS({
    1: {
      pollId: 1,
      ownerId: 2,
      title: 'Test',
      options: [
        {
          votesCount: 1,
          title: 'Only option',
        },
      ],
      optionPicked: null,
    },
  });

  const action = vote('1', 0);

  const immutableState = pollsReducer(initialState, action);
  const state = immutableState.toJS();

  expect(state[1].options[0].votesCount).toEqual(2);
});

it('removes the vote before voting on another option', () => {
  const initialState = fromJS({
    1: {
      pollId: 1,
      ownerId: 2,
      title: 'Test',
      options: [
        {
          votesCount: 1,
          title: 'Only option',
        },
        {
          votesCount: 0,
          title: 'Only option or not',
        },
      ],
      optionPicked: 0,
    },
  });

  const action = vote('1', 1);

  const immutableState = pollsReducer(initialState, action);
  const state = immutableState.toJS();

  expect(state[1].options[0].votesCount).toEqual(0);
});

it('adds an option', () => {
  const initialState = fromJS({
    1: {
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
    },
  });

  const action = addOption('1', 'Not anymore');

  const immutableState = pollsReducer(initialState, action);
  const state = immutableState.toJS();

  const options = state[1].options;
  expect(options.length).toEqual(2);
  expect(options[1]).toEqual({
    votesCount: 0,
    title: 'Not anymore',
  });
});

it('merges polls after fetching them', () => {
  const initialState = Map();

  const polls = {
    1: {
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
    },
  };

  const action = fetchPollsSuccess(polls, [], {});

  const immutableState = pollsReducer(initialState, action);
  const state = immutableState.toJS();

  expect(state).toEqual(polls);
});

it('adds the polls after fetching a single one', () => {
  const initialState = Map();

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

  const immutableState = pollsReducer(initialState, action);
  const state = immutableState.toJS();

  expect(state).toEqual({
    1: poll,
  });
});
