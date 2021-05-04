import * as types from "../types/types";
import * as constants from "../lib/constants";
const initialState = {
  currentScreen: constants.SCREEN_1,
  showBottomNav: false,
};

export const navigationReducer = (state = initialState, action: any): any => {
  switch (action.type) {
    case types.CHANGING_SCREEN:
      return {
        ...state,
        currentScreen: action.payload,
      };
    case types.SHOW_BOTTOM_BAR:
      return {
        ...state,
        showBottomNav: true,
      };
    case types.CLOSE_BOTTOM_BAR:
      return {
        ...state,
        showBottomNav: false,
      };
    default:
      return state;
  }
};
