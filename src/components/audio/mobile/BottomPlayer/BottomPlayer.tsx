import { Box, Grid, makeStyles } from "@material-ui/core";
import React from "react";
import usePlayer from "../../../../hooks/usePlayer";
import {
  bottomNavHeight,
  playerHeight,
  statusBarHeight,
} from "../../../../lib/constants";
import { LIGHT_GREY, LIGHT, LIGHT_GREY2 } from "../../../../lib/theme";
import CurrentSongImage from "./CurrentSongImage";
import CurrentSongTitleAndArtist from "./CurrentSongTitleAndArtist";
import BottomPlayerPlayControls from "./PlayControls";
import { StatusBar } from "./StatusBar";

const useStyles = makeStyles({
  root: {
    position: "absolute",
    bottom: `${bottomNavHeight}px`,
    background: LIGHT_GREY,
    height: `${playerHeight + statusBarHeight}px`,
    width: "100%",
    color: LIGHT,
  },
  imgBox: {
    width: `${playerHeight}px`,
    height: `${playerHeight}px`,
  },
  statusBar: {
    height: `${statusBarHeight}px`,
    backgroundColor: LIGHT_GREY2,
  },
});

export default function BottomPlayer(): JSX.Element {
  const classes = useStyles();
  const { player } = usePlayer();

  if (!player.currentSong) {
    return null;
  }

  return (
    <Box
      display={{ xs: "block", sm: "none", md: "none" }}
      className={classes.root}
    >
      <Grid container>
        <Grid item xs={12} className={classes.statusBar}>
          <StatusBar />
        </Grid>
        <Grid item xs={2} className={classes.imgBox}>
          <CurrentSongImage />
        </Grid>
        <Grid item xs={8} className={classes.imgBox}>
          <CurrentSongTitleAndArtist />
        </Grid>
        <Grid item xs={2} className={classes.imgBox}>
          <BottomPlayerPlayControls />
        </Grid>
      </Grid>
    </Box>
  );
}
