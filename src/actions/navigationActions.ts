import { PayloadAction } from "@reduxjs/toolkit";
import { Navigation } from "../types/ActionTypes";
import * as types from "../types/types";

/**
 *
 * @param screen Which screen to swap to (in numbers. 0, 1, or 2)
 */
export const SwapToScreen = (
  screen: number
): PayloadAction<Navigation | undefined> => {
  return { type: types.CHANGING_SCREEN, payload: { screen } };
};
/**
 *
 * Shows the bottom-navigation bar.
 */
export const ShowBottomBar = (): PayloadAction<Navigation | undefined> => {
  return { type: types.SHOW_BOTTOM_BAR, payload: undefined };
};
/**
 *
 * Closes/hides the bottom-navigation bar
 */
export const CloseBottomBar = (): PayloadAction<Navigation | undefined> => {
  return { type: types.CLOSE_BOTTOM_BAR, payload: undefined };
};

export const ShowMobilePlayer = (): PayloadAction<Navigation | undefined> => {
  return { type: types.SHOW_MOBILEPLAYER, payload: undefined };
};
export const HideMobilePlayer = (): PayloadAction<Navigation | undefined> => {
  return { type: types.HIDE_MOBILEPLAYER, payload: undefined };
};
