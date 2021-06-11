import { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Slider from '@material-ui/core/Slider';
import { Box } from '@material-ui/core';
import { useDebounce } from 'use-lodash-debounce';

import usePlayer from '../../../../hooks/usePlayer';
import usePlayerTime from '../../../../hooks/usePlayerTime';
import delay from '../../../../helpers/Sleep';
import { CLICKED_BUTTON_COLOR } from '../../../../lib/theme';

const useStyles = makeStyles({
  root: {
    width: '100%',
    margin: '0px'
  },
  smallText: {
    fontSize: '12px',
    marginTop: '-15px'
  }
});

export default function SongSlider(): JSX.Element {
  const classes = useStyles();
  const [value, setValue] = useState(0);
  const [seekValue, setSeekValue] = useState(999999);
  const { seekTo } = usePlayer();
  const { playerTime } = usePlayerTime();
  const [dragging, setDragging] = useState(false);

  const debouncedValue = useDebounce(seekValue, 750);

  useEffect(() => {
    console.log(debouncedValue);
    if (debouncedValue === 999999) {
      return;
    }
    seekTo(debouncedValue);
    delay(500).then(() => setDragging(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    if (playerTime.duration === 0 && playerTime.currentTime === 0) {
      return 0;
    } else {
      return playerTime.currentTime;
    }
  };
  const currentTime = dragging ? value : playerTime.currentTime;
  return (
    <>
      <Slider
        value={dragging ? value : getValue()}
        onChange={handleChange}
        aria-labelledby="continuous-slider"
        className={classes.root}
        min={0}
        max={playerTime.duration}
        color="secondary"
      />
      <Box className={classes.smallText}>
        <div style={{ float: 'left', color: CLICKED_BUTTON_COLOR }}>
          {formatTime(currentTime)}
        </div>
        <div style={{ float: 'right', color: CLICKED_BUTTON_COLOR }}>
          {formatTime(playerTime.duration)}
        </div>
      </Box>
    </>
  );
}

const formatTime = (time: number) =>
  new Date(time * 1000).toISOString().substr(14, 5);
