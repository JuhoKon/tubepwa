import { createMuiTheme } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';

export const ORANGE = '#F6BA34';
export const BLACK = '#000000';
export const LIGHT_GREY = '#212121';
export const GREY = '#000000';
export const LIGHT = '#fff';
export const LIGHT_GREY2 = '#6b6b6b';

export const SKELETON_COLOR = '#454545';
export const CLICKED_BUTTON_COLOR = '#a4a4a4';
// Create a theme instance
const theme = createMuiTheme({
  palette: {
    primary: {
      main: ORANGE
    },
    secondary: {
      main: LIGHT
    },
    error: {
      main: red.A400
    },
    background: {
      default: GREY
    }
  },
  typography: {
    fontFamily: ['Open Sans', 'serif'].join(',')
  }
});

export default theme;
