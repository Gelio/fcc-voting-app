import OptionFactory from './option-factory';

export default class PollFactory {
  static create(pollId, ownerId, title, options) {
    return {
      pollId,
      ownerId,
      title,
      options,
    };
  }

  static normalize(denormalizedPoll) {
    return PollFactory.create(
      denormalizedPoll.id,
      denormalizedPoll.owner.id,
      denormalizedPoll.title,
      denormalizedPoll.options.map(option =>
        OptionFactory.create(option.title, option.votesCount),
      ),
    );
  }

  static denormalize(owners, normalizedPoll) {
    return {
      pollId: normalizedPoll.get('pollId'),
      owner: owners.get(normalizedPoll.get('ownerId')).toJS(),
      title: normalizedPoll.get('title'),
      options: normalizedPoll.get('options').toJS(),
    };
  }
}
