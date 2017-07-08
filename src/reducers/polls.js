import { Map, fromJS } from 'immutable';
import {
  ADD_POLL,
  REMOVE_POLL,
  VOTE,
  ADD_OPTION,
  FETCH_POLLS_SUCCESS,
  FETCH_SINGLE_POLL_SUCCESS,
} from '../actions/polls';

const defaultState = Map();

function polls(state = defaultState, action) {
  switch (action.type) {
    case ADD_POLL:
      return state.set(
        action.pollId,
        fromJS({
          pollId: action.pollId,
          ownerId: action.ownerId,
          title: action.title,
          options: action.options,
          optionPicked: action.optionPicked || null,
        }),
      );

    case REMOVE_POLL:
      return state.delete(action.pollId);

    case VOTE:
      return state
        .updateIn([action.pollId, 'options'], (options) => {
          const previousOptionPicked = state.getIn([
            action.pollId,
            'optionPicked',
          ]);

          let optionsModified = options;
          if (typeof previousOptionPicked !== 'undefined') {
            optionsModified = options.updateIn(
              [previousOptionPicked, 'votesCount'],
              x => x - 1,
            );
          }

          return optionsModified.updateIn(
            [action.optionId, 'votesCount'],
            0,
            x => x + 1,
          );
        })
        .setIn([action.pollId, 'optionPicked'], action.optionId);

    case ADD_OPTION:
      return state.updateIn([action.pollId, 'options'], options =>
        options.push(
          Map({
            votesCount: 0,
            title: action.title,
          }),
        ),
      );

    case FETCH_POLLS_SUCCESS:
      return state.merge(action.polls);

    case FETCH_SINGLE_POLL_SUCCESS:
      return state.set(action.poll.pollId, fromJS(action.poll));

    default:
      return state;
  }
}

export default polls;
