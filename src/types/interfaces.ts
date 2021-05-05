import { Color } from "@material-ui/lab/Alert";

export type GenericObject = { [key: string]: any };
export interface RootState {
  user: UserState;
  nav: NavState;
  alerts: AlertState;
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
  showAlert: false;
  alertText: string;
  severity: Color;
}
