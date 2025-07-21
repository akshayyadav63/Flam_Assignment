// components/Navbar.jsx
import Link from "next/link";
import { useHRContext } from "../pages/_app";
import { Moon, Sun } from "lucide-react";

export default function Navbar() {
  const { darkMode, setDarkMode } = useHRContext();

  return (
    <nav className="flex items-center justify-between px-6 py-4 shadow bg-white dark:bg-gray-900 dark:text-white">
      <div className="flex gap-4 font-semibold">
        <Link href="/">🏠 Dashboard</Link>
        <Link href="/search">🔍 Search</Link>
        <Link href="/bookmarks">📌 Bookmarks</Link>
        <Link href="/analytics">📊 Analytics</Link>
      </div>
      <button
        onClick={() => setDarkMode(!darkMode)}
        className="rounded-full p-2 bg-gray-200 dark:bg-gray-700 hover:scale-105 transition"
      >
        {darkMode ? <Sun size={18} /> : <Moon size={18} />}
      </button>
    </nav>
  );
}
