import { Map, List, fromJS } from 'immutable';
import {
  ADD_POLL,
  REMOVE_POLL,
  VOTE,
  SET_VISIBLE_POLLS,
  ADD_OWNER,
  FETCH_POLLS_BEGIN,
  FETCH_POLLS_ERROR,
  FETCH_POLLS_SUCCESS,
  FETCH_SINGLE_POLL_REQUEST,
  FETCH_SINGLE_POLL_ERROR,
  FETCH_SINGLE_POLL_SUCCESS
} from '../actions/polls';

const defaultState = fromJS({
  isFetching: false,
  fetchingError: null,
  polls: {},
  visiblePolls: [],
  owners: {}
});

function polls(state = defaultState, action) {
  switch (action.type) {
    case ADD_POLL:
      return state.updateIn(['polls', action.pollId], () =>
        fromJS({
          pollId: action.pollId,
          ownerId: action.ownerId,
          title: action.title,
          options: action.options,
          optionPicked: action.optionPicked || null
        })
      );

    case REMOVE_POLL:
      return state.deleteIn(['polls', action.pollId]);

    case VOTE:
      return state
        .updateIn(['polls', action.pollId, 'options'], options => {
          const previousOptionPicked = state.getIn([
            'polls',
            action.pollId,
            'optionPicked'
          ]);
          if (typeof previousOptionPicked !== 'undefined') {
            options = options.updateIn(
              [previousOptionPicked, 'votesCount'],
              x => x - 1
            );
          }

          return options.updateIn(
            [action.optionId, 'votesCount'],
            0,
            x => x + 1
          );
        })
        .setIn(['polls', action.pollId, 'optionPicked'], action.optionId);

    case SET_VISIBLE_POLLS:
      return state.set('visiblePolls', List(action.pollIds));

    case ADD_OWNER:
      return state.setIn(
        ['owners', action.ownerId],
        Map({
          ownerId: action.ownerId,
          name: action.name
        })
      );

    case FETCH_POLLS_BEGIN:
      return state.merge({
        isFetching: true,
        fetchingError: null
      });

    case FETCH_POLLS_ERROR:
      return state.merge({
        isFetching: false,
        fetchingError: action.error
      });

    case FETCH_POLLS_SUCCESS:
      return state.merge({
        isFetching: false,
        fetchingError: null,
        polls: state.get('polls').merge(action.polls),
        visiblePolls: List(action.visiblePolls),
        owners: state.get('owners').merge(action.owners)
      });

    case FETCH_SINGLE_POLL_REQUEST:
      return state.merge({
        isFetching: true,
        fetchingError: null
      });

    case FETCH_SINGLE_POLL_ERROR:
      return state.merge({
        isFetching: false,
        fetchingError: action.error
      });

    case FETCH_SINGLE_POLL_SUCCESS:
      return state.merge({
        isFetching: false,
        fetchingError: null,
        polls: state.get('polls').set(action.poll.pollId, fromJS(action.poll)),
        visiblePolls: state.get('visiblePolls').push(action.poll.pollId),
        owners: state
          .get('owners')
          .set(action.owner.ownerId, fromJS(action.owner))
      });

    default:
      return state;
  }
}

export default polls;
