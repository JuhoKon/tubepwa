import * as types from "../types/types";
import * as contants from "../lib/constants";
import { PayloadAction } from "@reduxjs/toolkit";
import { AlertAction } from "../types/ActionTypes";

const initialState = {
  showAlert: false,
  alertText: "",
  severity: contants.SUCCESS_ALERT,
};

export const alertReducer = (
  state = initialState,
  action: PayloadAction<AlertAction | undefined>
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
