import { Box, Grid, makeStyles } from "@material-ui/core";
import React from "react";
import usePlayer from "../../hooks/usePlayer";
import { LIGHT_GREY, LIGHT } from "../../lib/theme";
import { Song } from "../../types/interfaces";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import PauseIcon from "@material-ui/icons/Pause";

const useStyles = makeStyles({
  root: {
    position: "absolute",
    bottom: "56px",
    background: LIGHT_GREY,
    height: "56px",
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
  },
  imgBox: {
    width: "56px",
    height: "56px",
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
              <PauseIcon color="secondary" fontSize="large" />
            ) : (
              <PlayArrowIcon color="secondary" fontSize="large" />
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
