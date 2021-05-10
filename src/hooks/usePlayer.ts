import { useDispatch, useSelector } from "react-redux";
import {
  PausePlaying,
  PlaySong,
  ResumePlaying,
  GetCurrentTime,
  GetCurrentSongDuration,
} from "../actions/playerActions";
import AudioService from "../helpers/AudioService";
import { setMediaSessionActionHandlers } from "../helpers/MediaSession";
import { RootState, Song } from "../types/interfaces";

function usePlayer(): {
  player: RootState["player"];
  playSong: typeof playSong;
  resumePlay: typeof resumePlay;
  pausePlay: typeof pausePlay;
  initNavigator: typeof initNavigator;
  getCurrentTime: typeof getCurrentTime;
  getCurrentSongDuration: typeof getCurrentSongDuration;
  isPaused: typeof isPaused;
  playPrevTrack: typeof playPrevTrack;
  playNextTrack: typeof playNextTrack;
  seekTo: typeof seekTo;
} {
  const audioService = AudioService.getInstance();

  const player = useSelector((state: RootState) => state.player);

  const dispatch = useDispatch();

  const playSong = (song: Song) => {
    dispatch(PlaySong(song));
  };
  const resumePlay = () => {
    dispatch(ResumePlaying());
  };

  const pausePlay = () => {
    dispatch(PausePlaying());
  };

  const seekTo = () => {
    console.log("NOT IMPLEMENTED YET");
  };
  const playPrevTrack = () => {
    console.log("NOT IMPLEMENTED YET");
  };
  const stopPlaying = () => {
    console.log("NOT IMPLEMENTED YET");
  };
  const playNextTrack = () => {
    console.log("NOT IMPLEMENTED YET");
  };

  const initNavigator = () => {
    setMediaSessionActionHandlers(
      resumePlay,
      pausePlay,
      seekTo,
      stopPlaying,
      playPrevTrack,
      playNextTrack
    );
  };

  const getCurrentTime = () => {
    dispatch(GetCurrentTime());
  };
  const getCurrentSongDuration = () => {
    dispatch(GetCurrentSongDuration());
  };
  const isPaused = () => {
    return audioService.isPaused();
  };
  return {
    player,
    playSong,
    resumePlay,
    pausePlay,
    initNavigator,
    getCurrentTime,
    getCurrentSongDuration,
    isPaused,
    playNextTrack,
    playPrevTrack,
    seekTo,
  };
}
export default usePlayer;
