import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Slider from "@material-ui/core/Slider";
import { Box } from "@material-ui/core";
import usePlayer from "../../../../hooks/usePlayer";
import { useDebounce } from "use-lodash-debounce";
import delay from "../../../../helpers/Sleep";
import { CLICKED_BUTTON_COLOR } from "../../../../lib/theme";

const useStyles = makeStyles({
  root: {
    width: "100%",
    margin: "0px",
  },
  smallText: {
    fontSize: "12px",
    marginTop: "-15px",
  },
});

export default function SongSlider(): JSX.Element {
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
        color="secondary"
      />
      <Box className={classes.smallText}>
        <div style={{ float: "left", color: CLICKED_BUTTON_COLOR }}>
          {formatTime(currentTime)}
        </div>
        <div style={{ float: "right", color: CLICKED_BUTTON_COLOR }}>
          {formatTime(player.duration)}
        </div>
      </Box>
    </>
  );
}

const formatTime = (time: any) => {
  return new Date(time * 1000).toISOString().substr(14, 5);
};
