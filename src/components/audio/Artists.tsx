import { Song } from '../../types/interfaces';

type Props = {
  artists: Song['artists'];
};
export const Artists = ({ artists }: Props): JSX.Element => (
  <div>
    {artists?.map((artist, idx) => (
      <>
        {artist.name} {idx < artists.length - 1 ? <>&bull; &nbsp;</> : ''}
      </>
    ))}
  </div>
);
