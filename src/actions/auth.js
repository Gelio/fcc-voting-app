export const SIGN_IN = 'SIGN_IN';
export function signIn(userId, username) {
  return {
    type: SIGN_IN,
    userId,
    username
  };
}

export const LOGOUT = 'LOGOUT';
export function logout() {
  return {
    type: LOGOUT
  };
}
