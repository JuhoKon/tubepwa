import { useDispatch, useSelector } from "react-redux";
import { SwapToScreen } from "../actions/navigationActions";
import { RootState } from "../types/interfaces";

function useNavigation(): {
  nav: RootState["nav"];
  setScreen: (screen: number) => void;
} {
  const nav = useSelector((state: RootState) => state.nav);

  const dispatch = useDispatch();

  const setScreen = (screen: number) => {
    dispatch(SwapToScreen(screen));
  };
  return { nav, setScreen };
}

export default useNavigation;
