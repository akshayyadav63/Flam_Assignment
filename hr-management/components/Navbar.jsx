import Link from "next/link";
import { signOut } from "next-auth/react";
import { useHRContext } from "../context/HRContext";
import {
  Moon,
  Sun,
  Users,
  Bookmark,
  BarChart3,
  Settings,
  Bell,
  LogOut,
} from "lucide-react";

export default function Navbar() {
  const { darkMode, setDarkMode } = useHRContext();

  const navigationItems = [
    { href: "/", label: "Dashboard", icon: Users, color: "text-blue-600 dark:text-blue-400" },
    { href: "/bookmarks", label: "Bookmarks", icon: Bookmark, color: "text-purple-600 dark:text-purple-400" },
    { href: "/analytics", label: "Analytics", icon: BarChart3, color: "text-orange-600 dark:text-orange-400" }
  ];

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-lg bg-white/80 dark:bg-gray-900/80 border-b border-gray-200/50 dark:border-gray-700/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo/Brand Section */}
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl shadow-lg">
              <Users className="w-6 h-6 text-white" />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                HR Management
              </h1>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="flex items-center space-x-1">
            {navigationItems.map((item) => {
              const IconComponent = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="group flex items-center space-x-2 px-4 py-2 rounded-xl text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800/50 transition-all duration-200 transform hover:scale-105"
                >
                  <IconComponent className={`w-4 h-4 ${item.color} group-hover:scale-110 transition-transform duration-200`} />
                  <span className="hidden md:block">{item.label}</span>
                </Link>
              );
            })}
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-3">

            {/* Notifications */}
            <button className="relative p-2 rounded-xl text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800/50 transition-all duration-200">
              <Bell className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white dark:border-gray-900"></span>
            </button>

            {/* Settings */}
            <button className="p-2 rounded-xl text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800/50 transition-all duration-200">
              <Settings className="w-5 h-5" />
            </button>

            {/* Theme Toggle */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
              aria-label="Toggle dark mode"
            >
              {darkMode ? (
                <Sun className="w-5 h-5 animate-spin" style={{ animationDuration: '3s' }} />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </button>

            {/* User Info + Logout */}
            <div className="flex items-center space-x-3 pl-3 border-l border-gray-300 dark:border-gray-600">
              <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center text-white font-semibold text-sm shadow-lg">
                HR
              </div>
              <div className="hidden lg:block text-right">
                <p className="text-sm font-medium text-gray-900 dark:text-white">Admin</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">HR Manager</p>
              </div>

              {/* Logout Button */}
              <button
                onClick={() => signOut({ callbackUrl: "/auth/signin" })}
                className="p-2 rounded-xl text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300 hover:bg-red-100 dark:hover:bg-red-800/20 transition-all"
                title="Logout"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="h-0.5 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600"></div>
    </nav>
  );
}
