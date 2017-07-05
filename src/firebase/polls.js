import * as firebase from 'firebase';

export function vote(pollId, optionId, previousOptionId) {
  let promise = Promise.resolve();
  if (typeof previousOptionId !== 'undefined') {
    promise = firebase
      .database()
      .ref(`polls/${pollId}/options/${previousOptionId}/votesCount`)
      .transaction(votesCount => votesCount - 1);
  }

  return promise.then(() =>
    firebase
      .database()
      .ref(`polls/${pollId}/options/${optionId}`)
      .transaction(votesCount => votesCount + 1)
  );
}


export function createPoll(ownerId, title, options) {
  const newPollRef = firebase.database().ref('polls').push();
  return newPollRef.set({
    pollId: newPollRef.key,
    ownerId,
    title,
    options: options.map(option => ({ title: option, votesCount: 0 }))
  });
}
