import {
  GetDataFromLocalStorageToRedux,
  GetUserInfo,
  Login,
  Logout,
  Register,
} from "../actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../types/interfaces";

function useCurrentUser(): {
  user: RootState["user"];
  login: typeof login;
  getUserInfo: typeof getUserInfo;
  logout: typeof logout;
  register: typeof register;
  getUserFromLocalStorage: typeof getUserFromLocalStorage;
} {
  /**
   * User from the Redux store.
   */
  const user = useSelector((state: RootState) => state.user);

  const dispatch = useDispatch();
  /**
   *
   * @param email User's email
   * @param password User's password
   *
   * Dispatches action for login.
   */
  const login = async (email: string, password: string): Promise<void> => {
    console.log("LOGIN");
    dispatch(Login(email, password));
  };

  /**
   * Dispatches an action which gets user information from BE, e.g. playlist ids
   */
  const getUserInfo = (): void => {
    dispatch(GetUserInfo());
  };

  /**
   * Dispatches an action which logouts
   */
  const logout = (): void => {
    dispatch(Logout());
  };

  /**
   *
   * @param name Username
   * @param email User's email
   * @param password User's password
   *
   * Dispatches an action for registering a new user
   */
  const register = async (
    name: string,
    email: string,
    password: string
  ): Promise<void> => {
    dispatch(Register(name, email, password));
  };

  /**
   * Dispatches an action, which gets data from localstorage and places them in the redux store.
   * this concerns user information e.g. previous session token etc. Used for confirming if the user
   * needs to login again e.g. has a valid and active token.
   */
  const getUserFromLocalStorage = () => {
    dispatch(GetDataFromLocalStorageToRedux());
  };
  return {
    user,
    login,
    getUserInfo,
    logout,
    register,
    getUserFromLocalStorage,
  };
}

export default useCurrentUser;
