import fetch from 'isomorphic-fetch';

export const ADD_POLL = 'ADD_POLL';
export function addPoll(pollId, ownerId, title, options) {
  return {
    type: ADD_POLL,
    pollId,
    ownerId,
    title,
    options
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

    return fetch('http://beta.json-generator.com/api/json/get/NkS8ZNzVm')
      .then(response => response.json())
      .then(body => {
        const polls = {};
        const visiblePolls = [];
        const owners = {};

        for (const poll of body) {
          polls[poll.id] = {
            pollId: poll.id,
            ownerId: poll.owner.id,
            title: poll.title,
            options: poll.options
          };
          visiblePolls.push(poll.id);
          owners[poll.owner.id] = {
            ownerId: poll.owner.id,
            name: poll.owner.name
          };
        }

        return dispatch(fetchPollsSuccess(polls, visiblePolls, owners));
      })
      .catch(error => dispatch(fetchPollsError(error)));
  };
}
