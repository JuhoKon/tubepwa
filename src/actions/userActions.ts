import UserService from "../helpers/UserService";
import * as types from "../types/types";

const userService = UserService.getInstance();

export const Login = async (dispatch, username: string, password: string) => {
  dispatch({ type: types.LOGIN_REQUEST });
  userService
    .login(username, password)
    .then((user) => {
      dispatch({ type: types.LOGIN_SUCCESS, payload: user });
    })
    .catch((e) => {
      dispatch({ type: types.LOGIN_FAILURE, payload: { error: e } });
    });
};
export const Logout = async (dispatch) => {
  dispatch({ type: types.LOGOUT });
};

export const GetUserInfo = async (dispatch, user_token: string) => {
  dispatch({ type: types.GET_USER_INFO_REQUEST });
  userService
    .getUserPlaylists(user_token)
    .then((playlists) => {
      console.log(playlists);
      dispatch({ type: types.GET_USER_INFO_SUCCESS, payload: { playlists } });
    })
    .catch((e) => {
      console.log("ERROR?????");
      console.log(e);
      dispatch({ type: types.GET_USER_INFO_FAILURE, payload: { error: e } });
    });
};
