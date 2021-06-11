import { combineReducers } from 'redux';

import { userReducer } from './userReducer';
import { navigationReducer } from './navigationReducer';
import { alertReducer } from './alertReducer';
import { playerReducer } from './playerReducer';
import { playerTimeReducer } from './playerTimeReducer';
import { playListReducer } from './playlistReducer';

const reducers = {
  user: userReducer,
  nav: navigationReducer,
  alerts: alertReducer,
  player: playerReducer,
  playerTime: playerTimeReducer,
  playlist: playListReducer
};

export default combineReducers(reducers);
