import AudioService from "../helpers/AudioService";
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
  audioService.playSong(song);
  return { type: types.PLAY_SONG, payload: song };
};
/**
 * Uses AudioSerivce to resume playing a song.
 */
export const ResumePlaying = (): unknown => {
  audioService.resumePlaying();
  return { type: types.RESUME_PLAY };
};
/**
 * Uses AudioService to pause a song.
 */
export const PausePlaying = (): unknown => {
  audioService.pauseSong();
  return { type: types.PAUSE_SONG };
};
