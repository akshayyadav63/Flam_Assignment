// pages/analytics.jsx
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

export default function AnalyticsPage() {
  const [chartData, setChartData] = useState({});

  useEffect(() => {
    fetch("https://dummyjson.com/users?limit=20")
      .then((res) => res.json())
      .then((data) => {
        const departments = {};

        data.users.forEach((user) => {
          const department = ["HR", "Engineering", "Marketing", "Finance"][Math.floor(Math.random() * 4)];
          const rating = Math.ceil(Math.random() * 5);
          if (!departments[department]) departments[department] = [];
          departments[department].push(rating);
        });

        const labels = Object.keys(departments);
        const values = labels.map((dept) => {
          const ratings = departments[dept];
          const average = ratings.reduce((a, b) => a + b, 0) / ratings.length;
          return average.toFixed(2);
        });

        setChartData({
          labels,
          datasets: [
            {
              label: "Avg Performance Rating",
              backgroundColor: "#3b82f6",
              data: values,
            },
          ],
        });
      });
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-950 dark:text-white">
      <Navbar />
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">📊 Analytics</h1>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow">
          {chartData?.labels ? (
            <Bar data={chartData} />
          ) : (
            <p>Loading chart...</p>
          )}
        </div>
      </div>
    </div>
  );
}
