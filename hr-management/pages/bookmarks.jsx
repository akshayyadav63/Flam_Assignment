// pages/bookmarks.jsx
import Navbar from "../components/Navbar";
import { useHRContext } from "../context/HRContext";

export default function BookmarksPage() {
  const { bookmarks, setBookmarks } = useHRContext();

  const handleRemove = (id) => {
    const updated = bookmarks.filter((u) => u.id !== id);
    setBookmarks(updated);
  };

  const handlePromote = (user) => {
    // Add promotion logic here
    console.log(`Promoting ${user.firstName} ${user.lastName}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <Navbar />
      
      {/* Header Section */}
      <div className="px-6 pt-8 pb-6">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-xl rounded-3xl p-8 border border-white/20 dark:border-gray-700/50 shadow-2xl shadow-blue-500/10">
            <div className="flex items-center gap-4 mb-2">
              <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center text-2xl">
                📌
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                  Bookmarked Employees
                </h1>
                <p className="text-gray-600 dark:text-gray-400 mt-1">
                  Your saved talent pool • {bookmarks.length} employee{bookmarks.length !== 1 ? 's' : ''}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="px-6 pb-8">
        <div className="max-w-7xl mx-auto">
          {bookmarks.length === 0 ? (
            <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-xl rounded-3xl p-12 border border-white/20 dark:border-gray-700/50 shadow-xl text-center">
              <div className="w-24 h-24 bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600 rounded-full flex items-center justify-center text-4xl mx-auto mb-6">
                📋
              </div>
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
                No bookmarks yet
              </h3>
              <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto">
                Start bookmarking employees from the dashboard to build your talent pool and keep track of promising candidates.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {bookmarks.map((user) => (
                <div
                  key={user.id}
                  className="group bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl rounded-2xl p-6 border border-white/20 dark:border-gray-700/50 shadow-lg hover:shadow-2xl hover:shadow-blue-500/20 transition-all duration-300 hover:-translate-y-2"
                >
                  {/* Profile Header */}
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-white font-bold text-lg">
                      {user.firstName[0]}{user.lastName[0]}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h2 className="font-bold text-gray-800 dark:text-white truncate">
                        {user.firstName} {user.lastName}
                      </h2>
                      <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
                        {user.email}
                      </p>
                    </div>
                  </div>

                  {/* Department Badge */}
                  <div className="mb-4">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-blue-500 to-cyan-500 text-white">
                      <div className="w-2 h-2 bg-white rounded-full mr-2"></div>
                      {user.department}
                    </span>
                  </div>

                  {/* Rating */}
                  <div className="mb-6">
                    <div className="flex items-center gap-1 mb-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <span 
                          key={i} 
                          className={`text-lg transition-all duration-200 ${
                            i < user.rating ? "text-yellow-400" : "text-gray-300 dark:text-gray-600"
                          }`}
                        >
                          {i < user.rating ? "⭐" : "☆"}
                        </span>
                      ))}
                    </div>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      {user.rating}/5 Performance Rating
                    </p>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    <button
                      onClick={() => handlePromote(user)}
                      className="flex-1 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white text-sm font-medium py-2.5 px-4 rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-green-500/25 active:scale-95"
                    >
                      Promote
                    </button>
                    <button
                      onClick={() => handleRemove(user.id)}
                      className="flex-1 bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white text-sm font-medium py-2.5 px-4 rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-red-500/25 active:scale-95"
                    >
                      Remove
                    </button>
                  </div>

                  {/* Bookmark indicator */}
                  <div className="absolute top-4 right-4 w-6 h-6 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-xs opacity-80">
                    📌
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}