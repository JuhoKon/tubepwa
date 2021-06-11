import { makeStyles, Grid } from "@material-ui/core";
import React from "react";

import { LIGHT } from "../src/lib/theme";
import { useSelector } from "react-redux";
import { RootState } from "../src/types/interfaces";
import VirtualizedList from "../src/components/screens/Playlist/VirtualizedList";

const useStyles = makeStyles(() => ({
  root: {
    color: LIGHT,
    height: "100%",
    padding: "10px",
  },
  flexBoxMiddle: {
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",

    padding: "0px",
    position: "sticky",

    color: LIGHT,
    top: "0px",
  },
}));

export default function PlaylistsScreen(): JSX.Element {
  const classes = useStyles();
  const playList = useSelector((state: RootState) =>
    state.playlist.playlists.find(
      (ele) => ele.id === state.playlist.selectedPlaylistId
    )
  );
  console.log(playList);
  return (
    <div className={classes.root}>
      <Grid container spacing={0} className={classes.flexBoxMiddle}>
        <Grid item xs={2}></Grid>
        <Grid item xs={8}>
          <h3>{playList.name}</h3>
        </Grid>
        <Grid item xs={2}></Grid>
      </Grid>
      <VirtualizedList songs={playList.songs} />
    </div>
  );
}
