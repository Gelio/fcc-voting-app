import fetch from 'isomorphic-fetch';
import { getOwnerFromPoll, getNormalizedPoll } from '../utilities';

const apiDataUrl = 'http://beta.json-generator.com/api/json/get/NkS8ZNzVm';

export const ADD_POLL = 'ADD_POLL';
export function addPoll(pollId, ownerId, title, options, optionPicked) {
  return {
    type: ADD_POLL,
    pollId,
    ownerId,
    title,
    options,
    optionPicked
  };
}

export const REMOVE_POLL = 'REMOVE_POLL';
export function removePoll(pollId) {
  return {
    type: REMOVE_POLL,
    pollId
  };
}

export const VOTE = 'VOTE';
export function vote(pollId, optionId) {
  return {
    type: VOTE,
    pollId,
    optionId
  };
}

export const SET_VISIBLE_POLLS = 'SET_VISIBLE_POLLS';
export function setVisiblePolls(pollIds) {
  return {
    type: SET_VISIBLE_POLLS,
    pollIds
  };
}

export const ADD_OWNER = 'ADD_OWNER';
export function addOwner(ownerId, name) {
  return {
    type: ADD_OWNER,
    ownerId,
    name
  };
}

export const ADD_OPTION = 'ADD_OPTION';
export function addOption(pollId, title) {
  return {
    type: ADD_OPTION,
    pollId,
    title
  };
}

// Fetching polls
export const FETCH_POLLS_BEGIN = 'FETCH_POLLS_BEGIN';
export function fetchPollsBegin() {
  return {
    type: FETCH_POLLS_BEGIN
  };
}

export const FETCH_POLLS_SUCCESS = 'FETCH_POLLS_SUCCESS';
export function fetchPollsSuccess(polls, visiblePolls, owners) {
  return {
    type: FETCH_POLLS_SUCCESS,
    polls,
    visiblePolls,
    owners
  };
}

export const FETCH_POLLS_ERROR = 'FETCH_POLLS_ERROR';
export function fetchPollsError(error) {
  return {
    type: FETCH_POLLS_ERROR,
    error
  };
}

export const FETCH_POLLS = 'FETCH_POLLS';
export function fetchPolls() {
  return dispatch => {
    dispatch(fetchPollsBegin());

    return fetch(apiDataUrl)
      .then(response => response.json())
      .then(body => {
        const polls = {};
        const visiblePolls = [];
        const owners = {};

        for (const poll of body) {
          polls[poll.id] = getNormalizedPoll(poll);
          visiblePolls.push(poll.id);
          owners[poll.owner.id] = getOwnerFromPoll(poll);
        }

        return dispatch(fetchPollsSuccess(polls, visiblePolls, owners));
      })
      .catch(error => dispatch(fetchPollsError(error)));
  };
}

// Fetch single poll
export const FETCH_SINGLE_POLL_REQUEST = 'FETCH_SINGLE_POLL_REQUEST';
export function fetchSinglePollRequest() {
  return {
    type: FETCH_SINGLE_POLL_REQUEST
  };
}

export const FETCH_SINGLE_POLL_SUCCESS = 'FETCH_SINGLE_POLL_SUCCESS';
export function fetchSinglePollSuccess(poll, owner) {
  return {
    type: FETCH_SINGLE_POLL_SUCCESS,
    poll,
    owner
  };
}

export const FETCH_SINGLE_POLL_ERROR = 'FETCH_SINGLE_POLL_ERROR';
export function fetchSinglePollError(error) {
  return {
    type: FETCH_SINGLE_POLL_ERROR,
    error
  };
}

export function fetchSinglePoll(pollId) {
  return dispatch => {
    dispatch(fetchSinglePollRequest());

    return fetch(apiDataUrl)
      .then(response => response.json())
      .then(body => {
        const denormalizedPoll = body.find(poll => poll.id === pollId);
        const owner = getOwnerFromPoll(denormalizedPoll);
        const poll = getNormalizedPoll(denormalizedPoll);
        return dispatch(fetchSinglePollSuccess(poll, owner));
      })
      .catch(error => dispatch(fetchSinglePollError(error)));
  };
}
