import * as types from "../types/types";
const initialState = {
  currentSong: null,
  isPlaying: false,
  currentTime: 0,
  duration: 0,
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
    case types.SONG_GET_CURRENTTIME:
      return {
        ...state,
        currentTime: action.payload,
      };
    case types.SONG_GET_DURATION:
      return {
        ...state,
        duration: action.payload,
      };
    default:
      return state;
  }
};
