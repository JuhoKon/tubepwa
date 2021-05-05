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
    const audioElement = new Audio();
    const userService = new UserService();
    this.audioElement = audioElement;
    this.UserService = userService;
    const resume = () => this.resumePlaying();
    const pause = () => this.pauseSong();
    // How will we manage playing next songs, and earlier songs?
    // Manage history in Redux maybe.
    // Can we call actions from here... Don't think we can.
    setMediaSessionActionHandlers(resume, pause, pause, pause, pause, pause);
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
