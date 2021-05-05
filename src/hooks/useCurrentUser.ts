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
  user: any;
  login: (email: string, password: string) => Promise<void>;
  getUserInfo: (token: string) => void;
  logout: () => void;
  register: (name: string, email: string, password: string) => Promise<void>;
  localStorageTest: () => Promise<void>;
} {
  const user = useSelector((state: RootState) => state.user);

  const dispatch = useDispatch();

  const login = async (email: string, password: string): Promise<void> => {
    dispatch(Login(email, password));
  };
  const getUserInfo = (token: string): void => {
    dispatch(GetUserInfo(token));
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
  const localStorageTest = async () => {
    dispatch(GetDataFromLocalStorageToRedux());
  };
  return { user, login, getUserInfo, logout, register, localStorageTest };
}

export default useCurrentUser;
