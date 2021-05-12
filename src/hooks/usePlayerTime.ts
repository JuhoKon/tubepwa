import { useDispatch, useSelector } from "react-redux";
import {
  GetCurrentTime,
  GetCurrentSongDuration,
} from "../actions/playerActions";

import { RootState } from "../types/interfaces";

function usePlayerTime(): {
  playerTime: RootState["playerTime"];
  getCurrentTime: typeof getCurrentTime;
  getCurrentSongDuration: typeof getCurrentSongDuration;
} {
  const playerTime = useSelector((state: RootState) => state.playerTime);

  const dispatch = useDispatch();

  const getCurrentTime = () => {
    dispatch(GetCurrentTime());
  };
  const getCurrentSongDuration = () => {
    dispatch(GetCurrentSongDuration());
  };
  return {
    playerTime,
    getCurrentTime,
    getCurrentSongDuration,
  };
}
export default usePlayerTime;
