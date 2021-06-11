import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core/styles";
import useCurrentUser from "../hooks/useCurrentUser";

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));
/**
 *
 * @returns Loading-backdrop element. Controlling through Redux or manually. This is for user logging in.
 */
export default function LoadingBackDrop({
  useRedux = true,
  show = false,
}: {
  useRedux?: boolean;
  show?: boolean;
}): JSX.Element {
  const { user } = useCurrentUser();
  const classes = useStyles();
  if (useRedux) {
    return (
      <div>
        <Backdrop className={classes.backdrop} open={user.loggingIn}>
          <CircularProgress color="inherit" />
        </Backdrop>
      </div>
    );
  } else {
    return (
      <div>
        <Backdrop className={classes.backdrop} open={show}>
          <CircularProgress color="inherit" />
        </Backdrop>
      </div>
    );
  }
}
