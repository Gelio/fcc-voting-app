import { Map } from 'immutable';
import {
  FETCH_POLLS_ERROR,
  FETCH_POLLS_REQUEST,
  FETCH_POLLS_SUCCESS,
  FETCH_SINGLE_POLL_ERROR,
  FETCH_SINGLE_POLL_REQUEST,
  FETCH_SINGLE_POLL_SUCCESS
} from '../actions/polls';

const FetchingStateFactory = {
  idle: () =>
    Map({
      isFetching: false,
      error: null
    }),
  error: error =>
    Map({
      isFetching: false,
      error
    }),
  pending: () =>
    Map({
      isFetching: true,
      error: null
    })
};

const defaultState = Map({
  polls: FetchingStateFactory.idle(),
  singlePoll: FetchingStateFactory.idle()
});

function fetchingStates(state = defaultState, action) {
  switch (action.type) {
    case FETCH_POLLS_ERROR:
      return state.set('polls', FetchingStateFactory.error(action.error));

    case FETCH_POLLS_REQUEST:
      return state.set('polls', FetchingStateFactory.pending());

    case FETCH_POLLS_SUCCESS:
      return state.set('polls', FetchingStateFactory.idle());

    case FETCH_SINGLE_POLL_ERROR:
      return state.set('singlePoll', FetchingStateFactory.error(action.error));

    case FETCH_SINGLE_POLL_REQUEST:
      return state.set('singlePoll', FetchingStateFactory.pending());

    case FETCH_SINGLE_POLL_SUCCESS:
      return state.set('singlePoll', FetchingStateFactory.idle());

    default:
      return state;
  }
}

export default fetchingStates;
