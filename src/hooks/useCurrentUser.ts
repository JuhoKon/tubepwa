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
  login: (email: string, password: string) => Promise<void>;
  getUserInfo: () => void;
  logout: () => void;
  register: (name: string, email: string, password: string) => Promise<void>;
  getUserFromLocalStorage: () => Promise<void>;
} {
  const user = useSelector((state: RootState) => state.user);

  const dispatch = useDispatch();

  const login = async (email: string, password: string): Promise<void> => {
    console.log("LOGIN");
    dispatch(Login(email, password));
  };
  const getUserInfo = (): void => {
    dispatch(GetUserInfo());
  };
  const logout = (): void => {
    dispatch(Logout());
  };
  const register = async (
    name: string,
    email: string,
    password: string
  ): Promise<void> => {
    dispatch(Register(name, email, password));
  };
  const getUserFromLocalStorage = async () => {
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
