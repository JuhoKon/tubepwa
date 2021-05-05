import React from "react";
import SignIn from "../src/components/auth/Login";
import Register from "../src/components/auth/Register";

export default function Login(): React.ReactNode {
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
