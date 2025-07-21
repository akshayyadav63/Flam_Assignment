// pages/employee/[id].jsx
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";

const tabs = ["Overview", "Projects", "Feedback"];

export default function EmployeeDetails() {
  const router = useRouter();
  const { id } = router.query;
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState("Overview");

  useEffect(() => {
    if (id) {
      fetch(`https://dummyjson.com/users/${id}`)
        .then((res) => res.json())
        .then((data) => {
          data.department = ["HR", "Engineering", "Marketing", "Finance"][
            Math.floor(Math.random() * 4)
          ];
          data.rating = Math.ceil(Math.random() * 5);
          setUser(data);
        });
    }
  }, [id]);

  if (!user) return <div className="p-6">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-950 dark:text-white">
      <Navbar />
      <div className="p-6 max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-2">
          {user.firstName} {user.lastName}
        </h1>
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
          {user.email} • {user.phone}
        </p>
        <span className="inline-block mb-4 px-3 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded">
          {user.department}
        </span>
        <div className="flex gap-1 mb-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <span key={i}>{i < user.rating ? "⭐" : "☆"}</span>
          ))}
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-4 mb-6 border-b pb-2">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-1 border-b-2 transition font-medium ${
                activeTab === tab
                  ? "border-blue-500 text-blue-500"
                  : "border-transparent hover:text-blue-400"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div>
          {activeTab === "Overview" && (
            <div>
              <p className="mb-2">🏡 Address: {user.address.address}</p>
              <p className="mb-2">📝 Bio: Enthusiastic team player with great potential.</p>
              <p className="mb-2">📈 Recent Rating History:</p>
              <ul className="list-disc ml-5">
                {[1, 2, 3].map((v, i) => (
                  <li key={i}>
                    Quarter {i + 1}: {Math.ceil(Math.random() * 5)} stars
                  </li>
                ))}
              </ul>
            </div>
          )}
          {activeTab === "Projects" && (
            <div>
              <ul className="list-disc ml-5">
                <li>Onboarding Revamp</li>
                <li>Internal Tools Upgrade</li>
                <li>Department Mentorship</li>
              </ul>
            </div>
          )}
          {activeTab === "Feedback" && (
            <div>
              <ul className="list-disc ml-5">
                <li>Great collaboration on Q2 project!</li>
                <li>Could improve time management.</li>
                <li>Excellent mentorship in team building.</li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
