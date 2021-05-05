export const setMetaData = (title, artist, album, thumbnailURL) => {
  if ("mediaSession" in navigator) {
    navigator.mediaSession.metadata = new MediaMetadata({
      title: title,
      artist: artist,
      album: album,
      artwork: [
        {
          src: thumbnailURL,
          sizes: "",
          type: "image/png",
        },
      ],
    });
  }
};
export const setMediaSessionActionHandlers = (
  playCB,
  pauseCB,
  stopCB,
  seekToCB,
  previousTrackCB,
  nextTrackCB
) => {
  if ("mediaSession" in navigator) {
    navigator.mediaSession.setActionHandler("play", function () {
      playCB();
    });
    navigator.mediaSession.setActionHandler("pause", function () {
      pauseCB();
    });
    navigator.mediaSession.setActionHandler("stop", function () {
      stopCB();
    });
    navigator.mediaSession.setActionHandler("seekto", function () {
      seekToCB();
    });
    navigator.mediaSession.setActionHandler("previoustrack", function () {
      previousTrackCB();
    });
    navigator.mediaSession.setActionHandler("nexttrack", function () {
      nextTrackCB();
    });
  }
};
