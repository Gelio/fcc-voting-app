export const SIGN_IN = 'SIGN_IN';
export function signIn(username) {
  return {
    type: SIGN_IN,
    username
  };
}

export const LOGOUT = 'LOGOUT';
export function logout() {
  return {
    type: LOGOUT
  };
}
