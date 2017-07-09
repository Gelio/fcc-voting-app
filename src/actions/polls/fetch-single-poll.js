import fetch from 'isomorphic-fetch';

import { database } from 'firebase';

import { OwnerFactory, PollFactory } from '../../factories';

const apiDataUrl = 'http://beta.json-generator.com/api/json/get/NkS8ZNzVm';

export const FETCH_SINGLE_POLL_REQUEST = 'FETCH_SINGLE_POLL_REQUEST';
export function fetchSinglePollRequest() {
  return {
    type: FETCH_SINGLE_POLL_REQUEST,
  };
}

export const FETCH_SINGLE_POLL_SUCCESS = 'FETCH_SINGLE_POLL_SUCCESS';
export function fetchSinglePollSuccess(poll, owner) {
  return {
    type: FETCH_SINGLE_POLL_SUCCESS,
    poll,
    owner,
  };
}

export const FETCH_SINGLE_POLL_ERROR = 'FETCH_SINGLE_POLL_ERROR';
export function fetchSinglePollError(error) {
  return {
    type: FETCH_SINGLE_POLL_ERROR,
    error,
  };
}

export function fetchSinglePoll(pollId) {
  return async (dispatch) => {
    dispatch(fetchSinglePollRequest());

    let poll;
    try {
      poll = await database()
        .ref(`polls/${pollId}`)
        .once('value')
        .then(snapshot => snapshot.val());
    } catch (error) {
      return dispatch(fetchSinglePollError(error));
    }

    let owner;
    try {
      owner = await database()
        .ref(`owners/${poll.ownerId}`)
        .once('value')
        .then(snapshot => snapshot.val());
    } catch (error) {
      return dispatch(fetchSinglePollError(error));
    }

    return dispatch(fetchSinglePollSuccess(poll, owner));
  };
}
