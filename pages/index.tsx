import React from "react";
import { useRouter } from "next/router";
import useCurrentUser from "../src/hooks/useCurrentUser";
import checkUser from "../src/helpers/CheckUser";
import LoadingBackDrop from "../src/components/LoadingBackdrop";
import useAlert from "../src/hooks/useAlert";
import * as constants from "../src/lib/constants";
import usePlayer from "../src/hooks/usePlayer";

import { Song } from "../src/types/interfaces";

import useNavigation from "../src/hooks/useNavigation";
import PlaylistsScreen from "../src/components/screens/Playlists/Playlists";

export default function Home(): React.ReactNode {
  console.log("AM I BEING RE-RENDERED");
  /*   const { initNavigator } = usePlayer(); */
  const { user, getUserFromLocalStorage } = useCurrentUser();
  const { setErrorAlert } = useAlert();
  const { nav } = useNavigation();
  const router = useRouter();

  const prevStatusRef = React.useRef(false);

  // INITIAL HIT ON THE INDEX PAGE
  React.useEffect(() => {
    /*   initNavigator(); */
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
  const RenderResult = () => {
    switch (nav.currentScreen) {
      case constants.SCREEN_1:
        return <Screen_1 />;

      case constants.SCREEN_2:
        return <PlaylistsScreen />;

      case constants.SCREEN_3:
        return <PlaylistsScreen />;

      case constants.SCREEN_4:
        return <Screen_4 />;

      default:
        return <Screen_1 />;
    }
  };
  return <RenderResult />;
}
const Screen_1 = () => {
  const { playSong, showVisualization, hideVisualization } = usePlayer();
  const { logout } = useCurrentUser();

  const song1: Song = {
    album: { id: "a", name: "Albumi 55" },
    artists: [{ id: "d", name: "Heikki Mustonen" }],
    date: 32,
    duration: "2:23",
    resultType: "s",
    scraped: true,
    thumbnail:
      "https://lh3.googleusercontent.com/gGh9tG3b8AdjIveO5SrQMm3tBx5aWhh2ZD0h5Kgx6QfcqUUMKIHhltVXIGK--TgcDZlsESxKG7Z2j1Zw=w120-h120-s-l90-rj",
    title: "Routainen maa",
    uniqueId: 12,
    videoId: "AHdd65cuAIE",
  };
  const song2: Song = {
    album: { id: "a", name: "Toinen albumi" },
    artists: [{ id: "d", name: "deadmau5" }],
    date: 32,
    duration: "2:23",
    resultType: "s",
    scraped: true,
    thumbnail:
      "https://lh3.googleusercontent.com/gGh9tG3b8AdjIveO5SrQMm3tBx5aWhh2ZD0h5Kgx6QfcqUUMKIHhltVXIGK--TgcDZlsESxKG7Z2j1Zw=w120-h120-s-l90-rj",
    title: "Polyphobia",
    uniqueId: 12,
    videoId: "SwE612H1WLs",
  };
  return (
    <>
      <button onClick={showVisualization}>Show</button>
      <button onClick={hideVisualization}>Hide</button>
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
      <button
        onClick={() => {
          logout();
        }}
      >
        Logout
      </button>
      <section></section>
    </>
  );
};
const Screen_2 = () => {
  console.log("I AM BEING RE_RENDERED");
  return <button>Screen 2</button>;
};
const Screen_3 = () => {
  return <button>Screen 3</button>;
};
const Screen_4 = () => {
  return <button>Screen 4</button>;
};
