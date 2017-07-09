export default class OwnerFactory {
  static create(ownerId, name) {
    return {
      ownerId,
      name,
    };
  }
}
