import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import Slider from "@material-ui/core/Slider";

import { Box } from "@material-ui/core";
import usePlayer from "../../../../hooks/usePlayer";

const useStyles = makeStyles({
  root: {
    width: "100%",
    padding: "0px",
    margin: "0px",
  },
  smallText: {
    fontSize: "14px",
  },
});

export default function SongSlider() {
  const classes = useStyles();
  const [value, setValue] = React.useState(30);
  const { player } = usePlayer();
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const getValue = (): number => {
    if (player.duration === 0 && player.currentTime === 0) {
      return 0;
    } else {
      return (player.currentTime / player.duration) * 100;
    }
  };

  return (
    <>
      <Slider
        value={getValue()}
        onChange={handleChange}
        aria-labelledby="continuous-slider"
        className={classes.root}
      />
      <Box className={classes.smallText}>
        <div style={{ float: "left" }}>{formatTime(player.currentTime)}</div>
        <div style={{ float: "right" }}>{formatTime(player.duration)}</div>
      </Box>
    </>
  );
}

const formatTime = (time: any) => {
  return new Date(time * 1000).toISOString().substr(14, 5);
};
