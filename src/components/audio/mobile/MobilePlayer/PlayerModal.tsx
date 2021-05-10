import React from "react";
import Slide from "@material-ui/core/Slide";

import { makeStyles } from "@material-ui/core/styles";
import { Box, Dialog } from "@material-ui/core";

import CenteredGrid from "./MobilePlayer";
import useNavigation from "../../../../hooks/useNavigation";

const Transition: any = React.forwardRef(function Transition(props: any, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const useStyles = makeStyles(() => ({
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
  const { nav, hideMobilePlayer } = useNavigation();
  return (
    <Dialog
      fullScreen
      open={nav.showMobilePlayer}
      onClose={hideMobilePlayer}
      TransitionComponent={Transition}
    >
      <Box className={classes.modalStyle}>
        <CenteredGrid />
      </Box>
    </Dialog>
  );
}
