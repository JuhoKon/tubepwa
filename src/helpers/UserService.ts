import { BACKEND_URL } from "../lib/constants";
import axios from "axios";

const config = {
  headers: {
    "Content-Type": "application/json",
  },
};

class UserService {
  private static instance: UserService;
  constructor() {}
  public static getInstance(): UserService {
    if (!UserService.instance) {
      UserService.instance = new UserService();
    }

    return UserService.instance;
  }
  public async login(email: string, password: string): Promise<any> {
    return new Promise(async (res: any, rej: any) => {
      const body = JSON.stringify({ email, password });
      try {
        const results = await axios.post(BACKEND_URL + "/auth", body, config);
        res(results);
      } catch (error) {
        rej(error);
      }
    });
  }
  public logout(): void {}
  public async register(user: any): Promise<any> {}

  public async getUserPlaylists(token: string): Promise<any> {
    return new Promise(async (res: any, rej: any) => {
      try {
        const results = await axios.get(
          BACKEND_URL + "/auth/user",
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
