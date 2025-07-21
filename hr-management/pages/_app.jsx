// pages/_app.jsx
import "../styles/globals.css";
import { HRProvider } from '@/context/HRContext';
import { Toaster } from "react-hot-toast";

export default function App({ Component, pageProps }) {
  return (
    <HRProvider>
      <Toaster position="top-right" />
      <Component {...pageProps} />
    </HRProvider>
  );
}
