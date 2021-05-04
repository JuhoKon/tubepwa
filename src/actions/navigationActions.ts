import { Dispatch } from "redux";
import * as types from "../types/types";
/**
 *
 * @param dispatch Dispatch-function from Redux store
 * @param screen Which screen to swap to (in numbers. 0, 1, or 2)
 */
export const SwapToScreen = async (
  dispatch: Dispatch<any>,
  screen: number
): Promise<void> => {
  dispatch({ type: types.CHANGING_SCREEN, payload: screen });
};
/**
 *
 * @param dispatch Dispatch-function from Redux store
 * Shows the bottom-navigation bar.
 */
export const ShowBottomBar = async (dispatch: Dispatch<any>): Promise<void> => {
  dispatch({ type: types.SHOW_BOTTOM_BAR });
};
/**
 *
 * @param dispatch Dispatch-function from Redux store
 * Closes/hides the bottom-navigation bar
 */
export const CloseBottomBar = async (
  dispatch: Dispatch<any>
): Promise<void> => {
  dispatch({ type: types.CLOSE_BOTTOM_BAR });
};
