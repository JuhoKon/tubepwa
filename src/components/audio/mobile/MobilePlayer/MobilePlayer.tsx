import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { Box } from '@material-ui/core';
import MoreVertRoundedIcon from '@material-ui/icons/MoreVertRounded';
import KeyboardArrowDownRoundedIcon from '@material-ui/icons/KeyboardArrowDownRounded';
import { useSelector } from 'react-redux';

import useNavigation from '../../../../hooks/useNavigation';
import { GREY, LIGHT, CLICKED_BUTTON_COLOR } from '../../../../lib/theme';
import usePlayer from '../../../../hooks/usePlayer';
import { RootState } from '../../../../types/interfaces';

import SongSlider from './Slider';
import Controls from './Controls';
import TitleAndArtist from './TitleAndArtist';

const useStyles = makeStyles(() => ({
  root: {
    background: GREY,
    color: LIGHT,
    height: '100%',
    padding: '10px'
  },
  flexBoxMiddle: {
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column'
  },
  floatRight: {
    float: 'right'
  },
  floatLeft: {
    float: 'left'
  },
  bigImage: {
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    padding: '60px 10px'
  },
  image: {
    width: '100%'
  },
  currentSongTitleAndArtistContainer: {
    padding: '0px 10px'
  },
  statusBarContainer: {
    padding: '0px 10px'
  },
  button: {
    '&:active': {
      color: CLICKED_BUTTON_COLOR
    }
  }
}));

export default function CenteredGrid(): JSX.Element {
  const classes = useStyles();
  const { hideMobilePlayer } = useNavigation();
  const playList = useSelector((state: RootState) =>
    state.playlist.playlists.find(
      ele => ele?.id === state.playlist.selectedPlaylistId
    )
  );
  return (
    <div className={classes.root}>
      <Grid container spacing={0}>
        <Grid item xs={2}>
          <Box
            className={classes.floatLeft}
            onClick={() => {
              hideMobilePlayer();
            }}>
            <KeyboardArrowDownRoundedIcon
              color="secondary"
              fontSize="large"
              className={classes.button}
            />
          </Box>
        </Grid>
        <Grid item xs={8}>
          <Box className={classes.flexBoxMiddle}>
            <div
              style={{
                fontWeight: 'lighter',
                color: CLICKED_BUTTON_COLOR
              }}>
              TOISTETAAN SOITTOLISTASTA
            </div>
            <div>{playList?.name}</div>
          </Box>
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
        <Grid item xs={12}>
          <Box className={classes.bigImage}>
            <Image />
          </Box>
        </Grid>
        <Box
          style={{
            width: '100%',
            bottom: '25px',
            position: 'fixed',
            paddingRight: '20px'
          }}>
          <Grid item xs={12}>
            <Box className={classes.currentSongTitleAndArtistContainer}>
              <TitleAndArtist />
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box className={classes.statusBarContainer}>
              <SongSlider />
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Controls />
          </Grid>
        </Box>
      </Grid>
    </div>
  );
}
const Image = () => {
  const classes = useStyles();
  const { player } = usePlayer();
  const bigImage = `https://img.youtube.com/vi/${player?.currentSong?.videoId}/hqdefault.jpg`;
  return <img src={bigImage} alt="thumbnailbig" className={classes.image} />;
};
