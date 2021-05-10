import { Box, CircularProgress, makeStyles } from "@material-ui/core";
import React from "react";
import usePlayer from "../../../../hooks/usePlayer";
import PlayArrowRoundedIcon from "@material-ui/icons/PlayArrowRounded";
import PauseRoundedIcon from "@material-ui/icons/PauseRounded";

const useStyles = makeStyles({
  flexBoxMiddle: {
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});

const BottomPlayerPlayControls = (): JSX.Element => {
  const classes = useStyles();
  const { player, pausePlay, resumePlay } = usePlayer();
  return (
    <Box
      className={classes.flexBoxMiddle}
      onClick={() => {
        if (player.isPlaying) {
          pausePlay();
        } else {
          resumePlay();
        }
      }}
    >
      {player.isPlaying ? (
        <PauseRoundedIcon color="secondary" fontSize="large" />
      ) : (
        <PlayArrowRoundedIcon color="secondary" fontSize="large" />
      )}
    </Box>
  );
};
export default BottomPlayerPlayControls;
