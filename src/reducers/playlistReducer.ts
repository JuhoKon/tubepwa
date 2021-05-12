import { PayloadAction } from "@reduxjs/toolkit";
import { PlaylistAction } from "../types/ActionTypes";
import { Song } from "../types/interfaces";
import * as types from "../types/types";
const initialState = {
  playlists: [{} as PlaylistAction | null],
};

export const playListReducer = (
  state = initialState,
  action: PayloadAction<PlaylistAction | undefined>
): typeof initialState => {
  switch (action.type) {
    case types.ADD_PLAYLIST:
      return {
        ...state,
        playlists: [
          ...state.playlists,
          {
            id: action.payload.id,
            owner: action.payload.owner,
            songs: action.payload.songs,
            private: action.payload.private,
            updatedAt: action.payload.updatedAt,
            createdAt: action.payload.createdAt,
            __v: action.payload.__v,
          },
        ],
      };

    default:
      return state;
  }
};
