import { CLICKED_BUTTON_COLOR } from '../../../lib/theme';
import { Song } from '../../../types/interfaces';
import { Artists } from '../../audio/Artists';

type Props = {
  title: string;
  artists: Song['artists'];
};

const CurrentSongTitleAndArtist = ({ title, artists }: Props): JSX.Element => (
  <>
    <div style={{ fontSize: '16px' }}>{title}</div>
    <div
      style={{
        fontWeight: 'lighter',
        color: CLICKED_BUTTON_COLOR
      }}>
      <Artists artists={artists} />
    </div>
  </>
);

export default CurrentSongTitleAndArtist;
