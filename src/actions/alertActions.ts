import { Dispatch } from "redux";
import * as types from "../types/types";
/**
 *
 * @param dispatch Dispatch-function from Redux store
 * @param severity From Material UI alert: severity can be error, warning, info, or success
 * @param alertText To be showed text
 */
export const ShowAlert = async (
  dispatch: Dispatch<any>,
  severity: string,
  alertText: string
): Promise<void> => {
  dispatch({ type: types.SHOW_ALERT, payload: { severity, alertText } });
};
export const HideAlert = async (dispatch: Dispatch<any>): Promise<void> => {
  dispatch({ type: types.HIDE_ALERT });
};
