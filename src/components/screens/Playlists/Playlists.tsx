import { List } from "@material-ui/core";
import { makeStyles, Grid } from "@material-ui/core";
import React from "react";
import useCurrentUser from "../../../hooks/useCurrentUser";
import ListItem from "@material-ui/core/ListItem";
import { LIGHT_GREY, LIGHT } from "../../../lib/theme";
import VirtualizedList from "./VirtualizedList";

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
    /*     fontSize: "48px", */
    padding: "0px",
    position: "sticky",

    color: LIGHT,
    top: "0px",
  },
}));
// Virtualized?
// Load playlists when scrolling to them?
//
export default function PlaylistsScreen(): JSX.Element {
  const { user } = useCurrentUser();
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Grid container spacing={0} className={classes.flexBoxMiddle}>
        <Grid item xs={2}></Grid>
        <Grid item xs={8}>
          <h3>Oma kirjasto</h3>
        </Grid>
        <Grid item xs={2}></Grid>
      </Grid>
      {/*       <div>
        {user.userPlaylists.map((playlist, index) => (
          <PlayListItem key={index} />
        ))}
      </div> */}
      <VirtualizedList />
    </div>
  );
}
const PlayListItem = () => {
  return <div>Playlist 1</div>;
};
