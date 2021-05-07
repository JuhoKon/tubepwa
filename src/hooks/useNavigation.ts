import { useDispatch, useSelector } from "react-redux";
import {
  HideBackdrop,
  HideMobilePlayer,
  ShowBackdrop,
  ShowMobilePlayer,
  SwapToScreen,
} from "../actions/navigationActions";
import { RootState } from "../types/interfaces";

function useNavigation(): {
  nav: RootState["nav"];
  setScreen: typeof setScreen;
  showBackdrop: typeof showBackdrop;
  hideBackdrop: typeof hideBackdrop;
  showMobilePlayer: typeof showMobilePlayer;
  hideMobilePlayer: typeof hideMobilePlayer;
} {
  const nav = useSelector((state: RootState) => state.nav);

  const dispatch = useDispatch();
  /**
   *
   * @param screen Which screen to show, e.g. Home Search or Settings (0,1,2):
   *
   * Dispatches an action which changes the screen.
   */
  const setScreen = (screen: number) => {
    dispatch(SwapToScreen(screen));
  };

  const showBackdrop = () => {
    dispatch(ShowBackdrop());
  };
  const hideBackdrop = () => {
    dispatch(HideBackdrop());
  };
  const showMobilePlayer = () => {
    dispatch(ShowMobilePlayer());
  };
  const hideMobilePlayer = () => {
    dispatch(HideMobilePlayer());
  };
  return {
    nav,
    setScreen,
    showBackdrop,
    hideBackdrop,
    showMobilePlayer,
    hideMobilePlayer,
  };
}

export default useNavigation;
