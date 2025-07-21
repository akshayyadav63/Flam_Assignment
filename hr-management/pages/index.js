// pages/index.jsx (Dashboard Homepage)
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Navbar from "../components/Navbar";
import { useHRContext } from "./_app";
import toast from "react-hot-toast";

export default function Dashboard() {
  const [users, setUsers] = useState([]);
  const router = useRouter();
  const { bookmarks, setBookmarks } = useHRContext();

  useEffect(() => {
    axios.get("https://dummyjson.com/users?limit=20").then((res) => {
      const enrichedUsers = res.data.users.map((user) => ({
        ...user,
        department: ["HR", "Engineering", "Marketing", "Finance"][Math.floor(Math.random() * 4)],
        rating: Math.ceil(Math.random() * 5),
      }));
      setUsers(enrichedUsers);
    });
  }, []);

  const handleBookmark = (user) => {
    const isAlreadyBookmarked = bookmarks.some((u) => u.id === user.id);
    if (isAlreadyBookmarked) {
      toast("Already bookmarked", { icon: "⚠️" });
      return;
    }
    const updated = [...bookmarks, user];
    setBookmarks(updated);
    toast.success("Employee bookmarked!");
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-950 dark:text-white">
      <Navbar />
      <div className="p-6">
        <h1 className="text-3xl font-semibold mb-6">Welcome to the HR Management Dashboard</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {users.map((user) => (
            <div
              key={user.id}
              className="bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-md hover:shadow-xl transition flex flex-col gap-2"
            >
              <h2 className="text-lg font-bold">
                {user.firstName} {user.lastName}
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-300">{user.email}</p>
              <p className="text-sm">Age: {user.age}</p>
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
                  className="px-2 py-1 bg-blue-500 text-white text-sm rounded hover:bg-blue-600"
                  onClick={() => router.push(`/employee/${user.id}`)}
                >
                  View
                </button>
                <button
                  className="px-2 py-1 bg-yellow-400 text-white text-sm rounded hover:bg-yellow-500"
                  onClick={() => handleBookmark(user)}
                >
                  Bookmark
                </button>
                <button className="px-2 py-1 bg-green-500 text-white text-sm rounded hover:bg-green-600">
                  Promote
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
