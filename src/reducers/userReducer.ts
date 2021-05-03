import * as types from "../types/types";

const initialState = {
  loggingIn: false,
  loggedIn: false,
  token: "",
  error: "",
  user: {},
  userPlaylists: [],
};

export const userReducer = (state = initialState, action: any) => {
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
        token: action.payload.data.token,
        user: action.payload.data.user,
      };
    case types.LOGIN_FAILURE:
      return {
        ...state,
        loggingIn: false,
        loggedIn: false,
        error: action.payload.error,
        user: "",
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
        token: action.payload,
        userId: action.payload.userId,
        userPlaylists: [],
      };
    case types.REGISTER_FAILURE:
      return {
        ...state,
        loggingIn: false,
        error: action.payload.error,
      };
    case types.LOGOUT:
      return {
        state,
      };

    case types.GET_USER_INFO_REQUEST:
      return {
        ...state,
      };
    case types.GET_USER_INFO_SUCCESS:
      return {
        ...state,
        userPlaylists: action.payload.playlists,
      };
    case types.GET_USER_INFO_FAILURE:
      return {
        ...state,
        error: action.payload.error,
      };
    default:
      return state;
  }
};
