import { Box, Grid, makeStyles } from "@material-ui/core";
import React from "react";
import PlayCircleFilledRoundedIcon from "@material-ui/icons/PlayCircleFilledRounded";
import SkipNextRoundedIcon from "@material-ui/icons/SkipNextRounded";
import SkipPreviousRoundedIcon from "@material-ui/icons/SkipPreviousRounded";
import PauseCircleFilledRoundedIcon from "@material-ui/icons/PauseCircleFilledRounded";
import usePlayer from "../../../../hooks/usePlayer";

const useStyles = makeStyles({
  flexBoxMiddle: {
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    fontSize: "56px",
    padding: "0px",
    margin: "0px",
  },
});

export default function Controls() {
  const classes = useStyles();
  const {
    player,
    pausePlay,
    resumePlay,
    playNextTrack,
    playPrevTrack,
  } = usePlayer();
  return (
    <Grid container spacing={0} className={classes.flexBoxMiddle}>
      <Grid item xs={3}>
        <SkipPreviousRoundedIcon fontSize="inherit" onClick={playPrevTrack} />
      </Grid>
      <Grid item xs={3}>
        {player.isPlaying ? (
          <PauseCircleFilledRoundedIcon
            fontSize="inherit"
            onClick={pausePlay}
          />
        ) : (
          <PlayCircleFilledRoundedIcon
            fontSize="inherit"
            onClick={resumePlay}
          />
        )}
      </Grid>
      <Grid item xs={3}>
        <SkipNextRoundedIcon fontSize="inherit" onClick={playNextTrack} />
      </Grid>
    </Grid>
  );
}
