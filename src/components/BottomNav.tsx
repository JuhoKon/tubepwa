import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import HomeIcon from "@material-ui/icons/Home";
import SearchIcon from "@material-ui/icons/Search";
import SettingsIcon from "@material-ui/icons/Settings";
import useNavigation from "../hooks/useNavigation";
import { LIGHT_GREY, LIGHT_GREY2, GREY, LIGHT } from "../lib/theme";

const useStyles = makeStyles({
  stickToBottom: {
    width: "100%",
    position: "fixed",
    bottom: 0,
    background: LIGHT_GREY,
    borderTop: `2px solid ${GREY}`,
  },
  navigationAction: { color: LIGHT_GREY2 },
});

const navTheme = makeStyles({
  root: {
    color: LIGHT_GREY2,
    "&$selected": {
      color: LIGHT,
    },
  },
  selected: {},
});
/**
 *
 * @returns Bottom navigation bar. Controlling and showing the nav-bar is done via Redux.
 */
export default function BottomNav(): React.ReactNode {
  const classes = useStyles();
  const navClasses = navTheme();
  const { nav, setScreen } = useNavigation();
  if (!nav.showBottomNav) {
    return null;
  }
  return (
    <BottomNavigation
      value={nav.currentScreen}
      onChange={(event, newValue) => {
        setScreen(newValue);
      }}
      showLabels
      className={classes.stickToBottom}
    >
      <BottomNavigationAction
        label="Home"
        icon={<HomeIcon />}
        classes={navClasses}
      />
      <BottomNavigationAction
        label="Search"
        icon={<SearchIcon />}
        classes={navClasses}
      />
      <BottomNavigationAction
        label="Settings"
        icon={<SettingsIcon />}
        classes={navClasses}
      />
    </BottomNavigation>
  );
}
