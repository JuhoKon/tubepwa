import React from "react";
import Backdrop from "@material-ui/core/Backdrop";
import { makeStyles } from "@material-ui/core/styles";

import useNavigation from "../hooks/useNavigation";

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));
/**
 *
 * @returns Backdrop element. Controlling through Redux.
 */
export default function BackdropElement(): JSX.Element {
  const { nav } = useNavigation();
  const classes = useStyles();

  return <Backdrop className={classes.backdrop} open={nav.showBackdrop} />;
}
