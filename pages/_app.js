import Head from "next/head";
import Script from "next/script";
import { ContextDataProvider } from "../contexts/contextData";
import { BackgroundContextProvider } from "../contexts/background";
import "bootstrap-icons/font/bootstrap-icons.css";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <BackgroundContextProvider>
      <ContextDataProvider>
        <Component {...pageProps} />
      </ContextDataProvider>
    </BackgroundContextProvider>
  );
}

export default MyApp;
