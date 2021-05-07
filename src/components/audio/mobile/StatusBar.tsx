import { LinearProgress, makeStyles } from "@material-ui/core";
import React from "react";
import usePlayer from "../../../hooks/usePlayer";
import { LIGHT_GREY2, LIGHT } from "../../../lib/theme";

const statusBarHeight = 1;

const statusBarTheme = makeStyles({
  root: {
    height: `${statusBarHeight}px`,
  },
  colorPrimary: {
    backgroundColor: LIGHT_GREY2,
  },
  barColorPrimary: {
    backgroundColor: LIGHT,
  },
});

export const StatusBar = (): JSX.Element => {
  const intervalRef = React.useRef(0);
  const statusBarClasses = statusBarTheme();
  const { player, getCurrentTime } = usePlayer();

  React.useEffect(() => {
    if (intervalRef.current !== 0) {
      clearInterval(intervalRef.current);
    }
    if (player.isPlaying) {
      intervalRef.current = window.setInterval(() => {
        getCurrentTime();
      }, 200);
    }
    return function cleanUp() {
      if (intervalRef.current !== 0) {
        clearInterval(intervalRef.current);
      }
    };
  }, [getCurrentTime, player.isPlaying]);

  const getValue = (): number => {
    if (player.duration === 0 && player.currentTime === 0) {
      return 0;
    } else {
      return (player.currentTime / player.duration) * 100;
    }
  };
  return (
    <LinearProgress
      variant="determinate"
      value={getValue()}
      classes={statusBarClasses}
    />
  );
};
