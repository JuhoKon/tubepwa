const abc = () => {
  if ("mediaSession" in navigator) {
    navigator.mediaSession.metadata = new MediaMetadata({
      title: "Unforgettable",
      artist: "Nat King Cole",
      album: "The Ultimate Collection (Remastered)",
      artwork: [
        {
          src:
            "https://i.gyazo.com/thumb/1200/018d388bde5ddee44aea7422f383d0eb-png.jpg",
          sizes: "",
          type: "image/png",
        },
      ],
    });

    navigator.mediaSession.setActionHandler("play", function () {
      console.log("PAINOIT PLAYTÄ :D");
    });
    navigator.mediaSession.setActionHandler("pause", function () {
      console.log("PAINOIT JOTAKII");
    });
    navigator.mediaSession.setActionHandler("stop", function () {
      console.log("PAINOIT JOTAKII");
    });
    navigator.mediaSession.setActionHandler("seekto", function () {
      console.log("PAINOIT JOTAKII");
    });
    navigator.mediaSession.setActionHandler("previoustrack", function () {
      console.log("PAINOIT JOTAKII");
    });
    navigator.mediaSession.setActionHandler("nexttrack", function () {
      console.log("PAINOIT SEURAAVAA :D");
    });
    navigator.mediaSession.setActionHandler("skipad", function () {
      console.log("PAINOIT JOTAKII");
    });
  }
};
export default abc;
