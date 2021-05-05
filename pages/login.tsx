import { useRouter } from "next/router";
import React from "react";
import SignIn from "../src/components/auth/Login";
import Register from "../src/components/auth/Register";
import useCurrentUser from "../src/hooks/useCurrentUser";
import * as constants from "../src/lib/constants";

export default function Login(): React.ReactNode {
  const { user } = useCurrentUser();
  const router = useRouter();
  React.useEffect(() => {
    if (
      window.localStorage.getItem(constants.USER_LOCAL_STORAGE_KEY) ||
      user.loggedIn
    ) {
      // User has no token nor had a one
      router.push("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user.loggedIn]);

  const [screenState, setScreenState] = React.useState(0);

  const swapToSignIn = () => {
    setScreenState(0);
  };
  const swapToRegister = () => {
    setScreenState(1);
  };

  return (
    <React.Fragment>
      {screenState ? (
        <Register swapToSignIn={swapToSignIn} />
      ) : (
        <SignIn swapToRegister={swapToRegister} />
      )}
    </React.Fragment>
  );
}
