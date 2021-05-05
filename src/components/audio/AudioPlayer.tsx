import React from "react";
import "react-h5-audio-player/lib/styles.css";
import * as constants from "../../lib/constants";
import useNavigation from "../../hooks/useNavigation";
import AudioService from "../../helpers/AudioService";

const Player = () => {
  // TEMP HACKS
  const a = {
    playSong: (msg: string) => {
      console.log("A");
    },
  };

  const [audioService, setAudioService] = React.useState(a);
  React.useEffect(() => {
    const audioService: any = AudioService.getInstance();
    setAudioService(audioService);
  });
  const { nav } = useNavigation();

  if (!nav.showBottomNav) {
    return null;
  }

  return (
    <>
      <button
        onClick={() => {
          if (audioService) {
            audioService?.playSong("BUE8JDWsTWo");
          }
        }}
      >
        Paina tästä nii lähtee
      </button>
      <button
        onClick={() => {
          if (audioService) {
            audioService?.playSong("G1IbRujko-A");
          }
        }}
      >
        Paina tästä nii lähtee 2
      </button>
    </>
  );
};

function getData() {
  const audioElement = new Audio(constants.STREAM_URL + "/stream/G1IbRujko-A");
  audioElement.play();
  /* const AudioContext = window.AudioContext;
  const audioCtx = new AudioContext();
  const source = audioCtx.createBufferSource();
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
      console.log("Reply");
      return response.arrayBuffer();
    })
    .then(function (buffer) {
      console.log("buffer", buffer);
      audioCtx.decodeAudioData(buffer, function (decodedData) {
        source.buffer = decodedData;
        source.connect(audioCtx.destination);
        source.start(0);
      });
    }); */
}

export default Player;
