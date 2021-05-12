import { Box, CircularProgress, Grid, makeStyles } from "@material-ui/core";
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
import BottomPlayerSkeleton from "./Skeleton";
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
  loadingIndicator: {
    position: "absolute",
    left: "8px",
    top: "8px",
    width: `${playerHeight}px`,
    height: `${playerHeight}px`,
  },
  relativeContainer: {
    position: "relative",
    width: `${playerHeight}px`,
    height: `${playerHeight}px`,
  },
  loadingIndicatorContainer: {
    backgroundColor: "#0000008f",
    width: `${playerHeight}px`,
    height: `${playerHeight}px`,
    position: "absolute",
    bottom: "0px",
  },
});

export default function BottomPlayer(): JSX.Element {
  const classes = useStyles();
  const { player } = usePlayer();

  if (player?.loadingSong && !player.currentSong) {
    return (
      <Box
        display={{ xs: "block", sm: "none", md: "none" }}
        className={classes.root}
      >
        <BottomPlayerSkeleton />
      </Box>
    );
  }
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
          <Box className={classes.relativeContainer}>
            <CurrentSongImage />
            <SongLoadingIndicator />
          </Box>
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
const SongLoadingIndicator = () => {
  const classes = useStyles();
  const { player } = usePlayer();
  if (!player.loadingSong) {
    return null;
  }
  return (
    <Box className={classes.loadingIndicatorContainer}>
      <CircularProgress
        color="secondary"
        className={classes.loadingIndicator}
      />
    </Box>
  );
};
