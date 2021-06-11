import { PayloadAction } from "@reduxjs/toolkit";
import { PlayerAction } from "../types/ActionTypes";
import * as types from "../types/types";

const initialState = {
  currentTime: 0 as PlayerAction["currentTime"],
  duration: 0 as PlayerAction["duration"],
};

export const playerTimeReducer = (
  state = initialState,
  action: PayloadAction<PlayerAction | undefined>
): typeof initialState => {
  switch (action.type) {
    case types.PLAY_SONG_SUCCESS:
      return {
        ...state,
        currentTime: 0,
      };
    case types.SONG_GET_CURRENTTIME:
      return {
        ...state,
        currentTime: action.payload?.currentTime,
      };
    case types.SONG_GET_DURATION:
      return {
        ...state,
        duration: action.payload?.duration,
      };
    default:
      return state;
  }
};
