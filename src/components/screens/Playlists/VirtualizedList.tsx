/* eslint-disable react/display-name */
import { Box, Grid, makeStyles } from "@material-ui/core";
import React, { Fragment, memo } from "react";
import { FixedSizeList as List } from "react-window";
import InfiniteLoader from "react-window-infinite-loader";
import useCurrentUser from "../../../hooks/useCurrentUser";
import { GREY, LIGHT, CLICKED_BUTTON_COLOR } from "../../../lib/theme";
import { UserPlaylist } from "../../../types/interfaces";
import PlayListItemSkeleton from "./PlaylistSkeleton";

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

const loadMoreItems = (startIndex, stopIndex) => {
  for (let index = startIndex; index <= stopIndex; index++) {
    itemStatusMap[index] = LOADING;
  }
  return new Promise((resolve) =>
    setTimeout(() => {
      for (let index = startIndex; index <= stopIndex; index++) {
        itemStatusMap[index] = LOADED;
      }
      resolve("");
    }, 2500)
  );
};

const Row = memo(
  ({ data, index, style }: { data: any; index: any; style: any }) => {
    // Data passed to List as "itemData" is available as props.data
    const classes = useStyles();

    const item: UserPlaylist = data[index];
    console.log(item);
    /*     console.log(data, index, style); */
    console.log("Row rendered");
    let label;
    if (itemStatusMap[index] === LOADED) {
      label = `Row ${index}`;
    } else {
      label = "Loading...";
    }
    return (
      <div style={style}>
        {itemStatusMap[index] === LOADED ? (
          <Grid container spacing={0} className={classes.flexBoxMiddle}>
            <Grid item xs={3}>
              <Box
                style={{
                  height: "100%",
                  width: "100%",
                }}
              >
                <img
                  src="https://img.youtube.com/vi/AHdd65cuAIE/hqdefault.jpg"
                  style={{
                    height: "65px",
                    width: "65px",
                  }}
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
                  Playlist &bull; {item?.owner}
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

export default function App() {
  const { user } = useCurrentUser();
  const playlists = user.userPlaylists;
  return (
    <Fragment>
      <InfiniteLoader
        isItemLoaded={isItemLoaded}
        itemCount={1000}
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
