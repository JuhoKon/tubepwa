import { useDispatch, useSelector } from "react-redux";
import { HideAlert, ShowAlert } from "../actions/alertActions";
import * as constants from "../lib/constants";
import { RootState } from "../types/interfaces";
/**
 *
 * @returns useAlert - hook.
 *
 * Hook can be used to control the alerts, and get alerts current state.
 */
function useAlert(): {
  alerts: RootState["alerts"];
  setSuccessAlert: typeof setSuccessAlert;
  setErrorAlert: typeof setErrorAlert;
  hideAlert: typeof hideAlert;
} {
  const alerts = useSelector((state: RootState) => state.alerts);

  const dispatch = useDispatch();
  /**
   *
   * @param msg String to show on the success alert.
   *
   * Dispatches an action to show a success alert with specific message.
   */
  const setSuccessAlert = (msg: string) => {
    dispatch(ShowAlert(constants.SUCCESS_ALERT, msg));
  };

  /**
   *
   * @param msg String to show on the error alert.
   *
   * Dispatches an action to show an error alert with a specific message.
   */
  const setErrorAlert = (msg: string) => {
    dispatch(ShowAlert(constants.ERROR_ALERT, msg));
  };

  /**
   * Dispatches an action which attempts to hide any alerts.
   */
  const hideAlert = () => {
    dispatch(HideAlert());
  };
  return { alerts, setSuccessAlert, setErrorAlert, hideAlert };
}

export default useAlert;
