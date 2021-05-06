export const setMetaData = (
  title: string,
  artist: string,
  album: string,
  thumbnailURL: string
): void => {
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
  playCB: () => void,
  pauseCB: () => void,
  stopCB: () => void,
  seekToCB: () => void,
  previousTrackCB: () => void,
  nextTrackCB: () => void
): void => {
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
