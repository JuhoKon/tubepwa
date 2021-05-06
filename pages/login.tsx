import { useRouter } from "next/router";
import React from "react";
import SignIn from "../src/components/auth/Login";
import Register from "../src/components/auth/Register";
import LoadingBackDrop from "../src/components/LoadingBackdrop";
import delay from "../src/helpers/Sleep";
import useCurrentUser from "../src/hooks/useCurrentUser";
import * as constants from "../src/lib/constants";

export default function Login(): React.ReactNode {
  const [initialRender, setInitialRender] = React.useState(true);
  const { user } = useCurrentUser();
  const router = useRouter();
  React.useEffect(() => {
    const checkLocalStorage = async () => {
      if (window.localStorage.getItem(constants.USER_LOCAL_STORAGE_KEY)) {
        await delay(1000);
        router.push("/");
      } else {
        setInitialRender(false);
      }
    };
    checkLocalStorage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  React.useEffect(() => {
    if (user.loggedIn) {
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
    <div style={{ backgroundColor: "white" }}>
      <LoadingBackDrop useRedux={false} show={initialRender} />
      {screenState ? (
        <Register swapToSignIn={swapToSignIn} />
      ) : (
        <SignIn swapToRegister={swapToRegister} />
      )}
    </div>
  );
}
