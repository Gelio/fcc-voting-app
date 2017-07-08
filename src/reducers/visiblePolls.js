import { List } from 'immutable';

import {
  SET_VISIBLE_POLLS,
  FETCH_POLLS_SUCCESS,
  FETCH_SINGLE_POLL_SUCCESS
} from '../actions/polls';

const defaultState = List();

function visiblePolls(state = defaultState, action) {
  switch (action.type) {
    case SET_VISIBLE_POLLS:
      return List(action.pollIds);

    case FETCH_POLLS_SUCCESS:
      return List(action.visiblePolls);

    case FETCH_SINGLE_POLL_SUCCESS:
      return state.push(action.poll.pollId);

    default:
      return state;
  }
}

export default visiblePolls;
