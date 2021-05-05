import axios from "axios";
import * as constants from "../lib/constants";
import { Config, GenericObject, User } from "../types/interfaces";
import LocalStorageService from "./LocalStorageService";
import delay from "./Sleep";
import UserService from "./UserService";

class AudioService {
  private static instance: AudioService;
  private UserService: UserService;
  private audioElement: HTMLAudioElement;
  constructor() {
    const audioElement = new Audio();
    const userService = new UserService();

    this.audioElement = audioElement;
    this.UserService = userService;
  }

  public static getInstance(): AudioService {
    if (!AudioService.instance) {
      AudioService.instance = new AudioService();
    }
    return AudioService.instance;
  }
  public getAudioDataStream(videoId: string) {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append(
      "x-auth-token",
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlNGMzOWQ3NmE0N2FiNmViNGY2OTRjNSIsInJvbGUiOiJBZG1pbiIsImlhdCI6MTYyMDIzNzAzOCwiZXhwIjoxNjIwMjQ0MjM4fQ._ScDV87T79czkQ_m7kgMYP9ppNKyUIRwPWtPO_XDLl8"
    );
    const myInit: RequestInit = {
      method: "GET",
      headers: myHeaders,
      mode: "cors",
    };
    const myRequest = new Request(
      constants.STREAM_URL + "/stream/YlKkX38NgGo",
      myInit
    );

    fetch(myRequest)
      .then(function (response) {
        return response.arrayBuffer();
      })
      .then(function (buffer) {
        return buffer;
        /* console.log("buffer", buffer);
        audioCtx.decodeAudioData(buffer, function (decodedData) {
          source.buffer = decodedData;
          source.connect(audioCtx.destination);
          source.start(0);
        }); */
      });
  }
}

export default AudioService;
