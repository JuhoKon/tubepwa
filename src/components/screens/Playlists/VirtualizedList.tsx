/* eslint-disable react/display-name */
import { Box, Grid, makeStyles } from '@material-ui/core';
import { Fragment, memo } from 'react';
import { FixedSizeList as List } from 'react-window';
import InfiniteLoader from 'react-window-infinite-loader';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';

import useCurrentUser from '../../../hooks/useCurrentUser';
import { LIGHT, CLICKED_BUTTON_COLOR } from '../../../lib/theme';
import { RootState, UserPlaylist } from '../../../types/interfaces';
import usePlaylist from '../../../hooks/usePlaylist';

import PlayListItemSkeleton from './PlaylistSkeleton';

const useStyles = makeStyles(() => ({
  root: {
    color: LIGHT,
    height: '100%',
    padding: '10px'
  },
  flexBoxMiddle: {
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '0px',
    position: 'sticky',
    color: LIGHT,
    top: '0px',
    '&:active': {
      opacity: '0.5'
    }
  }
}));

const LOADED = 2;
const itemStatusMap = {} as any;

const isItemLoaded = (index: number) => !!itemStatusMap[index];

const Row = memo(
  ({
    data,
    index,
    style
  }: {
    data: UserPlaylist[];
    index: number;
    style: any;
  }) => {
    const router = useRouter();
    const { selectPlaylist } = usePlaylist();
    const classes = useStyles();

    const item: UserPlaylist = data[index];

    const playList = useSelector((state: RootState) =>
      state.playlist.playlists.find(ele => ele?.id === item._id)
    );

    return (
      <div style={style}>
        {playList ? (
          <Grid
            container
            spacing={0}
            className={classes.flexBoxMiddle}
            onClick={() => {
              if (playList.id) {
                console.log(`Clicked on ${playList.name}`);
                selectPlaylist(playList.id);
                router.push('/playlist');
              }
            }}>
            <Grid item xs={3}>
              <Box
                style={{
                  height: '100%',
                  width: '100%'
                }}>
                <img
                  src={
                    playList.songs &&
                    playList.songs[0] &&
                    playList.songs[0].thumbnail
                      ? playList.songs[0].thumbnail
                      : '/album.png'
                  }
                  width={65}
                  height={65}
                  alt="abc"
                />
              </Box>
            </Grid>
            <Grid item xs={9}>
              <div
                style={{
                  width: 210,
                  whiteSpace: 'nowrap',
                  marginBottom: '5px'
                }}>
                <Box
                  component="div"
                  textOverflow="ellipsis"
                  overflow="hidden"
                  style={{ fontSize: '16px', fontWeight: 600 }}>
                  {item?.name}
                </Box>

                <Box
                  component="div"
                  textOverflow="ellipsis"
                  overflow="hidden"
                  style={{
                    color: CLICKED_BUTTON_COLOR
                  }}>
                  Playlist &bull; {item?.owner} &bull; {playList?.songs?.length}{' '}
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

  const loadMoreItems = (startIndex: number, stopIndex: number) => {
    for (let index = startIndex; index <= stopIndex; index++) {
      /*  addPlaylist(playlists[index]._id); */
    }
    return new Promise(resolve => {
      for (let index = startIndex; index <= stopIndex; index++) {
        if (itemStatusMap[index]) {
          return;
        }
        addPlaylist(playlists[index]._id);
        itemStatusMap[index] = LOADED;
      }
      resolve('');
    });
  };
  return (
    <Fragment>
      <InfiniteLoader
        isItemLoaded={isItemLoaded}
        itemCount={playlists.length}
        loadMoreItems={loadMoreItems}>
        {({ onItemsRendered, ref }) => (
          <List
            width="100%"
            className="List"
            height={400}
            itemCount={playlists.length}
            itemSize={75}
            itemData={playlists}
            onItemsRendered={onItemsRendered}
            ref={ref}>
            {Row}
          </List>
        )}
      </InfiniteLoader>
    </Fragment>
  );
}
