// pages/bookmarks.jsx
import Navbar from "../components/Navbar";
import { useHRContext } from "./_app";

export default function BookmarksPage() {
  const { bookmarks, setBookmarks } = useHRContext();

  const handleRemove = (id) => {
    const updated = bookmarks.filter((u) => u.id !== id);
    setBookmarks(updated);
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-950 dark:text-white">
      <Navbar />
      <div className="p-6">
        <h1 className="text-2xl font-semibold mb-4">📌 Bookmarked Employees</h1>
        {bookmarks.length === 0 ? (
          <p>No bookmarks yet.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {bookmarks.map((user) => (
              <div
                key={user.id}
                className="bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-md hover:shadow-xl transition flex flex-col gap-2"
              >
                <h2 className="text-lg font-bold">
                  {user.firstName} {user.lastName}
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-300">{user.email}</p>
                <span className="inline-block bg-blue-100 text-blue-700 text-xs font-medium px-2 py-1 rounded">
                  {user.department}
                </span>
                <div className="flex gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <span key={i}>{i < user.rating ? "⭐" : "☆"}</span>
                  ))}
                </div>
                <div className="flex gap-2 mt-2">
                  <button
                    className="px-2 py-1 bg-green-500 text-white text-sm rounded hover:bg-green-600"
                  >
                    Promote
                  </button>
                  <button
                    className="px-2 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-600"
                    onClick={() => handleRemove(user.id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
