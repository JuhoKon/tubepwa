import { Color } from "@material-ui/lab/Alert";
import { Song, User, UserPlaylist } from "./interfaces";

export type Alert = {
  severity?: Color;
  alertText?: string;
};
export type Navigation = {
  screen?: number;
};
export type Player = {
  song?: Song;
  seekTo?: number;
  currentTime?: number;
  duration?: number;
};
export type UserAction = {
  user?: User;
  error?: string;
  playlists?: UserPlaylist[];
};
