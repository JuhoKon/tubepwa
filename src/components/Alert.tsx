import { makeStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';

import useAlert from '../hooks/useAlert';
import * as constants from '../lib/constants';
const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2)
    }
  },
  alert: {
    width: '100%',
    position: 'absolute',
    bottom: '10%',
    maxWidth: '600px'
  }
}));
/**
 *
 * @returns Snackbar - alert, which autohides after 2000ms. Severity and text to show are acquired from the Redux store, and also controlled from there.
 */
export default function AlertComponent(): JSX.Element | null {
  const { alerts, hideAlert } = useAlert();
  const classes = useStyles();

  if (!alerts.showAlert) {
    return null;
  }
  return (
    <div className={classes.root}>
      <Snackbar
        className={classes.alert}
        open={alerts.showAlert}
        autoHideDuration={constants.ALERT_DURATION_MS}
        onClose={() => {
          hideAlert();
        }}>
        <Alert
          className={classes.alert}
          severity={alerts.severity}
          onClose={() => {
            hideAlert();
          }}>
          {alerts.alertText}
        </Alert>
      </Snackbar>
    </div>
  );
}
