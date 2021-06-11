export const BACKEND_URL = 'https://tubemusicbackend.herokuapp.com';
export const STREAM_URL = 'https://tubestream.herokuapp.com';
export const SUCCESS_ALERT = 'success';
export const ERROR_ALERT = 'error';
export const LOGIN_ERROR_TEXT = 'Please check your username and password!';
export const LOGIN_SUCCESS_TEXT = 'All good! ;)';
export const UNKNOWN_ERROR = 'Unknown error...';
export const USER_LOCAL_STORAGE_KEY = 'ab55467';
export const WELCOME_BACK_TEXT = (name = 'user'): string =>
  `Welcome back ${name}!`;
export const NO_TOKEN_ERROR = 'No token.';
export const INVALID_TOKEN_ERROR = 'Invalid token.';
export const PLEASE_LOGIN_MSG = 'Session expired. Please login again!';

export enum SCREENS_ENUM {
  'HOME' = 0,
  'SEARCH' = 1,
  'PLAYLISTS' = 2,
  'SETTINGS' = 3
}
export const ALERT_DURATION_MS = 2500;
/* UI */
export const bottomNavHeight = 56;
export const playerHeight = 56;
export const statusBarHeight = 1;
