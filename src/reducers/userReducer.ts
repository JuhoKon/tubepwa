import { PayloadAction } from "@reduxjs/toolkit";
import { UserAction } from "../types/ActionTypes";
import { User } from "../types/interfaces";
import * as types from "../types/types";

const initialState = {
  loggingIn: false,
  loggedIn: false,
  token: "" as User["token"],
  error: "" as UserAction["error"],
  user: {} as User["user"],
  userPlaylists: [] as UserAction["playlists"],
};

export const userReducer = (
  state = initialState,
  action: PayloadAction<UserAction | undefined>
): typeof initialState => {
  switch (action.type) {
    case types.LOGIN_REQUEST:
      return {
        ...state,
        loggingIn: true,
      };
    case types.LOGIN_SUCCESS:
      return {
        ...state,
        loggingIn: false,
        loggedIn: true,
        error: "",
        token: action.payload?.user?.token,
        user: action.payload?.user?.user,
      };
    case types.LOGIN_FAILURE:
      return {
        ...state,
        loggingIn: false,
        loggedIn: false,
        error: action.payload?.error,
        user: undefined,
        userPlaylists: [],
      };
    case types.REGISTER_REQUEST:
      return {
        ...state,
        loggingIn: true,
      };
    case types.REGISTER_SUCCESS:
      return {
        ...state,
        loggingIn: false,
        loggedIn: true,
        error: "",
        token: action.payload?.user?.token,
        userPlaylists: [],
        user: action.payload?.user?.user,
      };
    case types.REGISTER_FAILURE:
      return {
        ...state,
        loggingIn: false,
        error: action.payload?.error,
      };
    case types.LOGOUT:
      return {
        loggingIn: false,
        loggedIn: false,
        token: "",
        error: "",
        user: undefined,
        userPlaylists: [],
      };

    case types.GET_USER_INFO_REQUEST:
      return {
        ...state,
      };
    case types.GET_USER_INFO_SUCCESS:
      return {
        ...state,
        userPlaylists: action.payload?.playlists,
      };
    case types.GET_USER_INFO_FAILURE:
      return {
        ...state,
        error: action.payload?.error,
      };
    default:
      return state;
  }
};
