import Head from "next/head";
import { Provider } from "react-redux";
import { useStore } from "../src/store/store";
import "../styles/globals.css";
import BottomNav from "../src/components/BottomNav";
import AlertComponent from "../src/components/Alert";
import LoadingBackdrop from "../src/components/LoadingBackdrop";
import React from "react";
import { ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import theme from "../src/lib/theme";
import BottomPlayer from "../src/components/audio/mobile/BottomPlayer/BottomPlayer";

export default function MyApp({ Component, pageProps }) {
  const store: any = useStore(pageProps.initialReduxState);

  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no"
        />
        <meta name="description" content="Description" />
        <meta name="keywords" content="Keywords" />
        <title>TubeMusic</title>

        <link rel="manifest" href="/manifest.json" />
        <link
          href="/icons/favicon-16x16.png"
          rel="icon"
          type="image/png"
          sizes="16x16"
        />
        <link
          href="/icons/favicon-32x32.png"
          rel="icon"
          type="image/png"
          sizes="32x32"
        />
        <link rel="apple-touch-icon" href="/apple-icon.png"></link>

        <link
          href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;600;700;800&display=swap"
          rel="stylesheet"
        />

        <meta name="theme-color" content="#317EFB" />
      </Head>

      <Provider store={store}>
        <ThemeProvider theme={theme}>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline />
          <Component {...pageProps} />
          <BottomNav />
          <AlertComponent />
          <LoadingBackdrop />
          <BottomPlayer />
        </ThemeProvider>
      </Provider>
    </>
  );
}
