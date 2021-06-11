import { forwardRef } from "react";
import Slide from "@material-ui/core/Slide";

import { makeStyles } from "@material-ui/core/styles";
import { Box, Dialog } from "@material-ui/core";
import CenteredGrid from "../src/components/audio/mobile/MobilePlayer/MobilePlayer";
import useNavigation from "../src/hooks/useNavigation";
import { useRouter } from "next/router";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Transition: any = forwardRef(function Transition(props: any, ref) {
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
  const router = useRouter();
  const { nav, hideMobilePlayer } = useNavigation();

  return (
    <Dialog
      fullScreen
      open={nav.showMobilePlayer}
      onClose={hideMobilePlayer}
      TransitionComponent={Transition}
      onExiting={() => {
        router.back();
      }}
    >
      <Box className={classes.modalStyle}>
        <CenteredGrid />
      </Box>
    </Dialog>
  );
}
