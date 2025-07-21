// pages/analytics.jsx
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { Bar, Doughnut, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement,
  Title,
} from "chart.js";
import {
  TrendingUp,
  TrendingDown,
  Users,
  Award,
  Building,
  Target,
  Calendar,
  DollarSign,
  BarChart3,
  PieChart,
  Activity,
  Filter,
  Download,
  RefreshCw
} from "lucide-react";

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement,
  Title
);

export default function AnalyticsPage() {
  const [chartData, setChartData] = useState({});
  const [doughnutData, setDoughnutData] = useState({});
  const [lineData, setLineData] = useState({});
  const [loading, setLoading] = useState(true);
  const [timeframe, setTimeframe] = useState("monthly");
  const [selectedMetric, setSelectedMetric] = useState("performance");

  // KPI Cards Data
  const [kpiData, setKpiData] = useState({
    totalEmployees: 0,
    avgRating: 0,
    topPerformer: "",
    departmentCount: 0,
    salaryExpense: 0,
    retentionRate: 0
  });

  const departmentColors = {
    "HR": "#FF6B6B",
    "Engineering": "#4ECDC4", 
    "Marketing": "#45B7D1",
    "Finance": "#FFA726",
    "Design": "#AB47BC",
    "Operations": "#26A69A"
  };

  useEffect(() => {
    const fetchAnalyticsData = async () => {
      try {
        setLoading(true);
        const response = await fetch("https://dummyjson.com/users?limit=30");
        const data = await response.json();
        
        const departments = {};
        const departmentCounts = {};
        let totalSalary = 0;
        let topRating = 0;
        let topPerformer = "";

        // Process user data
        data.users.forEach((user) => {
          const department = ["HR", "Engineering", "Marketing", "Finance", "Design", "Operations"][Math.floor(Math.random() * 6)];
          const rating = Math.random() * 2 + 3; // 3-5 rating
          const salary = Math.floor(Math.random() * 80000 + 40000);
          
          totalSalary += salary;
          
          if (rating > topRating) {
            topRating = rating;
            topPerformer = `${user.firstName} ${user.lastName}`;
          }

          if (!departments[department]) departments[department] = [];
          departments[department].push(rating);
          
          departmentCounts[department] = (departmentCounts[department] || 0) + 1;
        });

        // Calculate averages and prepare chart data
        const labels = Object.keys(departments);
        const values = labels.map((dept) => {
          const ratings = departments[dept];
          return (ratings.reduce((a, b) => a + b, 0) / ratings.length);
        });

        // Bar Chart Data
        setChartData({
          labels,
          datasets: [
            {
              label: "Average Performance Rating",
              backgroundColor: labels.map(label => departmentColors[label] || "#3B82F6"),
              borderColor: labels.map(label => departmentColors[label] || "#3B82F6"),
              borderWidth: 2,
              borderRadius: 8,
              data: values,
            },
          ],
        });

        // Doughnut Chart Data
        setDoughnutData({
          labels: Object.keys(departmentCounts),
          datasets: [
            {
              data: Object.values(departmentCounts),
              backgroundColor: Object.keys(departmentCounts).map(dept => departmentColors[dept] || "#3B82F6"),
              borderWidth: 3,
              borderColor: "#ffffff",
              hoverBorderWidth: 4,
            },
          ],
        });

        // Line Chart Data (Trend simulation)
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
        const performanceTrend = months.map(() => Math.random() * 20 + 80);
        const satisfactionTrend = months.map(() => Math.random() * 15 + 85);

        setLineData({
          labels: months,
          datasets: [
            {
              label: 'Performance Score',
              data: performanceTrend,
              borderColor: '#3B82F6',
              backgroundColor: 'rgba(59, 130, 246, 0.1)',
              tension: 0.4,
              fill: true,
            },
            {
              label: 'Satisfaction Score',
              data: satisfactionTrend,
              borderColor: '#10B981',
              backgroundColor: 'rgba(16, 185, 129, 0.1)',
              tension: 0.4,
              fill: true,
            }
          ],
        });

        // Set KPI Data
        setKpiData({
          totalEmployees: data.users.length,
          avgRating: (values.reduce((a, b) => a + b, 0) / values.length).toFixed(1),
          topPerformer,
          departmentCount: labels.length,
          salaryExpense: Math.round(totalSalary / 1000),
          retentionRate: Math.floor(Math.random() * 10 + 90)
        });

      } catch (error) {
        console.error("Error fetching analytics data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalyticsData();
  }, []);

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          usePointStyle: true,
          padding: 20,
          font: {
            size: 12,
            family: 'Inter'
          }
        }
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: '#ffffff',
        bodyColor: '#ffffff',
        borderColor: '#3B82F6',
        borderWidth: 1,
        cornerRadius: 8,
      }
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          font: {
            size: 11
          }
        }
      },
      y: {
        grid: {
          color: 'rgba(0, 0, 0, 0.1)',
        },
        ticks: {
          font: {
            size: 11
          }
        }
      }
    }
  };

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          usePointStyle: true,
          padding: 15,
          font: {
            size: 11
          }
        }
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: '#ffffff',
        bodyColor: '#ffffff',
        borderColor: '#3B82F6',
        borderWidth: 1,
        cornerRadius: 8,
      }
    },
    cutout: '60%',
  };

  const lineOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          usePointStyle: true,
          padding: 20,
          font: {
            size: 12
          }
        }
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: '#ffffff',
        bodyColor: '#ffffff',
        borderColor: '#3B82F6',
        borderWidth: 1,
        cornerRadius: 8,
      }
    },
    scales: {
      x: {
        grid: {
          display: false,
        }
      },
      y: {
        grid: {
          color: 'rgba(0, 0, 0, 0.1)',
        },
        min: 70,
        max: 100
      }
    }
  };

  const kpiCards = [
    {
      title: "Total Employees",
      value: kpiData.totalEmployees,
      change: "+12%",
      trend: "up",
      icon: Users,
      color: "from-blue-500 to-blue-600"
    },
    {
      title: "Avg Performance",
      value: `${kpiData.avgRating}/5`,
      change: "+0.3",
      trend: "up",
      icon: Award,
      color: "from-green-500 to-green-600"
    },
    {
      title: "Departments",
      value: kpiData.departmentCount,
      change: "0%",
      trend: "neutral",
      icon: Building,
      color: "from-purple-500 to-purple-600"
    },
    {
      title: "Retention Rate",
      value: `${kpiData.retentionRate}%`,
      change: "+2%",
      trend: "up",
      icon: Target,
      color: "from-orange-500 to-orange-600"
    },
    {
      title: "Salary Expense",
      value: `$${kpiData.salaryExpense}K`,
      change: "+8%",
      trend: "up",
      icon: DollarSign,
      color: "from-red-500 to-red-600"
    },
    {
      title: "Top Performer",
      value: kpiData.topPerformer.split(' ')[0] || "Loading...",
      change: "★ 5.0",
      trend: "star",
      icon: Award,
      color: "from-yellow-500 to-yellow-600"
    }
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-950 dark:via-gray-900 dark:to-gray-800">
        <Navbar />
        <div className="flex items-center justify-center h-96">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-950 dark:via-gray-900 dark:to-gray-800">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Page Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2 flex items-center">
              <BarChart3 className="w-8 h-8 mr-3 text-blue-600" />
              Analytics Dashboard
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Comprehensive insights into your HR metrics and performance
            </p>
          </div>
          
          <div className="flex items-center space-x-4 mt-4 lg:mt-0">
            <select 
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
              value={timeframe}
              onChange={(e) => setTimeframe(e.target.value)}
            >
              <option value="weekly">This Week</option>
              <option value="monthly">This Month</option>
              <option value="quarterly">This Quarter</option>
              <option value="yearly">This Year</option>
            </select>
            
            <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              <Download className="w-4 h-4 mr-2" />
              Export
            </button>
            
            <button className="flex items-center px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors">
              <RefreshCw className="w-4 h-4 mr-2" />
              Refresh
            </button>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 mb-8">
          {kpiCards.map((kpi, index) => {
            const IconComponent = kpi.icon;
            return (
              <div key={index} className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200/50 dark:border-gray-700/50 p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-xl bg-gradient-to-r ${kpi.color} shadow-lg`}>
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>
                  <div className={`flex items-center text-sm ${
                    kpi.trend === 'up' ? 'text-green-600' : 
                    kpi.trend === 'down' ? 'text-red-600' : 
                    kpi.trend === 'star' ? 'text-yellow-600' : 'text-gray-600'
                  }`}>
                    {kpi.trend === 'up' && <TrendingUp className="w-4 h-4 mr-1" />}
                    {kpi.trend === 'down' && <TrendingDown className="w-4 h-4 mr-1" />}
                    {kpi.change}
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">{kpi.title}</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{kpi.value}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          
          {/* Bar Chart */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200/50 dark:border-gray-700/50 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center">
                <BarChart3 className="w-5 h-5 mr-2 text-blue-600" />
                Department Performance
              </h2>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <span className="text-sm text-gray-600 dark:text-gray-400">Average Rating</span>
              </div>
            </div>
            <div className="h-80">
              {chartData?.labels ? (
                <Bar data={chartData} options={chartOptions} />
              ) : (
                <div className="flex items-center justify-center h-full">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                </div>
              )}
            </div>
          </div>

          {/* Doughnut Chart */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200/50 dark:border-gray-700/50 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center">
                <PieChart className="w-5 h-5 mr-2 text-green-600" />
                Team Distribution
              </h2>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-sm text-gray-600 dark:text-gray-400">Employee Count</span>
              </div>
            </div>
            <div className="h-80">
              {doughnutData?.labels ? (
                <Doughnut data={doughnutData} options={doughnutOptions} />
              ) : (
                <div className="flex items-center justify-center h-full">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500"></div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Line Chart - Full Width */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200/50 dark:border-gray-700/50 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center">
              <Activity className="w-5 h-5 mr-2 text-purple-600" />
              Performance Trends
            </h2>
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <span className="text-sm text-gray-600 dark:text-gray-400">Performance</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-sm text-gray-600 dark:text-gray-400">Satisfaction</span>
              </div>
            </div>
          </div>
          <div className="h-80">
            {lineData?.labels ? (
              <Line data={lineData} options={lineOptions} />
            ) : (
              <div className="flex items-center justify-center h-full">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500"></div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}