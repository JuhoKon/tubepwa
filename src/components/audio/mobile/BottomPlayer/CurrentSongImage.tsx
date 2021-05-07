import { makeStyles } from "@material-ui/core";
import React from "react";
import usePlayer from "../../../../hooks/usePlayer";

import useNavigation from "../../../../hooks/useNavigation";
import { playerHeight } from "../../../../lib/constants";

const useStyles = makeStyles({
  imgBox: {
    width: `${playerHeight}px`,
    height: `${playerHeight}px`,
  },
});

const CurrentSongImage = (): JSX.Element => {
  const classes = useStyles();
  const { player } = usePlayer();
  const { showMobilePlayer } = useNavigation();
  return (
    <img
      src={player.currentSong.thumbnail}
      alt="thumbnail"
      className={classes.imgBox}
      onClick={() => {
        showMobilePlayer();
      }}
    />
  );
};
export default CurrentSongImage;
