import Skeleton from '@material-ui/lab/Skeleton';
import { Box, Grid, makeStyles } from '@material-ui/core';

import { playerHeight, statusBarHeight } from '../../../../lib/constants';
import { LIGHT_GREY2, SKELETON_COLOR } from '../../../../lib/theme';

const useStyles = makeStyles({
  thumbnail: {
    backgroundColor: SKELETON_COLOR
  },
  imgBox: {
    width: `${playerHeight}px`,
    height: `${playerHeight}px`
  },
  statusBar: {
    height: `${statusBarHeight}px`,
    backgroundColor: LIGHT_GREY2
  },
  textBox: {
    padding: '5px'
  }
});

export default function BottomPlayerSkeleton(): JSX.Element {
  const classes = useStyles();
  return (
    <Grid container>
      <Grid item xs={2}>
        <Skeleton
          variant="rect"
          className={classes.thumbnail}
          width={playerHeight}
          height={playerHeight}
        />
      </Grid>
      <Grid item xs={8} className={classes.imgBox}>
        <Box className={classes.textBox}>
          <Skeleton
            variant="text"
            className={classes.thumbnail}
            width="175px"
          />
          <Skeleton variant="text" className={classes.thumbnail} width="75px" />
        </Box>
      </Grid>
      <Grid item xs={2} className={classes.imgBox}></Grid>
    </Grid>
  );
}
