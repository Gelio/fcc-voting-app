export function denormalizePoll(owners, poll) {
  return poll && poll.set('owner', owners.get(poll.get('ownerId'))).toJS();
}

export function getOwnerFromPoll(denormalizedPoll) {
  return {
    ownerId: denormalizedPoll.owner.id,
    name: denormalizedPoll.owner.name
  };
}

export function getNormalizedPoll(poll) {
  return {
    pollId: poll.id,
    ownerId: poll.owner.id,
    title: poll.title,
    options: poll.options
  };
}
