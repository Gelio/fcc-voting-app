export const SET_OWNER = 'SET_OWNER';
export function setOwner(ownerId, owner) {
  return {
    type: SET_OWNER,
    ownerId,
    owner,
  };
}
