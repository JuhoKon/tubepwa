import { combineReducers } from "redux";
import { userReducer } from "./userReducer";
import { navigationReducer } from "./navigationReducer";
import { alertReducer } from "./alertReducer";
const reducers = {
  user: userReducer,
  nav: navigationReducer,
  alerts: alertReducer,
};

export default combineReducers(reducers);
