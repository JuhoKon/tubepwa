import * as types from "../types/types";
import * as contants from "../lib/constants";
const initialState = {
  currentSong: "",
  isPlaying: false,
  currentTime: 0,
};

export const alertReducer = (
  state = initialState,
  action: any
): typeof initialState => {
  switch (action.type) {
    case types.PLAY_SONG:
      return {
        ...state,
        currentSong: action.payload,
        currentTime: 0,
      };
    case types.RESUME_PLAY:
      return {
        ...state,
        isPlaying: true,
      };
    case types.PAUSE_SONG:
      return {
        ...state,
        isPlaying: false,
      };
    default:
      return state;
  }
};
