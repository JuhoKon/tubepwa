/* eslint-disable react/display-name */
import { Box, Grid, makeStyles } from "@material-ui/core";
import { Fragment, memo } from "react";
import { FixedSizeList as List } from "react-window";
import InfiniteLoader from "react-window-infinite-loader";

import { CLICKED_BUTTON_COLOR, LIGHT } from "../../../lib/theme";
import { Song } from "../../../types/interfaces";
import PlayListItemSkeleton from "./PlaylistSkeleton";
import usePlayer from "../../../hooks/usePlayer";
import TitleAndArtist from "./TitleAndArtist";
import MoreVertRoundedIcon from "@material-ui/icons/MoreVertRounded";

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
    padding: "0px",
    position: "sticky",
    color: LIGHT,
    top: "0px",
    "&:active": {
      opacity: "0.5",
    },
  },
  button: {
    "&:active": {
      color: CLICKED_BUTTON_COLOR,
    },
  },
  floatRight: {
    float: "right",
  },
}));

const LOADED = 2;
const itemStatusMap = {};

const isItemLoaded = (index) => !!itemStatusMap[index];

const Row = memo(
  ({ data, index, style }: { data: Song[]; index: number; style: any }) => {
    const classes = useStyles();
    const song = data[index];
    const { playSong } = usePlayer();
    return (
      <div style={style}>
        {data ? (
          <Grid
            container
            spacing={0}
            className={classes.flexBoxMiddle}
            onClick={() => {
              playSong(song);
            }}
          >
            <Grid item xs={2}>
              <Box
                style={{
                  height: "100%",
                  width: "100%",
                }}
              >
                <img
                  src={song.thumbnail ? song.thumbnail : "/album.png"}
                  width={55}
                  height={55}
                  alt="abc"
                />
              </Box>
            </Grid>
            <Grid item xs={10}>
              <div
                style={{
                  width: 210,
                  whiteSpace: "nowrap",
                  marginBottom: "5px",
                  marginLeft: "5px",
                }}
              >
                <TitleAndArtist title={song.title} artists={song.artists} />
              </div>
            </Grid>
            <Grid item xs={2}>
              <Box className={classes.floatRight}>
                <MoreVertRoundedIcon
                  color="secondary"
                  fontSize="large"
                  className={classes.button}
                />
              </Box>
            </Grid>
          </Grid>
        ) : (
          <PlayListItemSkeleton />
        )}
      </div>
    );
  }
);
type Props = {
  songs: Song[];
};
export default function App({ songs }: Props): JSX.Element {
  const loadMoreItems = (startIndex, stopIndex) => {
    return new Promise((resolve) => {
      for (let index = startIndex; index <= stopIndex; index++) {
        if (itemStatusMap[index]) {
          return;
        }
        itemStatusMap[index] = LOADED;
      }
      resolve("");
    });
  };
  console.log(songs.length);
  return (
    <Fragment>
      <InfiniteLoader
        isItemLoaded={isItemLoaded}
        itemCount={songs.length}
        loadMoreItems={loadMoreItems}
      >
        {({ onItemsRendered, ref }) => (
          <List
            className="List"
            height={400}
            itemCount={songs.length}
            itemSize={75}
            itemData={songs}
            onItemsRendered={onItemsRendered}
            ref={ref}
          >
            {Row}
          </List>
        )}
      </InfiniteLoader>
    </Fragment>
  );
}
