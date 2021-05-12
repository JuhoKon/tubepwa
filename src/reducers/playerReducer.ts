import { PayloadAction } from "@reduxjs/toolkit";
import { Player } from "../types/ActionTypes";
import * as types from "../types/types";
const initialState = {
  currentSong: null,
  isPlaying: false,
  loadingSong: false,
  showVisualization: false,
};

export const playerReducer = (
  state = initialState,
  action: PayloadAction<Player | undefined>
): typeof initialState => {
  switch (action.type) {
    case types.PLAY_SONG_SUCCESS:
      return {
        ...state,
        currentSong: action.payload.song,
        isPlaying: true,
        loadingSong: false,
      };
    case types.PLAY_SONG_REQUEST:
      return {
        ...state,
        loadingSong: true,
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
    case types.SHOW_VISUALIZATION:
      return {
        ...state,
        showVisualization: true,
      };
    case types.HIDE_VISUALIZATION:
      return {
        ...state,
        showVisualization: false,
      };
    default:
      return state;
  }
};
