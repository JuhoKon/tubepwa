import { Dispatch } from "redux";
import { GenericObject } from "../types/interfaces";
import * as types from "../types/types";
/**
 *
 * @param severity From Material UI alert: severity can be error, warning, info, or success
 * @param alertText To be showed text
 */
export const ShowAlert = (
  severity: string,
  alertText: string
): GenericObject => {
  return { type: types.SHOW_ALERT, payload: { severity, alertText } };
};
export const HideAlert = (): GenericObject => {
  return { type: types.HIDE_ALERT };
};
