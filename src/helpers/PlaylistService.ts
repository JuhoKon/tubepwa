/* eslint-disable no-async-promise-executor */
import axios from 'axios';

import * as constants from '../lib/constants';
import { PlaylistResponse } from '../types/interfaces';

import UserService from './UserService';

/**
 * PlaylistService. Includes methods for acting with the BE and playlist operations.
 */
class PlaylistService {
  private static instance: PlaylistService;
  private UserService: UserService;
  constructor() {
    const userService = UserService.getInstance();
    this.UserService = userService;
  }
  public static getInstance(): PlaylistService {
    if (!PlaylistService.instance) {
      PlaylistService.instance = new PlaylistService();
    }
    return PlaylistService.instance;
  }

  public async retrievePlaylistById(id: string): Promise<PlaylistResponse> {
    return new Promise(async (res, rej) => {
      try {
        const results = await axios.get(
          constants.BACKEND_URL + `/playlists/find/${id}`,
          this.UserService.tokenConfig()
        );
        res(results.data);
      } catch (error) {
        rej(error);
      }
    });
  }
}

export default PlaylistService;
