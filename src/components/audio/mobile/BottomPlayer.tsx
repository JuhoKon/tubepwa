import { Box, Grid, makeStyles } from "@material-ui/core";
import React from "react";
import usePlayer from "../../../hooks/usePlayer";
import { LIGHT_GREY, LIGHT, LIGHT_GREY2 } from "../../../lib/theme";
import PlayArrowRoundedIcon from "@material-ui/icons/PlayArrowRounded";
import PauseRoundedIcon from "@material-ui/icons/PauseRounded";
import { StatusBar } from "./StatusBar";

const bottomNavHeight = 56;
const playerHeight = 56;
const statusBarHeight = 1;

const useStyles = makeStyles({
  root: {
    position: "absolute",
    bottom: `${bottomNavHeight}px`,
    background: LIGHT_GREY,
    height: `${playerHeight + statusBarHeight}px`,
    width: "100%",
    color: LIGHT,
  },
  flexBoxMiddle: {
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  flexBoxHorizontalMiddle: {
    height: "100%",
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    padding: "10px",
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
  const { player, pausePlay, resumePlay } = usePlayer();

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
          <img
            src={player.currentSong.thumbnail}
            alt="thumbnail"
            className={classes.imgBox}
          />
        </Grid>
        <Grid item xs={8} className={classes.imgBox}>
          <Box className={classes.flexBoxHorizontalMiddle}>
            <div>{player.currentSong.title}</div>
            <div
              style={{
                fontWeight: "lighter",
              }}
            >
              {/* TODO: Multiple artists?*/}
              {player.currentSong.artists[0].name}
            </div>
          </Box>
        </Grid>
        <Grid item xs={2} className={classes.imgBox}>
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
        </Grid>
      </Grid>
      {/*       I am bottom player
      <button
        onClick={() => {
          playSong(song1);
        }}
      >
        Song 1
      </button>
      <button
        onClick={() => {
          playSong(song2);
        }}
      >
        Song 2
      </button>
      {player.isPlaying ? (
        <button
          onClick={() => {
            pausePlay();
          }}
        >
          Pause
        </button>
      ) : (
        <button
          onClick={() => {
            resumePlay();
          }}
        >
          Resume
        </button>
      )} */}
    </Box>
  );
}
