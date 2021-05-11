import * as constants from "../lib/constants";
import UserService from "./UserService";
import { setMetaData } from "./MediaSession";
import { Song } from "../types/interfaces";

/**
 * AudioService. Handles playing audio on the application. Provides methods for controlling the audio.
 */
class AudioService {
  private static instance: AudioService;
  private UserService: UserService;
  private audioElement: HTMLAudioElement;
  private audioCtx: AudioContext;
  private analyser: AnalyserNode;
  private calculateVisualization = false;
  private calculationInterval: NodeJS.Timeout;
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
  public playSong(song: Song): Promise<void> {
    return new Promise((res, rej) => {
      if (!this.audioCtx) {
        this.init();
      }

      try {
        this.audioElement.src =
          constants.STREAM_URL + `/stream/${song.videoId}`;
        this.audioElement.play().then(() => {
          setMetaData(
            song.title,
            song.artists[0].name,
            song.album.name,
            song.thumbnail
          );
          res();
        });
      } catch (error) {
        rej(error);
      }
    });
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
    if (!this.audioElement.paused) {
      console.log("WE PLAYING");
    }
  }

  /**
   *
   * @returns Current song's duration
   */
  public getCurrentSongDuration(): number {
    return this.audioElement.duration;
  }

  /**
   *
   * @returns Current song's current time
   */
  public getCurrentSongCurrentTime(): number {
    return this.audioElement.currentTime;
  }

  /**
   *
   * @param seekValue Seconds where to seek to.
   *
   * Seeks the player to x point.
   */
  public seekTo(seekValue: number): void {
    this.audioElement.currentTime = seekValue;
  }

  public isPaused(): boolean {
    return this.audioElement.paused || !this.audioElement.currentTime
      ? true
      : false;
  }

  private init() {
    console.log("HELLO?");
    const audioCtx = new window.AudioContext();
    // Get the source
    this.audioElement.crossOrigin = "anonymous";

    const source = audioCtx.createMediaElementSource(this.audioElement);
    // Create an analyser
    const analyser = audioCtx.createAnalyser();

    // Connect parts
    source.connect(analyser);
    analyser.connect(audioCtx.destination);

    this.audioCtx = audioCtx;
    this.analyser = analyser;
  }

  public setVisualizationOn(): void {
    if (!this.analyser || !this.audioCtx) {
      return;
    }
    this.analyser.fftSize = 2 ** 8;
    const bufferLength = this.analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    // Visualisation
    const section = document.querySelector("section");

    const v = new Array(bufferLength)
      .fill("")
      .map(
        (e) => (e = document.createElement("i")) && section.appendChild(e) && e
      );
    if (this.calculationInterval) {
      clearInterval(this.calculationInterval);
    }
    this.calculationInterval = setInterval(() => {
      this.analyser.getByteTimeDomainData(dataArray);
      dataArray.forEach((d, i) =>
        v[i].style.setProperty("--c", (Math.abs(128 - d) * 2.8125) | 0)
      );
      /* console.log(dataArray); */
    }, 20);
    /* */
  }
  public setVisualizationOff(): void {
    clearInterval(this.calculationInterval);
  }
}

export default AudioService;
