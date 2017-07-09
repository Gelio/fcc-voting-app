import { database } from 'firebase';
import OptionFactory from '../factories/option-factory';

export async function vote(userId, pollId, optionId) {
  const db = database();
  const pollVote = db.ref(`owners/${userId}/votes/${pollId}`);
  const hasVoted = await pollVote.once('value').then(snapshot => snapshot.val());

  if (hasVoted !== null) {
    db
      .ref(`polls/${pollId}/options/${hasVoted}/votesCount`)
      .transaction(votesCount => votesCount - 1);
  }

  db
    .ref(`polls/${pollId}/options/${optionId}/votesCount`)
    .transaction(votesCount => votesCount + 1);

  pollVote.set(optionId);
}

export function createPoll(ownerId, title, options) {
  const newPollRef = database().ref('polls').push();
  return newPollRef.set({
    pollId: newPollRef.key,
    ownerId,
    title,
    options: options.map(option => OptionFactory.create(option, 0)),
  });
}

export function createOwner(name) {
  const newOwnerRef = database().ref('owners').push();
  return newOwnerRef.set({
    ownerId: newOwnerRef.key,
    name,
    votes: {},
  });
}
