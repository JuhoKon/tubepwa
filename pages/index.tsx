import React from "react";
import { useRouter } from "next/router";
import useCurrentUser from "../src/hooks/useCurrentUser";
import checkUser from "../src/helpers/CheckUser";
import LoadingBackDrop from "../src/components/LoadingBackdrop";
import useAlert from "../src/hooks/useAlert";
import * as constants from "../src/lib/constants";
import usePlayer from "../src/hooks/usePlayer";

export default function Home(): React.ReactNode {
  const { playSong, pausePlay, resumePlay, initNavigator } = usePlayer();
  const { user, getUserFromLocalStorage, logout } = useCurrentUser();
  const { setErrorAlert } = useAlert();
  const router = useRouter();

  const prevStatusRef = React.useRef(false);

  // INITIAL HIT ON THE INDEX PAGE
  React.useEffect(() => {
    initNavigator();
    if (window.localStorage.getItem(constants.USER_LOCAL_STORAGE_KEY)) {
      if (!user.loggedIn) {
        // User has token && doesn't have active session
        getUserFromLocalStorage();
      }
    } else {
      router.push("/login");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // USER.LOGGEDIN STATUS CHANGES TRIGGERS THIS
  React.useEffect(() => {
    // Please clean
    if (!window.localStorage.getItem(constants.USER_LOCAL_STORAGE_KEY)) {
      router.push("/login");
    } else {
      if (prevStatusRef.current === true && user.loggedIn === false) {
        router.push("/login");
      } else {
        const errorCB = () => setErrorAlert(constants.PLEASE_LOGIN_MSG);
        prevStatusRef.current = user.loggedIn;
        checkUser(user, router, errorCB);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user.loggedIn]);

  if (!user.loggedIn) {
    return <LoadingBackDrop useRedux={false} show={true} />;
  }
  return (
    <>
      <button
        onClick={() => {
          logout();
        }}
      >
        Logout
      </button>
      <button
        onClick={() => {
          playSong("BUE8JDWsTWo");
        }}
      >
        Paina tästä nii lähtee
      </button>
      <button
        onClick={() => {
          pausePlay();
        }}
      >
        Pause
      </button>
      <button
        onClick={() => {
          resumePlay();
        }}
      >
        Resume
      </button>
    </>
  );
}
