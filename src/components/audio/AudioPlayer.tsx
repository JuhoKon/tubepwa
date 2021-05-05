import React from "react";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import * as constants from "../../lib/constants";
import MediaSession from "../../helpers/MediaSession";
import useNavigation from "../../hooks/useNavigation";

const Player = () => {
  const [file, setFile] = React.useState("a");
  const { nav } = useNavigation();

  React.useEffect(() => {
    const getJutska = async () => {
      try {
        const config = {
          headers: {
            "Content-Type": "application/json",
            "x-auth-token":
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlNGMzOWQ3NmE0N2FiNmViNGY2OTRjNSIsInJvbGUiOiJBZG1pbiIsImlhdCI6MTYyMDIyMzM1NywiZXhwIjoxNjIwMjMwNTU3fQ.Jqc-Z5mxHNcZ_xxywBdxsdZaUG1k9i0YjLox46I7Q8M",
          },
        };
        console.log("A");
        const result = await fetch(
          constants.STREAM_URL + "/stream/YlKkX38NgGo",
          config
        );

        const blob = await result.blob();
        console.log(blob);
        if (blob) {
          setFile(URL.createObjectURL(blob));
          MediaSession();
        }
      } catch (error) {}
    };

    /* getJutska(); */
  }, []);

  if (!nav.showBottomNav) {
    return null;
  }

  return (
    <>
      {file ? (
        <button
          onClick={() => {
            getData();
          }}
        >
          Paina tästä nii lähtee
        </button>
      ) : /* <AudioPlayer
          style={{
            position: "absolute",
            bottom: "56px",
          }}
          autoPlay
          src={file}
          onPlay={(e) => console.log("onPlay")}
          // other props here
        /> */
      null}
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
