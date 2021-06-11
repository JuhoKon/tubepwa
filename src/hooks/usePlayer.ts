import { useDispatch, useSelector } from 'react-redux';

import {
  PausePlaying,
  PlaySong,
  ResumePlaying,
  SeekTo,
  HideVisualization,
  ShowVisualization
} from '../actions/playerActions';
import AudioService from '../helpers/AudioService';
import { setMediaSessionActionHandlers } from '../helpers/MediaSession';
import { RootState, Song } from '../types/interfaces';

function usePlayer(): {
  player: RootState['player'];
  playSong: typeof playSong;
  resumePlay: typeof resumePlay;
  pausePlay: typeof pausePlay;
  initNavigator: typeof initNavigator;
  isPaused: typeof isPaused;
  playPrevTrack: typeof playPrevTrack;
  playNextTrack: typeof playNextTrack;
  seekTo: typeof seekTo;
  showVisualization: typeof showVisualization;
  hideVisualization: typeof hideVisualization;
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

  const seekTo = (value: number) => {
    dispatch(SeekTo(value));
  };
  const playPrevTrack = () => {
    console.log('NOT IMPLEMENTED YET');
  };
  const stopPlaying = () => {
    console.log('NOT IMPLEMENTED YET');
  };
  const playNextTrack = () => {
    console.log('NOT IMPLEMENTED YET');
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
  const isPaused = () => audioService.isPaused();

  const showVisualization = () => {
    dispatch(ShowVisualization());
  };
  const hideVisualization = () => {
    dispatch(HideVisualization());
  };
  return {
    player,
    playSong,
    resumePlay,
    pausePlay,
    initNavigator,
    isPaused,
    playNextTrack,
    playPrevTrack,
    seekTo,
    showVisualization,
    hideVisualization
  };
}
export default usePlayer;
