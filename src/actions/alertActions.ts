import { Color } from "@material-ui/lab/Alert";
import { PayloadAction } from "@reduxjs/toolkit";
import { AlertAction } from "../types/ActionTypes";
import * as types from "../types/types";
/**
 *
 * @param severity From Material UI alert: severity can be error, warning, info, or success
 * @param alertText To be showed text
 */
export const ShowAlert = (
  severity: Color,
  alertText: string
): PayloadAction<AlertAction | undefined> => {
  return { type: types.SHOW_ALERT, payload: { severity, alertText } };
};
export const HideAlert = (): PayloadAction<AlertAction | undefined> => {
  return { type: types.HIDE_ALERT, payload: undefined };
};
