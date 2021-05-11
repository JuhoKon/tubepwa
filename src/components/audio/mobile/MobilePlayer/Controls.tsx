import { Box, Grid, makeStyles } from "@material-ui/core";
import React from "react";
import PlayCircleFilledRoundedIcon from "@material-ui/icons/PlayCircleFilledRounded";
import SkipNextIcon from "@material-ui/icons/SkipNext";
import SkipPreviousIcon from "@material-ui/icons/SkipPrevious";
import PauseCircleFilledRoundedIcon from "@material-ui/icons/PauseCircleFilledRounded";
import usePlayer from "../../../../hooks/usePlayer";
import { CLICKED_BUTTON_COLOR } from "../../../../lib/theme";

const useStyles = makeStyles({
  flexBoxMiddle: {
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    fontSize: "48px",
    padding: "0px",
  },
  playBox: {
    fontSize: "68px",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    marginBottom: "-12px",
  },
  button: {
    "&:active": {
      color: CLICKED_BUTTON_COLOR,
    },
  },
});

export default function Controls(): JSX.Element {
  const classes = useStyles();
  const { player, pausePlay, resumePlay, playNextTrack, playPrevTrack } =
    usePlayer();
  return (
    <Grid container spacing={0} className={classes.flexBoxMiddle}>
      <Grid item xs={3}>
        <SkipPreviousIcon
          fontSize="inherit"
          onClick={playPrevTrack}
          className={classes.button}
        />
      </Grid>
      <Grid item xs={3}>
        <Box className={classes.playBox}>
          {player.isPlaying ? (
            <PauseCircleFilledRoundedIcon
              fontSize="inherit"
              onClick={pausePlay}
              className={classes.button}
            />
          ) : (
            <PlayCircleFilledRoundedIcon
              fontSize="inherit"
              onClick={resumePlay}
              className={classes.button}
            />
          )}
        </Box>
      </Grid>
      <Grid item xs={3}>
        <SkipNextIcon
          fontSize="inherit"
          onClick={playNextTrack}
          className={classes.button}
        />
      </Grid>
    </Grid>
  );
}
