import { PayloadAction } from "@reduxjs/toolkit";
import PlaylistService from "../helpers/PlaylistService";
import { PlaylistAction } from "../types/ActionTypes";
import * as types from "../types/types";
const playlistService = PlaylistService.getInstance();

export const AddPlaylist = (playlistid: string): unknown => {
  return (
    dispatch: (arg0: PayloadAction<PlaylistAction | undefined>) => void
  ) => {
    playlistService.retrievePlaylistById(playlistid).then((playlist) => {
      console.log(playlist);
      dispatch({
        type: types.ADD_PLAYLIST,
        payload: {
          id: playlist._id,
          owner: playlist.owner,
          private: playlist.private,
          songs: playlist.playlist,
          createdAt: playlist.createdAt,
          updatedAt: playlist.updatedAt,
        },
      });
    });
  };
};
