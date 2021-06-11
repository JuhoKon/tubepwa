import { LinearProgress, makeStyles } from "@material-ui/core";
import { useRef, useEffect } from "react";
import usePlayer from "../../../../hooks/usePlayer";
import usePlayerTime from "../../../../hooks/usePlayerTime";
import { LIGHT_GREY2, LIGHT } from "../../../../lib/theme";

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
  const intervalRef = useRef(0);
  const statusBarClasses = statusBarTheme();
  const { playerTime, getCurrentTime } = usePlayerTime();
  const { player } = usePlayer();
  useEffect(() => {
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
    if (playerTime.duration === 0 && playerTime.currentTime === 0) {
      return 0;
    } else {
      return (playerTime.currentTime / playerTime.duration) * 100;
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
