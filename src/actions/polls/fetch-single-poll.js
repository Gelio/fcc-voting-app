import fetch from 'isomorphic-fetch';
import { getOwnerFromPoll, getNormalizedPoll } from '../../utilities';

const apiDataUrl = 'http://beta.json-generator.com/api/json/get/NkS8ZNzVm';

export const FETCH_SINGLE_POLL_REQUEST = 'FETCH_SINGLE_POLL_REQUEST';
function fetchSinglePollRequest() {
  return {
    type: FETCH_SINGLE_POLL_REQUEST,
  };
}

export const FETCH_SINGLE_POLL_SUCCESS = 'FETCH_SINGLE_POLL_SUCCESS';
function fetchSinglePollSuccess(poll, owner) {
  return {
    type: FETCH_SINGLE_POLL_SUCCESS,
    poll,
    owner,
  };
}

export const FETCH_SINGLE_POLL_ERROR = 'FETCH_SINGLE_POLL_ERROR';
function fetchSinglePollError(error) {
  return {
    type: FETCH_SINGLE_POLL_ERROR,
    error,
  };
}

export function fetchSinglePoll(pollId) {
  return (dispatch) => {
    dispatch(fetchSinglePollRequest());

    return fetch(apiDataUrl)
      .then(response => response.json())
      .then((body) => {
        const denormalizedPoll = body.find(poll => poll.id === pollId);
        const owner = getOwnerFromPoll(denormalizedPoll);
        const poll = getNormalizedPoll(denormalizedPoll);
        return dispatch(fetchSinglePollSuccess(poll, owner));
      })
      .catch(error => dispatch(fetchSinglePollError(error)));
  };
}
