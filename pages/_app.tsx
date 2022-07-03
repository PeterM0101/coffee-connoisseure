import "../styles/globals.scss";
import type { AppProps } from "next/app";
import CoffeeStoresContextProvider from "../context";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <CoffeeStoresContextProvider>
      <Component {...pageProps} />
    </CoffeeStoresContextProvider>
  );
}

export default MyApp;
