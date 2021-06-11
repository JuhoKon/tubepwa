import { Box, makeStyles } from '@material-ui/core';

import usePlayer from '../../../../hooks/usePlayer';
import useNavigation from '../../../../hooks/useNavigation';
import { CLICKED_BUTTON_COLOR } from '../../../../lib/theme';
import { Artists } from '../../Artists';

const useStyles = makeStyles({
  flexBoxHorizontalMiddle: {
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    padding: '10px'
  }
});
/* TODO a utility component e.g. for helping to return correct font size & font weight? */
const CurrentSongTitleAndArtist = (): JSX.Element => {
  const classes = useStyles();
  const { player } = usePlayer();
  const { showMobilePlayer } = useNavigation();
  return (
    <Box
      className={classes.flexBoxHorizontalMiddle}
      onClick={() => {
        showMobilePlayer();
      }}>
      <div>{player.currentSong.title}</div>
      <div
        style={{
          fontWeight: 'lighter',
          color: CLICKED_BUTTON_COLOR
        }}>
        <Artists artists={player.currentSong.artists} />
      </div>
    </Box>
  );
};

export default CurrentSongTitleAndArtist;
