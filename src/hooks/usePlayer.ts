import { useDispatch, useSelector } from "react-redux";
import {
  PausePlaying,
  PlaySong,
  ResumePlaying,
} from "../actions/playerActions";
import { setMediaSessionActionHandlers } from "../helpers/MediaSession";
import { RootState } from "../types/interfaces";

function usePlayer(): {
  player: RootState["player"];
  playSong: typeof playSong;
  resumePlay: typeof resumePlay;
  pausePlay: typeof pausePlay;
  initNavigator: typeof initNavigator;
} {
  const player = useSelector((state: RootState) => state.player);

  const dispatch = useDispatch();

  const playSong = (song: any) => {
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
  return { player, playSong, resumePlay, pausePlay, initNavigator };
}

export default usePlayer;
