import { Color } from "@material-ui/lab/Alert";

export type GenericObject = { [key: string]: any };
export interface RootState {
  user: UserState;
  nav: NavState;
  alerts: AlertState;
  player: PlayerState;
}
export interface UserState {
  loggingIn: boolean;
  loggedIn: boolean;
  token: string;
  error: string;
  user: GenericObject;
  userPlaylists: GenericObject[];
}
export interface NavState {
  currentScreen: number;
  showBottomNav: boolean;
  showMobilePlayer: boolean;
}
export interface AlertState {
  showAlert: boolean;
  alertText: string;
  severity: Color;
}

export interface PlayerState {
  currentSong: Song;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  loadingSong: boolean;
}

export type Config = {
  headers: {
    "Content-Type": string;
    "x-auth-token"?: string | undefined;
  };
};
export type User = {
  token: string;
  user: {
    id: string;
    name: string;
    role: string;
    _id: string;
  };
};

export interface Song {
  album: {
    id: string;
    name: string;
  };
  artists: Array<{
    id: string;
    name: string;
  }>;
  date: number;
  duration: string;
  resultType: string;
  scraped: boolean;
  thumbnail: string;
  title: string;
  uniqueId: number;
  videoId: string;
}
export type PlaylistResponse = {
  createdAt: string;
  name: string;
  owner: string;
  playlist: Song[];
  private: boolean;
  updatedAt: string;
  __v: number;
  _id: string;
};
// TODO: Album & artist request types... search types...
// Spotify requests and types...
