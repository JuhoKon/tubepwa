import { Box, makeStyles } from "@material-ui/core";
import usePlayer from "../../../../hooks/usePlayer";
import PlayArrowRoundedIcon from "@material-ui/icons/PlayArrowRounded";
import PauseRoundedIcon from "@material-ui/icons/PauseRounded";
import { CLICKED_BUTTON_COLOR } from "../../../../lib/theme";

const useStyles = makeStyles({
  flexBoxMiddle: {
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    "&:active": {
      color: CLICKED_BUTTON_COLOR,
    },
  },
});

const BottomPlayerPlayControls = (): JSX.Element => {
  const classes = useStyles();
  const { player, pausePlay, resumePlay } = usePlayer();
  return (
    <Box
      className={classes.flexBoxMiddle}
      onClick={() => {
        if (player.isPlaying) {
          pausePlay();
        } else {
          resumePlay();
        }
      }}
    >
      {player.isPlaying ? (
        <PauseRoundedIcon
          color="secondary"
          fontSize="large"
          className={classes.button}
        />
      ) : (
        <PlayArrowRoundedIcon
          color="secondary"
          fontSize="large"
          className={classes.button}
        />
      )}
    </Box>
  );
};
export default BottomPlayerPlayControls;
