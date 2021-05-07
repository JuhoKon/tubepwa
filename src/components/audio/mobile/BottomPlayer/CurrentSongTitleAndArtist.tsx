import { Box, makeStyles } from "@material-ui/core";
import React from "react";
import usePlayer from "../../../../hooks/usePlayer";

import useNavigation from "../../../../hooks/useNavigation";

const useStyles = makeStyles({
  flexBoxHorizontalMiddle: {
    height: "100%",
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    padding: "10px",
  },
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
      }}
    >
      <div>{player.currentSong.title}</div>
      <div
        style={{
          fontWeight: "lighter",
        }}
      >
        {/* TODO: Multiple artists?*/}
        {player.currentSong.artists[0].name}
      </div>
    </Box>
  );
};
export default CurrentSongTitleAndArtist;
