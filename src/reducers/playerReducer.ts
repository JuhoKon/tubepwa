import * as types from "../types/types";
const initialState = {
  currentSong: null,
  isPlaying: false,
};

export const playerReducer = (
  state = initialState,
  action: any
): typeof initialState => {
  switch (action.type) {
    case types.PLAY_SONG:
      return {
        ...state,
        currentSong: action.payload,
        isPlaying: true,
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
