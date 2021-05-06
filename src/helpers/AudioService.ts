import * as constants from "../lib/constants";
import UserService from "./UserService";
import { setMetaData, setMediaSessionActionHandlers } from "./MediaSession";

/**
 * AudioService. Handles playing audio on the application. Provides methods for controlling the audio.
 */
class AudioService {
  private static instance: AudioService;
  private UserService: UserService;
  private audioElement: HTMLAudioElement;
  constructor() {
    // when SSR this doesn't as we need to access the browser APIs
    // somehow when we do this at constructor, it gets later on run on the browser...
    if (process.browser) {
      const audioElement = new Audio();
      this.audioElement = audioElement;
    }
    const userService = new UserService();
    this.UserService = userService;
  }

  public static getInstance(): AudioService {
    if (!AudioService.instance) {
      AudioService.instance = new AudioService();
    }
    return AudioService.instance;
  }
  // We probably want a complete song to be thrown here
  // with metadata etc. so we can do something with them
  // logic like this: User wants to play something -> dispatch -> songService -> reducer -> all happy
  public playSong(videoId: string): void {
    this.audioElement.src = constants.STREAM_URL + `/stream/${videoId}`;
    this.audioElement.play();
    setMetaData(
      "Title",
      "Artisti X",
      "Albumi Y",
      "https://i.gyazo.com/thumb/1200/018d388bde5ddee44aea7422f383d0eb-png.jpg"
    );
  }
  /**
   * Pauses current song.
   */
  public pauseSong(): void {
    this.audioElement.pause();
  }
  /**
   * Resumes playing the current song.
   */
  public resumePlaying(): void {
    this.audioElement.play();
  }
}

export default AudioService;
