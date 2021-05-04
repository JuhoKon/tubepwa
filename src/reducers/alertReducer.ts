import * as types from "../types/types";
import * as contants from "../lib/constants";
const initialState = {
  showAlert: false,
  alertText: "",
  severity: contants.SUCCESS_ALERT,
};

export const alertReducer = (
  state = initialState,
  action: any
): typeof initialState => {
  switch (action.type) {
    case types.SHOW_ALERT:
      return {
        ...state,
        showAlert: true,
        alertText: action.payload.alertText,
        severity: action.payload.severity,
      };
    case types.HIDE_ALERT:
      return {
        ...state,
        showAlert: false,
        alertText: "",
      };
    default:
      return state;
  }
};
