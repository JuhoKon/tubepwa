import { PayloadAction } from "@reduxjs/toolkit";
import { PlaylistAction } from "../types/ActionTypes";
import * as types from "../types/types";

const initialState = {
  playlists: [{} as PlaylistAction | null],
  selectedPlaylistId: "",
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
            name: action.payload.name,
            owner: action.payload.owner,
            songs: action.payload.songs,
            private: action.payload.private,
            updatedAt: action.payload.updatedAt,
            createdAt: action.payload.createdAt,
            __v: action.payload.__v,
          },
        ],
      };
    case types.SELECT_PLAYLIST:
      return {
        ...state,
        selectedPlaylistId: action.payload.selectedPlaylistId,
      };
    default:
      return state;
  }
};
