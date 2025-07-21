// context/HRContext.js
import { createContext, useContext, useEffect, useState } from "react";

const HRContext = createContext();

export function useHRContext() {
  const context = useContext(HRContext);
  if (!context) {
    throw new Error('useHRContext must be used within an HRProvider');
  }
  return context;
}

export function HRProvider({ children }) {
  const [bookmarks, setBookmarks] = useState([]);
  const [darkMode, setDarkMode] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize theme from localStorage or system preference
  useEffect(() => {
    const initializeTheme = () => {
      try {
        const savedTheme = localStorage.getItem("hr-theme");
        const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        
        if (savedTheme === "dark" || (!savedTheme && systemPrefersDark)) {
          setDarkMode(true);
          document.documentElement.classList.add("dark");
        } else {
          setDarkMode(false);
          document.documentElement.classList.remove("dark");
        }
      } catch (error) {
        console.error("Error initializing theme:", error);
        setDarkMode(false);
      } finally {
        setIsLoading(false);
      }
    };

    initializeTheme();
  }, []);

  // Load bookmarks from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem("hr-bookmarks");
      if (stored) {
        const parsedBookmarks = JSON.parse(stored);
        setBookmarks(Array.isArray(parsedBookmarks) ? parsedBookmarks : []);
      }
    } catch (error) {
      console.error("Error loading bookmarks:", error);
      setBookmarks([]);
    }
  }, []);

  // Save bookmarks to localStorage
  useEffect(() => {
    try {
      localStorage.setItem("hr-bookmarks", JSON.stringify(bookmarks));
    } catch (error) {
      console.error("Error saving bookmarks:", error);
    }
  }, [bookmarks]);

  // Handle dark mode toggle
  useEffect(() => {
    if (isLoading) return;

    try {
      const html = document.documentElement;
      
      if (darkMode) {
        html.classList.add("dark");
        localStorage.setItem("hr-theme", "dark");
      } else {
        html.classList.remove("dark");
        localStorage.setItem("hr-theme", "light");
      }
    } catch (error) {
      console.error("Error applying theme:", error);
    }
  }, [darkMode, isLoading]);

  // Add bookmark utility function
  const addBookmark = (item) => {
    setBookmarks(prev => {
      const exists = prev.some(bookmark => bookmark.id === item.id);
      if (!exists) {
        return [...prev, { ...item, bookmarkedAt: new Date().toISOString() }];
      }
      return prev;
    });
  };

  // Remove bookmark utility function
  const removeBookmark = (id) => {
    setBookmarks(prev => prev.filter(bookmark => bookmark.id !== id));
  };

  // Check if item is bookmarked
  const isBookmarked = (id) => {
    return bookmarks.some(bookmark => bookmark.id === id);
  };

  // Toggle bookmark
  const toggleBookmark = (item) => {
    if (isBookmarked(item.id)) {
      removeBookmark(item.id);
    } else {
      addBookmark(item);
    }
  };

  // Listen for system theme changes
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleChange = (e) => {
      const savedTheme = localStorage.getItem("hr-theme");
      if (!savedTheme) {
        setDarkMode(e.matches);
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const contextValue = {
    // Theme
    darkMode,
    setDarkMode,
    isLoading,
    
    // Bookmarks
    bookmarks,
    setBookmarks,
    addBookmark,
    removeBookmark,
    isBookmarked,
    toggleBookmark,
  };

  return (
    <HRContext.Provider value={contextValue}>
      {children}
    </HRContext.Provider>
  );
}