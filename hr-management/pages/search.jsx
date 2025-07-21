// pages/search.jsx
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";

export default function SearchPage() {
  const [users, setUsers] = useState([]);
  const [query, setQuery] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState([]);
  const [ratingFilter, setRatingFilter] = useState([]);

  useEffect(() => {
    fetch("https://dummyjson.com/users?limit=20")
      .then((res) => res.json())
      .then((data) => {
        const enrichedUsers = data.users.map((user) => ({
          ...user,
          department: ["HR", "Engineering", "Marketing", "Finance"][Math.floor(Math.random() * 4)],
          rating: Math.ceil(Math.random() * 5),
        }));
        setUsers(enrichedUsers);
      });
  }, []);

  const filtered = users.filter((user) => {
    const searchMatch =
      user.firstName.toLowerCase().includes(query.toLowerCase()) ||
      user.lastName.toLowerCase().includes(query.toLowerCase()) ||
      user.email.toLowerCase().includes(query.toLowerCase()) ||
      user.department.toLowerCase().includes(query.toLowerCase());

    const deptMatch =
      departmentFilter.length === 0 || departmentFilter.includes(user.department);

    const ratingMatch = ratingFilter.length === 0 || ratingFilter.includes(user.rating);

    return searchMatch && deptMatch && ratingMatch;
  });

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-950 dark:text-white">
      <Navbar />
      <div className="p-6">
        <h1 className="text-2xl font-semibold mb-4">🔍 Search & Filter Employees</h1>
        <div className="flex gap-4 flex-wrap mb-6">
          <input
            type="text"
            placeholder="Search by name, email, department..."
            className="p-2 rounded border w-full sm:w-auto"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <select
            multiple
            className="p-2 rounded border"
            onChange={(e) =>
              setDepartmentFilter(
                Array.from(e.target.selectedOptions, (opt) => opt.value)
              )
            }
          >
            <option value="HR">HR</option>
            <option value="Engineering">Engineering</option>
            <option value="Marketing">Marketing</option>
            <option value="Finance">Finance</option>
          </select>
          <select
            multiple
            className="p-2 rounded border"
            onChange={(e) =>
              setRatingFilter(
                Array.from(e.target.selectedOptions, (opt) => parseInt(opt.value))
              )
            }
          >
            {[1, 2, 3, 4, 5].map((rating) => (
              <option key={rating} value={rating}>
                {rating} Star{rating > 1 && "s"}
              </option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filtered.map((user) => (
            <div
              key={user.id}
              className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow"
            >
              <h2 className="text-lg font-bold">
                {user.firstName} {user.lastName}
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-300">{user.email}</p>
              <p className="text-sm">{user.department}</p>
              <div className="flex gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <span key={i}>{i < user.rating ? "⭐" : "☆"}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
