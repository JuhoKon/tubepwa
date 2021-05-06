import AudioService from "../helpers/AudioService";
import { GenericObject } from "../types/interfaces";
import * as types from "../types/types";
const audioService = AudioService.getInstance();

export const PlaySong = (song: any): GenericObject => {
  audioService.playSong("AHdd65cuAIE");
  return { type: types.PLAY_SONG, payload: song };
};

export const ResumePlaying = () => {
  audioService.resumePlaying();
  return { type: types.RESUME_PLAY };
};
export const PausePlaying = () => {
  audioService.pauseSong();
  return { type: types.PAUSE_SONG };
};
