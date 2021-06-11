import { makeStyles, Grid, Box } from "@material-ui/core";

import { CLICKED_BUTTON_COLOR, LIGHT } from "../src/lib/theme";
import { useSelector } from "react-redux";
import { RootState } from "../src/types/interfaces";
import VirtualizedList from "../src/components/screens/Playlist/VirtualizedList";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { useRouter } from "next/router";

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
  floatLeft: {
    float: "left",
  },
  button: {
    "&:active": {
      color: CLICKED_BUTTON_COLOR,
    },
  },
}));

export default function PlaylistsScreen(): JSX.Element {
  const router = useRouter();
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
        <Grid item xs={2}>
          <Box
            className={classes.floatLeft}
            onClick={() => {
              router.back();
            }}
          >
            <ArrowBackIcon
              color="secondary"
              fontSize="small"
              className={classes.button}
            />
          </Box>
        </Grid>
        <Grid item xs={8}>
          <h3>{playList?.name}</h3>
        </Grid>
        <Grid item xs={2}></Grid>
      </Grid>
      <VirtualizedList songs={playList?.songs} />
    </div>
  );
}
