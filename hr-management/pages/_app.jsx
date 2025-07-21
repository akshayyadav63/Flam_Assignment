// pages/_app.jsx
import { SessionProvider } from "next-auth/react";
import { HRProvider } from "../context/HRContext";
import { Toaster } from "react-hot-toast";
import "../styles/globals.css";

export default function App({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <HRProvider>
        <Toaster position="top-right" />
        <Component {...pageProps} />
      </HRProvider>
    </SessionProvider>
  );
}
