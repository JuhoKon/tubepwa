import { createMuiTheme } from "@material-ui/core/styles";
import { red } from "@material-ui/core/colors";

export const ORANGE = "#F6BA34";
export const BLACK = "#000000";
export const LIGHT_GREY = "#212121";
export const GREY = "#191414";
export const LIGHT = "#fff";
export const LIGHT_GREY2 = "#6b6b6b";
// Create a theme instance.
const theme = createMuiTheme({
  palette: {
    primary: {
      main: ORANGE,
    },
    secondary: {
      main: LIGHT,
    },
    error: {
      main: red.A400,
    },
    background: {
      default: GREY,
    },
  },
});

export default theme;
