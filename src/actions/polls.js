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
