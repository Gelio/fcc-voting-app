import fetch from 'isomorphic-fetch';
import { getOwnerFromPoll, getNormalizedPoll } from '../../utilities';

const apiDataUrl = 'http://beta.json-generator.com/api/json/get/NkS8ZNzVm';

export const FETCH_POLLS_REQUEST = 'FETCH_POLLS_REQUEST';
function fetchPollsRequest() {
  return {
    type: FETCH_POLLS_REQUEST,
  };
}

export const FETCH_POLLS_SUCCESS = 'FETCH_POLLS_SUCCESS';
function fetchPollsSuccess(polls, visiblePolls, owners) {
  return {
    type: FETCH_POLLS_SUCCESS,
    polls,
    visiblePolls,
    owners,
  };
}

export const FETCH_POLLS_ERROR = 'FETCH_POLLS_ERROR';
function fetchPollsError(error) {
  return {
    type: FETCH_POLLS_ERROR,
    error,
  };
}

export function fetchPolls() {
  return (dispatch) => {
    dispatch(fetchPollsRequest());

    return fetch(apiDataUrl)
      .then(response => response.json())
      .then((body) => {
        const polls = {};
        const visiblePolls = [];
        const owners = {};

        body.forEach((poll) => {
          polls[poll.id] = getNormalizedPoll(poll);
          visiblePolls.push(poll.id);
          owners[poll.owner.id] = getOwnerFromPoll(poll);
        });

        return dispatch(fetchPollsSuccess(polls, visiblePolls, owners));
      })
      .catch(error => dispatch(fetchPollsError(error)));
  };
}
