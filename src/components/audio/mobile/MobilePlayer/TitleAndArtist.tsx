import React from "react";
import usePlayer from "../../../../hooks/usePlayer";
import { CLICKED_BUTTON_COLOR } from "../../../../lib/theme";

const TitleAndArtist = (): JSX.Element => {
  const { player } = usePlayer();

  return (
    <>
      <div style={{ fontSize: "16px" }}>{player.currentSong.title}</div>
      <div
        style={{
          fontWeight: "lighter",
          color: CLICKED_BUTTON_COLOR,
        }}
      >
        {/* TODO: Multiple artists?*/}
        {player.currentSong.artists[0].name}
      </div>
    </>
  );
};

export default TitleAndArtist;
