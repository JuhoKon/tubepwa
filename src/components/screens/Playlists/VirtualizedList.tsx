/* eslint-disable react/display-name */
import { Box, Grid, makeStyles } from "@material-ui/core";
import React, { Fragment, memo } from "react";
import { FixedSizeList as List } from "react-window";
import InfiniteLoader from "react-window-infinite-loader";
import useCurrentUser from "../../../hooks/useCurrentUser";
import { LIGHT, CLICKED_BUTTON_COLOR } from "../../../lib/theme";
import { RootState, UserPlaylist } from "../../../types/interfaces";
import PlayListItemSkeleton from "./PlaylistSkeleton";
import Image from "next/image";
import { useSelector } from "react-redux";
import usePlaylist from "../../../hooks/usePlaylist";

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
  },
}));

const LOADING = 1;
const LOADED = 2;
const itemStatusMap = {};

const isItemLoaded = (index) => !!itemStatusMap[index];

const Row = memo(
  ({ data, index, style }: { data: any; index: any; style: any }) => {
    const classes = useStyles();

    const item: UserPlaylist = data[index];

    const playList = useSelector((state: RootState) =>
      state.playlist.playlists.find((ele) => ele.id === item._id)
    );

    return (
      <div style={style}>
        {playList ? (
          <Grid container spacing={0} className={classes.flexBoxMiddle}>
            <Grid item xs={3}>
              <Box
                style={{
                  height: "100%",
                  width: "100%",
                }}
              >
                <Image
                  src={
                    playList.songs &&
                    playList.songs[0] &&
                    playList.songs[0].thumbnail
                      ? playList.songs[0].thumbnail
                      : "/album.png"
                  }
                  width={65}
                  height={65}
                />
              </Box>
            </Grid>
            <Grid item xs={9}>
              <div style={{ width: 210, whiteSpace: "nowrap" }}>
                <Box
                  component="div"
                  textOverflow="ellipsis"
                  overflow="hidden"
                  style={{ fontSize: "16px" }}
                >
                  {item?.name}
                </Box>

                <Box
                  component="div"
                  textOverflow="ellipsis"
                  overflow="hidden"
                  style={{
                    color: CLICKED_BUTTON_COLOR,
                  }}
                >
                  Playlist &bull; {item?.owner} &bull; {playList.songs.length}{" "}
                  songs
                </Box>
              </div>
            </Grid>
          </Grid>
        ) : (
          <PlayListItemSkeleton />
        )}
      </div>
    );
  }
);

export default function App(): JSX.Element {
  const { user } = useCurrentUser();
  const { addPlaylist } = usePlaylist();
  const playlists = user.userPlaylists;

  const loadMoreItems = (startIndex, stopIndex) => {
    for (let index = startIndex; index <= stopIndex; index++) {
      /*  addPlaylist(playlists[index]._id); */
    }
    return new Promise((resolve) => {
      for (let index = startIndex; index <= stopIndex; index++) {
        if (itemStatusMap[index]) {
          return;
        }
        addPlaylist(playlists[index]._id);
        itemStatusMap[index] = LOADED;
      }
      resolve("");
    });
  };
  console.log(playlists.length);
  return (
    <Fragment>
      <InfiniteLoader
        isItemLoaded={isItemLoaded}
        itemCount={playlists.length}
        loadMoreItems={loadMoreItems}
      >
        {({ onItemsRendered, ref }) => (
          <List
            className="List"
            height={400}
            itemCount={playlists.length}
            itemSize={75}
            itemData={playlists}
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
