import { Color } from '@material-ui/lab/Alert';

import { Song, User, UserPlaylist } from './interfaces';

export type AlertAction = {
  severity?: Color;
  alertText?: string;
};
export type NavigationAction = {
  screen?: number;
};
export type PlayerAction = {
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

export type PlaylistAction = {
  createdAt?: string;
  name?: string;
  owner?: string;
  songs?: Song[];
  private?: boolean;
  updatedAt?: string;
  __v?: number;
  id?: string;
  selectedPlaylistId?: string;
};
