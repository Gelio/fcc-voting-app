import { List, fromJS } from 'immutable';
import {
  ADD_POLL,
  REMOVE_POLL,
  VOTE,
  SET_VISIBLE_POLLS
} from '../actions/polls';

const defaultState = fromJS({
  polls: {},
  visiblePolls: []
});

function polls(state = defaultState, action) {
  switch (action.type) {
    case ADD_POLL:
      return state.updateIn(['polls', action.pollId], () =>
        fromJS({
          pollId: action.pollId,
          ownerId: action.ownerId,
          title: action.title,
          options: action.options
        })
      );

    case REMOVE_POLL:
      return state.deleteIn(['polls', action.pollId]);

    case VOTE:
      return state.updateIn(['polls', action.pollId, 'options'], options =>
        options.update(action.optionId, 0, x => x + 1)
      );

    case SET_VISIBLE_POLLS:
      return state.set('visiblePolls', List(action.pollIds));

    default:
      return state;
  }
}

export default polls;
