import { vote as firebaseVote } from '../firebase/polls';

export const IMPORT_POLL = 'IMPORT_POLL';
export function importPoll(pollId, ownerId, title, options, optionPicked) {
  return {
    type: IMPORT_POLL,
    pollId,
    ownerId,
    title,
    options,
    optionPicked,
  };
}

export const REMOVE_POLL = 'REMOVE_POLL';
export function removePoll(pollId) {
  return {
    type: REMOVE_POLL,
    pollId,
  };
}

export const VOTE = 'VOTE';
export function vote(pollId, optionId) {
  return async (dispatch) => {
    await firebaseVote(1, pollId, optionId);
    return dispatch({
      type: VOTE,
      pollId,
      optionId,
    });
  };
}

export const SET_VISIBLE_POLLS = 'SET_VISIBLE_POLLS';
export function setVisiblePolls(pollIds) {
  return {
    type: SET_VISIBLE_POLLS,
    pollIds,
  };
}

export const ADD_OPTION = 'ADD_OPTION';
export function addOption(pollId, title) {
  return {
    type: ADD_OPTION,
    pollId,
    title,
  };
}

// Fetching polls
export * from './polls/fetch-polls';

// Fetch single poll
export * from './polls/fetch-single-poll';
