import { Dispatch } from "redux";
import * as types from "../types/types";
/**
 *
 * @param screen Which screen to swap to (in numbers. 0, 1, or 2)
 */
export const SwapToScreen = (screen: number): any => {
  return { type: types.CHANGING_SCREEN, payload: screen };
};
/**
 *
 * Shows the bottom-navigation bar.
 */
export const ShowBottomBar = (): any => {
  return { type: types.SHOW_BOTTOM_BAR };
};
/**
 *
 * Closes/hides the bottom-navigation bar
 */
export const CloseBottomBar = (): any => {
  return { type: types.CLOSE_BOTTOM_BAR };
};
