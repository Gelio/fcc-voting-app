export const SIGN_IN_BEGIN = 'SIGN_IN_BEGIN';
export function signInBegin(userId) {
  return {
    type: SIGN_IN_BEGIN,
    userId,
  };
}

export const LOGOUT_BEGIN = 'LOGOUT_BEGIN';
export function logoutBegin() {
  return {
    type: LOGOUT_BEGIN,
  };
}
