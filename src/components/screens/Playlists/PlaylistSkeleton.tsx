import Skeleton from '@material-ui/lab/Skeleton';
import { Box, Grid, makeStyles } from '@material-ui/core';

import { SKELETON_COLOR } from '../../../lib/theme';

const useStyles = makeStyles({
  thumbnail: {
    backgroundColor: SKELETON_COLOR
  },
  imgBox: {
    width: `${65}px`,
    height: `${50}px`
  },
  textBox: {
    padding: '5px'
  }
});

export default function PlayListItemSkeleton(): JSX.Element {
  const classes = useStyles();
  return (
    <Grid container>
      <Grid item xs={3}>
        <Skeleton
          variant="rect"
          className={classes.thumbnail}
          width={65}
          height={50}
        />
      </Grid>
      <Grid item xs={9} className={classes.imgBox}>
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
