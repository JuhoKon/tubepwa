import React from "react";
import { useRouter } from "next/router";
import ReactPlayer from "react-player";
import useCurrentUser from "../src/hooks/useCurrentUser";
import checkUser from "../src/helpers/CheckUser";
import LoadingBackDrop from "../src/components/LoadingBackdrop";
import useAlert from "../src/hooks/useAlert";
import * as constants from "../src/lib/constants";

export default function Home(): React.ReactNode {
  const { user, getUserFromLocalStorage, logout } = useCurrentUser();
  const { setErrorAlert } = useAlert();
  const router = useRouter();

  const prevStatusRef = React.useRef(false);
  // INITIAL HIT ON THE INDEX PAGE
  React.useEffect(() => {
    if (!user.loggedIn) {
      getUserFromLocalStorage();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // USER.LOGGEDIN STATUS CHANGES TRIGGERS THIS
  React.useEffect(() => {
    if (prevStatusRef.current === true && user.loggedIn === false) {
      router.push("/login");
    } else {
      const errorCB = () => setErrorAlert(constants.PLEASE_LOGIN_MSG);
      prevStatusRef.current = user.loggedIn;
      checkUser(user, router, errorCB);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user.loggedIn]);

  if (!user.loggedIn) {
    return <LoadingBackDrop useRedux={false} show={true} />;
  }
  return (
    <>
      <ReactPlayer url="https://www.youtube.com/watch?v=ysz5S6PUM-U" />
      {/*       <BottomNav /> */}
      <button
        onClick={() => {
          logout();
        }}
      >
        Logout
      </button>
    </>
  );
}
