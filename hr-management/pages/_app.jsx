// pages/_app.jsx
import "../styles/globals.css";
import { useEffect, useState, createContext, useContext } from "react";
import { Toaster } from "react-hot-toast";

export const HRContext = createContext();

export function useHRContext() {
  return useContext(HRContext);
}

export default function App({ Component, pageProps }) {
  const [bookmarks, setBookmarks] = useState([]);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("bookmarked") || "[]");
    setBookmarks(stored);
  }, []);

  useEffect(() => {
    localStorage.setItem("bookmarked", JSON.stringify(bookmarks));
  }, [bookmarks]);

  return (
    <HRContext.Provider value={{ bookmarks, setBookmarks, darkMode, setDarkMode }}>
      <div className={darkMode ? "dark" : ""}>
        <Toaster position="top-right" />
        <Component {...pageProps} />
      </div>
    </HRContext.Provider>
  );
}
