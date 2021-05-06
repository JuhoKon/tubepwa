import { useDispatch, useSelector } from "react-redux";
import { SwapToScreen } from "../actions/navigationActions";
import { RootState } from "../types/interfaces";

function useNavigation(): {
  nav: RootState["nav"];
  setScreen: typeof setScreen;
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

  return { nav, setScreen };
}

export default useNavigation;
