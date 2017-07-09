import { database } from 'firebase';

export const FETCH_POLLS_REQUEST = 'FETCH_POLLS_REQUEST';
export function fetchPollsRequest() {
  return {
    type: FETCH_POLLS_REQUEST,
  };
}

export const FETCH_POLLS_SUCCESS = 'FETCH_POLLS_SUCCESS';
export function fetchPollsSuccess(polls, visiblePolls, owners) {
  return {
    type: FETCH_POLLS_SUCCESS,
    polls,
    visiblePolls,
    owners,
  };
}

export const FETCH_POLLS_ERROR = 'FETCH_POLLS_ERROR';
export function fetchPollsError(error) {
  return {
    type: FETCH_POLLS_ERROR,
    error,
  };
}

export function fetchPolls() {
  return async (dispatch) => {
    dispatch(fetchPollsRequest());

    let snapshot;
    try {
      snapshot = await database().ref('polls').limitToFirst(5).once('value');
    } catch (error) {
      return dispatch(fetchPollsError(error));
    }

    const polls = {};
    const visiblePolls = [];
    const ownersNeeded = [];

    snapshot.forEach((childSnapshot) => {
      const childValue = childSnapshot.val();
      polls[childValue.pollId] = childValue;
      visiblePolls.push(childValue.pollId);
      if (ownersNeeded.indexOf(childValue.ownerId) === -1) {
        ownersNeeded.push(childValue.ownerId);
      }
    });

    const ownersArray = await Promise.all(
      ownersNeeded.map(ownerId =>
        database().ref(`owners/${ownerId}`).once('value').then(x => x.val()),
      ),
    );

    const owners = ownersArray.reduce(
      (map, owner) =>
        Object.assign(map, {
          [owner.ownerId]: owner,
        }),
      {},
    );

    return dispatch(fetchPollsSuccess(polls, visiblePolls, owners));
  };
}
