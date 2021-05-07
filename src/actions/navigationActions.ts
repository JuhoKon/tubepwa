import delay from "../helpers/Sleep";
import * as types from "../types/types";
/**
 *
 * @param screen Which screen to swap to (in numbers. 0, 1, or 2)
 */
export const SwapToScreen = (screen: number): unknown => {
  return { type: types.CHANGING_SCREEN, payload: screen };
};
/**
 *
 * Shows the bottom-navigation bar.
 */
export const ShowBottomBar = (): unknown => {
  return { type: types.SHOW_BOTTOM_BAR };
};
/**
 *
 * Closes/hides the bottom-navigation bar
 */
export const CloseBottomBar = (): unknown => {
  return { type: types.CLOSE_BOTTOM_BAR };
};

export const ShowBackdrop = (): unknown => {
  return { type: types.SHOW_BACKDROP };
};
export const HideBackdrop = (): unknown => {
  return { type: types.HIDE_BACKDROP };
};
export const ShowMobilePlayer = (): unknown => {
  return (dispatch) => {
    dispatch(ShowBackdrop());
    dispatch({ type: types.SHOW_MOBILEPLAYER });
    delay(250).then(() => {
      dispatch(HideBackdrop());
    });
  };
};
export const HideMobilePlayer = (): unknown => {
  return { type: types.HIDE_MOBILEPLAYER };
};
