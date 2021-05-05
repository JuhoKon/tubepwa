import { NextRouter } from "next/router";
import delay from "./Sleep";

// either keep the user logged in or not.
let trulyLoggedIn = false;
/**
 *
 * @param user Current user
 * @param router The next router
 *
 * Since useCurrentUser returns a reference, useEffect does not get the most up-to-date
 * value e.g. user.loggedin. Therefore, I present a small hack to get around that
 * We use trulyLoggedIn so that when we get the confirmation that we are truly logged in
 * we don't redirect user to login (which can be annoying)!
 * This is so on refresh, we get the user-data from localstorage, and based on that
 */
const checkUser = async (
  user: { loggedIn: boolean },
  router: NextRouter,
  errorCB: any
): Promise<void> => {
  if (!user.loggedIn) {
    trulyLoggedIn = false;
  }
  if (user.loggedIn) {
    trulyLoggedIn = true;
  }
  await delay(500);

  if (!user.loggedIn) {
    console.log("reference not logged in");
    if (!trulyLoggedIn) {
      errorCB();
      router.push("/login");
    }
  }
};

export default checkUser;
