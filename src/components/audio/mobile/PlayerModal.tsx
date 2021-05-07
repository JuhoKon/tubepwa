import React from "react";
import Slide from "@material-ui/core/Slide";

import { makeStyles } from "@material-ui/core/styles";
import { Box } from "@material-ui/core";

import CenteredGrid from "./MobilePlayer";
import useNavigation from "../../../hooks/useNavigation";

const useStyles = makeStyles((theme) => ({
  modalStyle: {
    background: "white",
    height: "100%",
    width: "100%",
    position: "absolute",
    zIndex: 2,
  },
}));

export default function PlayerModal(): JSX.Element {
  const classes = useStyles();
  const { nav } = useNavigation();
  return (
    <Slide direction="up" in={nav.showMobilePlayer} mountOnEnter unmountOnExit>
      <Box className={classes.modalStyle}>
        <CenteredGrid />
      </Box>
    </Slide>
  );
}
