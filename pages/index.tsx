import * as React from "react";
import { useRouter } from "next/router";
import useCurrentUser from "../src/hooks/useCurrentUser";
import checkUser from "../src/helpers/CheckUser";
import LoadingBackDrop from "../src/components/LoadingBackdrop";
import useAlert from "../src/hooks/useAlert";
import * as constants from "../src/lib/constants";
import usePlayer from "../src/hooks/usePlayer";
import Link from "next/link";
import { Song } from "../src/types/interfaces";

import useNavigation from "../src/hooks/useNavigation";

export default function Home(): React.ReactNode {
  const { user, getUserFromLocalStorage } = useCurrentUser();
  const { setErrorAlert } = useAlert();
  const { setScreen } = useNavigation();
  const router = useRouter();

  const prevStatusRef = React.useRef(false);

  // INITIAL HIT ON THE INDEX PAGE
  React.useEffect(() => {
    setScreen(0);
    /*   initNavigator(); */
    if (window.localStorage.getItem(constants.USER_LOCAL_STORAGE_KEY)) {
      getUserFromLocalStorage();
    } else {
      router.replace("/login");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // USER.LOGGEDIN STATUS CHANGES TRIGGERS THIS
  React.useEffect(() => {
    // Please clean
    if (!window.localStorage.getItem(constants.USER_LOCAL_STORAGE_KEY)) {
      router.replace("/login");
    } else {
      if (prevStatusRef.current === true && user.loggedIn === false) {
        router.replace("/login");
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
  return <Screen_1 />;
}
const Screen_1 = () => {
  const { playSong, showVisualization, hideVisualization } = usePlayer();
  const { logout } = useCurrentUser();

  return (
    <>
      <button onClick={showVisualization}>Show</button>
      <button onClick={hideVisualization}>Hide</button>
      <button
        onClick={() => {
          logout();
        }}
      >
        Logout
      </button>
      {/* Hide these somehow? These are just for preloading stuff. Or move them to BottomNav */}
      <div style={{ display: "none" }}>
        <Link href="/mobileplayer">
          <button>Mobileplayer</button>
        </Link>
        <Link href="/">
          <button>Home</button>
        </Link>
        <Link href="/playlists">
          <button>Playlists</button>
        </Link>
        <Link href="/search">
          <button>Search</button>
        </Link>
      </div>

      <section></section>
    </>
  );
};
