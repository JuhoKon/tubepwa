import { useDispatch, useSelector } from "react-redux";
import { SwapToScreen } from "../actions/navigationActions";

function useNavigation(): {
  nav: any;
  setScreen: (screen: number) => void;
} {
  const nav = useSelector((state: any) => state.nav);

  const dispatch = useDispatch();

  const setScreen = (screen: number) => {
    SwapToScreen(dispatch, screen);
  };
  return { nav, setScreen };
}

export default useNavigation;
