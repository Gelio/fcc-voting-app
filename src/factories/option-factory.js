export default class OptionFactory {
  static create(title, votesCount) {
    return {
      title,
      votesCount,
    };
  }
}
