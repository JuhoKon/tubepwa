import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import HomeIcon from "@material-ui/icons/Home";
import SearchIcon from "@material-ui/icons/Search";
import SettingsIcon from "@material-ui/icons/Settings";
import useNavigation from "../hooks/useNavigation";

const useStyles = makeStyles({
  stickToBottom: {
    width: "100%",
    position: "fixed",
    bottom: 0,
  },
});
/**
 *
 * @returns Bottom navigation bar. Controlling and showing the nav-bar is done via Redux.
 */
export default function BottomNav(): React.ReactNode {
  const classes = useStyles();
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
      <BottomNavigationAction label="Home" icon={<HomeIcon />} />
      <BottomNavigationAction label="Search" icon={<SearchIcon />} />
      <BottomNavigationAction label="Settings" icon={<SettingsIcon />} />
    </BottomNavigation>
  );
}