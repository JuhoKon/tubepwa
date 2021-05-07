import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import useNavigation from "../../../hooks/useNavigation";
import { Box } from "@material-ui/core";
import { LIGHT_GREY, LIGHT } from "../../../lib/theme";

const useStyles = makeStyles(() => ({
  root: {
    background: LIGHT_GREY,
    color: LIGHT,
    height: "100%",
  },
  flexBoxMiddle: {
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
}));

export default function CenteredGrid(): JSX.Element {
  const classes = useStyles();
  const { hideMobilePlayer } = useNavigation();

  return (
    <div className={classes.root}>
      <Grid container spacing={0}>
        <Grid item xs={2}>
          <div>xs2</div>
        </Grid>
        <Grid item xs={8}>
          <Box className={classes.flexBoxMiddle}>
            <div
              style={{
                fontWeight: "lighter",
              }}
            >
              TOISTETAAN SOITTOLISTASTA
            </div>
            <div>deadmau5 Radio</div>
          </Box>
        </Grid>
        <Grid item xs={2}>
          <div>xs2</div>
        </Grid>
        <Grid item xs={12}>
          <button
            onClick={() => {
              hideMobilePlayer();
            }}
          >
            Hide
          </button>
        </Grid>
      </Grid>
    </div>
  );
}
