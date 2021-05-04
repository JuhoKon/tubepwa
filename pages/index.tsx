import React from "react";
import { useRouter } from "next/router";
import ReactPlayer from "react-player";
import useCurrentUser from "../src/hooks/useCurrentUser";

export default function Home(): React.ReactNode {
  const { user, localStorageTest, logout } = useCurrentUser();
  const router = useRouter();
  React.useEffect(() => {
    if (!user.loggedIn) {
      router.push("/login");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user.loggedIn]);
  React.useEffect(() => {
    localStorageTest();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  if (!user.loggedIn) {
    return null;
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
