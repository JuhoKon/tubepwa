import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';

import {
  HideMobilePlayer,
  ShowMobilePlayer,
  SwapToScreen
} from '../actions/navigationActions';
import { RootState } from '../types/interfaces';

function useNavigation(): {
  nav: RootState['nav'];
  setScreen: typeof setScreen;
  showMobilePlayer: typeof showMobilePlayer;
  hideMobilePlayer: typeof hideMobilePlayer;
} {
  const router = useRouter();
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

  const showMobilePlayer = () => {
    router.push('/mobileplayer');
    dispatch(ShowMobilePlayer());
  };
  const hideMobilePlayer = () => {
    dispatch(HideMobilePlayer());
  };
  return {
    nav,
    setScreen,
    showMobilePlayer,
    hideMobilePlayer
  };
}

export default useNavigation;
