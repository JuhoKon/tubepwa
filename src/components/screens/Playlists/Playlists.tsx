import { makeStyles, Grid } from "@material-ui/core";

import { LIGHT } from "../../../lib/theme";
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

    padding: "0px",
    position: "sticky",

    color: LIGHT,
    top: "0px",
  },
}));

export default function PlaylistsScreen(): JSX.Element {
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
      <VirtualizedList />
    </div>
  );
}
