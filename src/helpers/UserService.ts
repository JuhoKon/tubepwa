import axios from "axios";
import * as constants from "../lib/constants";
import { Config, GenericObject, User } from "../types/interfaces";
import LocalStorageService from "./LocalStorageService";
import delay from "./Sleep";
import jwt from "jsonwebtoken";
/**
 * UserService. Includes methods for acting with the BE and user operations.
 */
class UserService {
  private static instance: UserService;
  private localStorageService: LocalStorageService;
  private user: User;
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
          this.tokenConfig()
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
  public async retrieveItemFromLocalStorage(
    name: string
  ): Promise<GenericObject> {
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
          this.tokenConfig()
        );
        res(results);
        this.localStorageService.setItem(
          constants.USER_LOCAL_STORAGE_KEY,
          results.data
        );
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
   * @returns Inside a promise, the user's playlists.
   *
   * Attempts to get user's playlists.
   */
  public async getCurrentUsersPlaylists(): Promise<GenericObject> {
    return new Promise(async (res, rej) => {
      try {
        const results = await axios.get(
          constants.BACKEND_URL + "/auth/user",
          this.tokenConfig()
        );
        res(results.data.playlists);
      } catch (error) {
        rej(error);
      }
    });
  }

  /**
   *
   * @returns Header object containing auth header, if it exists
   */
  public tokenConfig(): Config {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const currentUser = this.user;
    if (!currentUser && !currentUser.token) {
      return config;
    }
    config.headers["x-auth-token"] = currentUser.token;
    return config;
  }

  /**
   *
   * @returns A promise with the user, throws error if we did not succeed
   *
   * Checks for users in the localstorage, if found, checks if the token is OK and still valid.
   */
  public async getCurrentUserFromLocalStorage(): Promise<any> {
    return new Promise(async (res, rej) => {
      try {
        let user: User = (await this.localStorageService.retrieveItem(
          constants.USER_LOCAL_STORAGE_KEY
        )) as User;
        const decoded: any = jwt.decode(user.token);
        if (!decoded) {
          rej(constants.INVALID_TOKEN_ERROR);
        }
        const currentDate = new Date().getTime() / 1000;
        const diff = Math.floor(currentDate) - decoded.exp;
        if (diff > -10) {
          // Token will expire in 10 seconds, or has already expired
          rej(constants.PLEASE_LOGIN_MSG);
        }
        if (diff > -(60 * 65 * 1) + 30 && diff < -10) {
          //if token will expire in 1 hr 5mins 30 seconds && will not expire in 10seconds
          user = await this.renewUsertoken(user.token);
        }
        this.user = user;
        console.log(this.user);
        res(user);
      } catch (error) {
        rej(error);
      }
    });
  }
  /**
   *
   * @param userToken User's token. If none is supplied, will try to get one from userInstance
   * @returns A promise with new user information if succeeded, throws error if not.
   *
   * This function can be used to renew the userToken.
   */
  public async renewUsertoken(userToken = this.user.token): Promise<User> {
    return new Promise(async (res, rej) => {
      try {
        const config = {
          headers: {
            "Content-Type": "application/json",
          },
        };
        config.headers["x-auth-token"] = userToken;

        const result = await axios.get(
          constants.BACKEND_URL + "/auth/renew",
          config
        );
        console.log(this.user);
        this.user = result.data;
        console.log(this.user);
        res(result.data);
      } catch (error) {
        rej(error);
      }
    });
  }
}

export default UserService;
