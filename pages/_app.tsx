import Head from "next/head";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import { AppProps } from "next/app";

import "../styles/globals.css";

function App({ Component, pageProps }: AppProps) {
  return (
    <UserProvider>
      <Head>
        <link rel="icon" href="/favicon.png" />
      </Head>
      <Component {...pageProps} />
    </UserProvider>
  );
}

export default App;
