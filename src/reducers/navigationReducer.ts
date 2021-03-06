import { PayloadAction } from '@reduxjs/toolkit';

import * as types from '../types/types';
import * as constants from '../lib/constants';
import { NavigationAction } from '../types/ActionTypes';
const initialState = {
  currentScreen: constants.SCREENS_ENUM.HOME as NavigationAction['screen'],
  showBottomNav: false,
  showMobilePlayer: false
};

export const navigationReducer = (
  state = initialState,
  action: PayloadAction<NavigationAction | undefined>
): typeof initialState => {
  switch (action.type) {
    case types.CHANGING_SCREEN:
      return {
        ...state,
        currentScreen: action.payload?.screen
      };
    case types.SHOW_BOTTOM_BAR:
      return {
        ...state,
        showBottomNav: true
      };
    case types.CLOSE_BOTTOM_BAR:
      return {
        ...state,
        showBottomNav: false
      };
    case types.SHOW_MOBILEPLAYER:
      return {
        ...state,
        showMobilePlayer: true
      };
    case types.HIDE_MOBILEPLAYER:
      return {
        ...state,
        showMobilePlayer: false
      };
    default:
      return state;
  }
};
