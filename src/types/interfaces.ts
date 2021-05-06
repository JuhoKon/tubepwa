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
}
export interface AlertState {
  showAlert: boolean;
  alertText: string;
  severity: Color;
}

export interface PlayerState {
  currentSong: any;
  isPlaying: boolean;
  currentTime: any;
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
