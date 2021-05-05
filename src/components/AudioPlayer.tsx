import React from "react";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import * as constants from "../lib/constants";
// import 'react-h5-audio-player/lib/styles.less' Use LESS
// import 'react-h5-audio-player/src/styles.scss' Use SASS

const Player = () => {
  const [file, setFile] = React.useState("");

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
        }
      } catch (error) {}
    };
    getJutska();
  }, []);
  return (
    <>
      {file ? (
        <AudioPlayer
          style={{
            position: "absolute",
            bottom: "56px",
          }}
          autoPlay
          src={file}
          onPlay={(e) => console.log("onPlay")}
          // other props here
        />
      ) : null}
    </>
  );
};
export default Player;
