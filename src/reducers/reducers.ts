import { combineReducers } from "redux";
import { userReducer } from "./userReducer";
import { navigationReducer } from "./navigationReducer";
import { alertReducer } from "./alertReducer";
import { playerReducer } from "./playerReducer";
const reducers = {
  user: userReducer,
  nav: navigationReducer,
  alerts: alertReducer,
  player: playerReducer,
};

export default combineReducers(reducers);
