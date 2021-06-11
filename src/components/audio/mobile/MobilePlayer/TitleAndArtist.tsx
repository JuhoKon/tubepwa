import usePlayer from '../../../../hooks/usePlayer';
import { CLICKED_BUTTON_COLOR } from '../../../../lib/theme';
import { Artists } from '../../Artists';

const CurrentSongTitleAndArtist = (): JSX.Element => {
  const { player } = usePlayer();

  return (
    <>
      <div style={{ fontSize: '16px' }}>{player?.currentSong?.title}</div>
      <div
        style={{
          fontWeight: 'lighter',
          color: CLICKED_BUTTON_COLOR
        }}>
        <Artists artists={player.currentSong.artists} />
      </div>
    </>
  );
};

export default CurrentSongTitleAndArtist;
