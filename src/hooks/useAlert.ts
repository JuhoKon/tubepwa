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
  setSuccessAlert: (msg: string) => void;
  setErrorAlert: (msg: string) => void;
  hideAlert: () => void;
} {
  const alerts = useSelector((state: RootState) => state.alerts);

  const dispatch = useDispatch();

  const setSuccessAlert = (msg: string) => {
    dispatch(ShowAlert(constants.SUCCESS_ALERT, msg));
  };
  const setErrorAlert = (msg: string) => {
    dispatch(ShowAlert(constants.ERROR_ALERT, msg));
  };
  const hideAlert = () => {
    dispatch(HideAlert());
  };
  return { alerts, setSuccessAlert, setErrorAlert, hideAlert };
}

export default useAlert;
