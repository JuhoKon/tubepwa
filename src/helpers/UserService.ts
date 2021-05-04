import axios from "axios";
import * as constants from "../lib/constants";
import { GenericObject } from "../types/interfaces";
import LocalStorageService from "./LocalStorageService";
import delay from "./Sleep";

const config = {
  headers: {
    "Content-Type": "application/json",
  },
};
/**
 * UserService. Includes methods for acting with the BE and user operations.
 */
class UserService {
  private static instance: UserService;
  private localStorageService: LocalStorageService;
  constructor() {
    const localStorageService = LocalStorageService.getInstance();
    this.localStorageService = localStorageService;
  }
  public static getInstance(): UserService {
    if (!UserService.instance) {
      UserService.instance = new UserService();
    }

    return UserService.instance;
  }
  // Have to add localStorage handling somewhere here...
  /**
   *
   * @param email User's email
   * @param password User's password
   * @returns Promise<GenericObject>, return a promise of an object consisting the results from BE.
   *
   * Attempts to login the user. Also updates the localstorage, if successful.
   */
  public async login(email: string, password: string): Promise<GenericObject> {
    await delay(500); // Artificial delay so we don't get "too fast" login lömao
    return new Promise(async (res, rej) => {
      const body = JSON.stringify({ email, password });
      try {
        const results = await axios.post(
          constants.BACKEND_URL + "/auth",
          body,
          config
        );
        res(results);
        this.localStorageService.setItem(
          constants.USER_LOCAL_STORAGE_KEY,
          results.data
        );
      } catch (error) {
        rej(error);
      }
    });
  }
  /**
   *
   * @param name Checks localstorage for an item.
   * @returns The item from the localstorage.
   *
   * Used for getting the user's data from localstorage.
   * TODO: should also check if the token from the data is valid.
   */
  public async checkLocalStorage(name: string): Promise<GenericObject> {
    try {
      const item = await this.localStorageService.retrieveItem(name);
      return item;
    } catch (error) {
      throw error;
    }
  }
  /**
   * Clears user's localstorage.
   */
  public logout(): void {
    this.localStorageService.removeItem(constants.USER_LOCAL_STORAGE_KEY);
  }
  /**
   *
   * @param name User's username
   * @param email User's email
   * @param password User's password
   * @returns Promise<GenericObject>, returns the BE results for the registration, or throws error based on the BE answer:
   *
   * Attempts to register a new user.
   */
  public async register(
    name: string,
    email: string,
    password: string
  ): Promise<GenericObject> {
    await delay(500); // Artificial delay so we don't get "too fast" login lömao
    return new Promise(async (res, rej) => {
      const body = JSON.stringify({
        name,
        email,
        role: "User", // We can write here whatever, BE can only create normal users (whew)
        password,
      });
      try {
        const results = await axios.post(
          constants.BACKEND_URL + "/users/create",
          body,
          config
        );
        res(results);
      } catch (error) {
        if (error.response) {
          console.log(error.response);
          if (error.response.data?.error[0]?.name) {
            rej(error.response.data?.error[0]?.name);
          }
          if (error.response.data?.error[0]?.password) {
            rej(error.response.data?.error[0]?.password);
          }
          if (error.response.data?.error[0]?.email) {
            rej(error.response.data?.error[0]?.email);
          }
          if (error.response.data?.error) {
            rej(error.response.data?.error);
          }
        }
        rej(constants.UNKNOWN_ERROR);
      }
    });
  }
  /**
   *
   * @param token User's auth token
   * @returns Inside a promise, the user's playlists.
   *
   * Attempts to get user's playlists.
   */
  public async getUserPlaylists(token: string): Promise<GenericObject> {
    return new Promise(async (res, rej) => {
      try {
        const results = await axios.get(
          constants.BACKEND_URL + "/auth/user",
          tokenConfig(token)
        );
        res(results.data.playlists);
      } catch (error) {
        rej(error);
      }
    });
  }
}

const tokenConfig = (token: string) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  config.headers["x-auth-token"] = token;
  return config;
};

export default UserService;
