import { combineReducers } from "redux";
import { userReducer } from "./userReducer";
import { navigationReducer } from "./navigationReducer";
import { alertReducer } from "./alertReducer";
import { playerReducer } from "./playerReducer";
import { playerTimeReducer } from "./playerTimeReducer";

const reducers = {
  user: userReducer,
  nav: navigationReducer,
  alerts: alertReducer,
  player: playerReducer,
  playerTime: playerTimeReducer,
};

export default combineReducers(reducers);
