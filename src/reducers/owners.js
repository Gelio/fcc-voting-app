import { Map, fromJS } from 'immutable';
import {
  ADD_OWNER,
  FETCH_POLLS_SUCCESS,
  FETCH_SINGLE_POLL_SUCCESS,
} from '../actions/polls';

const defaultState = Map();

function owners(state = defaultState, action) {
  switch (action.type) {
    case ADD_OWNER:
      return state.set(
        action.ownerId,
        Map({
          ownerId: action.ownerId,
          name: action.name,
        }),
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
