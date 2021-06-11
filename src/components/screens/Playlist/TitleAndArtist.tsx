import { CLICKED_BUTTON_COLOR } from '../../../lib/theme';
import { Song } from '../../../types/interfaces';

type Props = {
  title: string;
  artists: Song['artists'];
};
const TitleAndArtist = ({ title, artists }: Props): JSX.Element => (
  <>
    <div style={{ fontSize: '15px' }}>{title}</div>
    <div
      style={{
        fontSize: '15px',
        fontWeight: 'lighter',
        color: CLICKED_BUTTON_COLOR
      }}>
      <Artists artists={artists} />
    </div>
  </>
);
type Props2 = {
  artists: Song['artists'];
};
const Artists = ({ artists }: Props2) => (
  <div>
    {artists?.map((artist, idx) => (
      <>
        {artist.name} {idx < artists.length - 1 ? <>&bull; &nbsp;</> : ''}
      </>
    ))}
  </div>
);
export default TitleAndArtist;
