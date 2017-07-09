import { Map, fromJS } from 'immutable';
import {
  FETCH_POLLS_SUCCESS,
  FETCH_SINGLE_POLL_SUCCESS,
} from '../actions/polls';
import { SET_OWNER } from '../actions/owners';

const defaultState = Map();

function owners(state = defaultState, action) {
  switch (action.type) {
    case SET_OWNER:
      return state.set(
        action.ownerId,
        Map(action.owner),
      );

    case FETCH_POLLS_SUCCESS:
      return state.merge(action.owners);

    case FETCH_SINGLE_POLL_SUCCESS:
      return state.set(action.owner.ownerId, fromJS(action.owner));

    default:
      return state;
  }
}

export default owners;
