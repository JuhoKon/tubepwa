import { PayloadAction } from "@reduxjs/toolkit";
import AudioService from "../helpers/AudioService";
import delay from "../helpers/Sleep";
import { Player } from "../types/ActionTypes";
import { Song } from "../types/interfaces";
import * as types from "../types/types";
const audioService = AudioService.getInstance();
/**
 *
 * @param song The song to play
 *
 * Uses AudioService to play a song, updates everything to the redux store.
 */
export const PlaySong = (song: Song): unknown => {
  return (dispatch: (arg0: PayloadAction<Player | undefined>) => void) => {
    dispatch({ type: types.PLAY_SONG_REQUEST, payload: undefined });
    audioService
      .playSong(song)
      .then(() => {
        dispatch({ type: types.PLAY_SONG_SUCCESS, payload: { song } });
        dispatch(GetCurrentSongDuration());
      })
      .catch((e) => {
        console.log(e);
        // TODO: dispatch error
      });
  };
};
/**
 * Uses AudioSerivce to resume playing a song.
 */
export const ResumePlaying = (): unknown => {
  audioService.resumePlaying();
  return (dispatch: (arg0: PayloadAction<Player | undefined>) => void) => {
    dispatch({ type: types.RESUME_PLAY, payload: undefined });
    delay(100).then(() => {
      const isPaused = audioService.isPaused();
      console.log(isPaused);
      if (isPaused) {
        dispatch({ type: types.PAUSE_SONG, payload: undefined });
      }
    });
  };
};
/**
 * Uses AudioService to pause a song.
 */
export const PausePlaying = (): PayloadAction<Player | undefined> => {
  audioService.pauseSong();
  return { type: types.PAUSE_SONG, payload: undefined };
};

export const GetCurrentTime = (): PayloadAction<Player | undefined> => {
  const currentTime = audioService.getCurrentSongCurrentTime();
  return { type: types.SONG_GET_CURRENTTIME, payload: { currentTime } };
};

export const GetCurrentSongDuration = (): PayloadAction<Player | undefined> => {
  const duration = audioService.getCurrentSongDuration();
  return { type: types.SONG_GET_DURATION, payload: { duration } };
};

export const SeekTo = (seekTo: number): PayloadAction<Player | undefined> => {
  audioService.seekTo(seekTo);
  return { type: types.SEEK_TO_REQUEST, payload: { seekTo } };
};

export const ShowVisualization = (): PayloadAction<Player | undefined> => {
  audioService.setVisualizationOn();
  return { type: types.SHOW_VISUALIZATION, payload: undefined };
};
export const HideVisualization = (): PayloadAction<Player | undefined> => {
  audioService.setVisualizationOff();
  return { type: types.HIDE_VISUALIZATION, payload: undefined };
};
