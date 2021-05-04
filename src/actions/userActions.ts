import { Dispatch } from "redux";
import UserService from "../helpers/UserService";
import * as types from "../types/types";
import * as constants from "../lib/constants";
import * as AlertActions from "./alertActions";
import * as NavigationActions from "./navigationActions";

const userService = UserService.getInstance();
/**
 *
 * @param dispatch Dispatch-function from Redux store
 * @param email User's email
 * @param password User's password
 *
 * Attempts to login, depending on the success dispatches more actions required to handle the situation. E.g. showing alerts.
 */
export const Login = async (
  dispatch: Dispatch<any>,
  email: string,
  password: string
): Promise<void> => {
  dispatch({ type: types.LOGIN_REQUEST });
  userService
    .login(email, password)
    .then((user) => {
      dispatch({ type: types.LOGIN_SUCCESS, payload: user });
      NavigationActions.ShowBottomBar(dispatch);
      AlertActions.ShowAlert(
        dispatch,
        constants.SUCCESS_ALERT,
        constants.LOGIN_SUCCESS_TEXT
      );
    })
    .catch((e) => {
      dispatch({ type: types.LOGIN_FAILURE, payload: { error: e } });
      NavigationActions.CloseBottomBar(dispatch);
      AlertActions.ShowAlert(
        dispatch,
        constants.ERROR_ALERT,
        constants.LOGIN_ERROR_TEXT
      );
    });
};
/**
 *
 * @param dispatch Dispatch-function from Redux store
 *
 * Attempts to logout the user. Dispatches more actions if successfull.
 */
export const Logout = async (dispatch: Dispatch<any>): Promise<void> => {
  userService.logout();
  dispatch({ type: types.LOGOUT });
  NavigationActions.CloseBottomBar(dispatch);
};
/**
 *
 * @param dispatch Dispatch-function from Redux store
 * @param user_token User's auth token.
 *
 * Gets user information from the BE with the token. Updates state with the acquired data.
 */
export const GetUserInfo = async (
  dispatch: Dispatch<any>,
  user_token: string
): Promise<void> => {
  dispatch({ type: types.GET_USER_INFO_REQUEST });
  userService
    .getUserPlaylists(user_token)
    .then((playlists) => {
      dispatch({ type: types.GET_USER_INFO_SUCCESS, payload: { playlists } });
    })
    .catch((e) => {
      dispatch({ type: types.GET_USER_INFO_FAILURE, payload: { error: e } });
    });
};
/**
 *
 * @param dispatch Dispatch-function from Redux store
 * @param name User's username
 * @param email User's email
 * @param password User's password
 *
 * Attempts to create a new account with the provided information. Dispatches more actions based on the success. E.g. shows alerts.
 */
export const Register = async (
  dispatch: Dispatch<any>,
  name: string,
  email: string,
  password: string
): Promise<void> => {
  dispatch({ type: types.REGISTER_REQUEST });
  userService
    .register(name, email, password)
    .then((user) => {
      dispatch({ type: types.REGISTER_SUCCESS, payload: user });
      AlertActions.ShowAlert(
        dispatch,
        constants.SUCCESS_ALERT,
        constants.LOGIN_SUCCESS_TEXT
      );
      NavigationActions.ShowBottomBar(dispatch);
    })
    .catch((e) => {
      dispatch({ type: types.REGISTER_FAILURE, payload: e });
      AlertActions.ShowAlert(dispatch, constants.ERROR_ALERT, e);
    });
};
/**
 *
 * @param dispatch Dispatch-function from Redux store
 *
 * Fetches data from the localstorage, and attempts to update the Redux store. Confirms that the user has valid token.
 */
export const GetDataFromLocalStorageToRedux = async (
  dispatch: Dispatch<any>
): Promise<void> => {
  dispatch({ type: types.LOGIN_REQUEST });
  userService
    .checkLocalStorage(constants.USER_LOCAL_STORAGE_KEY)
    .then((user) => {
      if (!user) {
        dispatch({
          type: types.LOGIN_FAILURE,
          payload: constants.NO_TOKEN_ERROR,
        });
      }
      // Make sure that token is OK?
      // TODO!!
      dispatch({
        type: types.LOGIN_SUCCESS,
        payload: { data: user },
      });
      AlertActions.ShowAlert(
        dispatch,
        constants.SUCCESS_ALERT,
        constants.WELCOME_BACK_TEXT(user?.user?.name)
      );
      NavigationActions.ShowBottomBar(dispatch);
    })
    .catch((e) => {
      console.log(e);
      dispatch({ type: types.LOGIN_FAILURE, payload: e });
    });
};
