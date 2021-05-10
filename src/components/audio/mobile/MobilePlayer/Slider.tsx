import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Slider from "@material-ui/core/Slider";
import { Box, debounce } from "@material-ui/core";
import usePlayer from "../../../../hooks/usePlayer";
import { useDebounce } from "use-lodash-debounce";
import delay from "../../../../helpers/Sleep";

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
  const [value, setValue] = React.useState(0);
  const [seekValue, setSeekValue] = React.useState(999999);
  const { player, seekTo } = usePlayer();
  const [dragging, setDragging] = React.useState(false);

  const debouncedValue = useDebounce(seekValue, 750);

  React.useEffect(() => {
    console.log(debouncedValue);
    if (debouncedValue === 999999) {
      return;
    }
    seekTo(debouncedValue);
    delay(500).then(() => setDragging(false));
  }, [debouncedValue]);

  const handleChange = (event, newValue) => {
    setDragging(true);
    if (event.cancelable) {
      event.preventDefault();
    }
    setSeekValue(newValue);
    setValue(newValue);
  };
  const getValue = (): number => {
    if (player.duration === 0 && player.currentTime === 0) {
      return 0;
    } else {
      return player.currentTime;
    }
  };
  const currentTime = dragging ? value : player.currentTime;
  return (
    <>
      <Slider
        value={dragging ? value : getValue()}
        onChange={handleChange}
        aria-labelledby="continuous-slider"
        className={classes.root}
        min={0}
        max={player.duration}
        /*     step={1} */
      />
      <Box className={classes.smallText}>
        <div style={{ float: "left" }}>{formatTime(currentTime)}</div>
        <div style={{ float: "right" }}>{formatTime(player.duration)}</div>
      </Box>
    </>
  );
}

const formatTime = (time: any) => {
  return new Date(time * 1000).toISOString().substr(14, 5);
};
