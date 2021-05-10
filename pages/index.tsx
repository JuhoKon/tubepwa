import React from "react";
import { useRouter } from "next/router";
import useCurrentUser from "../src/hooks/useCurrentUser";
import checkUser from "../src/helpers/CheckUser";
import LoadingBackDrop from "../src/components/LoadingBackdrop";
import useAlert from "../src/hooks/useAlert";
import * as constants from "../src/lib/constants";
import usePlayer from "../src/hooks/usePlayer";
import BottomPlayer from "../src/components/audio/mobile/BottomPlayer/BottomPlayer";
import { Song } from "../src/types/interfaces";
import PlayerModal from "../src/components/audio/mobile/MobilePlayer/PlayerModal";

export default function Home(): React.ReactNode {
  const { initNavigator, playSong } = usePlayer();
  const { user, getUserFromLocalStorage, logout } = useCurrentUser();
  const { setErrorAlert } = useAlert();
  const router = useRouter();

  const prevStatusRef = React.useRef(false);

  const song1: Song = {
    album: { id: "a", name: "Albumi 55" },
    artists: [{ id: "d", name: "Heikki Mustonen" }],
    date: 32,
    duration: "2:23",
    resultType: "s",
    scraped: true,
    thumbnail:
      "https://www.amateurphotographer.co.uk/wp-content/uploads/2017/11/Bliss_Copyright_preview-e1511540750271.jpeg",
    title: "Routainen maa",
    uniqueId: 12,
    videoId: "AHdd65cuAIE",
  };
  const song2: Song = {
    album: { id: "a", name: "Toinen albumi" },
    artists: [{ id: "d", name: "xQc artisti vaikkapa" }],
    date: 32,
    duration: "2:23",
    resultType: "s",
    scraped: true,
    thumbnail:
      "https://images.unsplash.com/photo-1444703686981-a3abbc4d4fe3?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cGljdHVyZXxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80",
    title: "GO AGANE",
    uniqueId: 12,
    videoId: "YlKkX38NgGo",
  };
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
      <PlayerModal />
      <BottomPlayer />
      <button
        onClick={() => {
          logout();
        }}
      >
        Logout
      </button>
      <button
        onClick={() => {
          playSong(song1);
        }}
      >
        Song 1
      </button>
      <button
        onClick={() => {
          playSong(song2);
        }}
      >
        Song 2
      </button>
    </>
  );
}
