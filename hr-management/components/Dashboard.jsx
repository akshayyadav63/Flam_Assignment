// pages/index.jsx (Dashboard Homepage)
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Navbar from "../components/Navbar";
import { useHRContext } from "../context/HRContext";
import toast from "react-hot-toast";

import { 
  Star, 
  StarHalf, 
  Bookmark, 
  Eye, 
  TrendingUp, 
  Users, 
  Award, 
  Mail,
  Phone,
  MapPin,
  Calendar,
  Building,
  ChevronRight,
  Filter,
  Search
} from "lucide-react";

export default function Dashboard() {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("all");
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { bookmarks, toggleBookmark, isBookmarked } = useHRContext();

  const departments = ["HR", "Engineering", "Marketing", "Finance", "Design", "Operations"];
  const departmentColors = {
    "HR": "from-pink-500 to-rose-500",
    "Engineering": "from-blue-500 to-indigo-600",
    "Marketing": "from-green-500 to-emerald-600",
    "Finance": "from-yellow-500 to-orange-500",
    "Design": "from-purple-500 to-violet-600",
    "Operations": "from-cyan-500 to-teal-600"
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const response = await axios.get("https://dummyjson.com/users?limit=24");
        const enrichedUsers = response.data.users.map((user) => ({
          ...user,
          department: departments[Math.floor(Math.random() * departments.length)],
          rating: (Math.random() * 2 + 3).toFixed(1), // Rating between 3-5
          salary: Math.floor(Math.random() * 80000 + 40000), // Salary between 40k-120k
          joinDate: new Date(2020 + Math.floor(Math.random() * 4), Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1),
          performance: Math.floor(Math.random() * 40 + 60), // Performance 60-100%
          avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.email}&backgroundColor=b6e3f4,c0aede,d1d4f9`
        }));
        setUsers(enrichedUsers);
        setFilteredUsers(enrichedUsers);
      } catch (error) {
        toast.error("Failed to load employees");
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Filter and search functionality
  useEffect(() => {
    let filtered = users;

    if (searchTerm) {
      filtered = filtered.filter(user =>
        `${user.firstName} ${user.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.department.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedDepartment !== "all") {
      filtered = filtered.filter(user => user.department === selectedDepartment);
    }

    setFilteredUsers(filtered);
  }, [users, searchTerm, selectedDepartment]);

  const handleBookmark = (user) => {
    toggleBookmark(user);
    if (isBookmarked(user.id)) {
      toast.success("Removed from bookmarks", { icon: "📌" });
    } else {
      toast.success("Added to bookmarks", { icon: "⭐" });
    }
  };

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const stars = [];

    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />);
    }

    if (hasHalfStar) {
      stars.push(<StarHalf key="half" className="w-4 h-4 fill-yellow-400 text-yellow-400" />);
    }

    const remainingStars = 5 - Math.ceil(rating);
    for (let i = 0; i < remainingStars; i++) {
      stars.push(<Star key={`empty-${i}`} className="w-4 h-4 text-gray-300" />);
    }

    return stars;
  };

  const statsCards = [
    { title: "Total Employees", value: users.length, icon: Users, color: "from-blue-500 to-blue-600", change: "+12%" },
    { title: "Departments", value: departments.length, icon: Building, color: "from-green-500 to-green-600", change: "+2%" },
    { title: "Bookmarked", value: bookmarks.length, icon: Bookmark, color: "from-purple-500 to-purple-600", change: "+8%" },
    { title: "Avg Rating", value: users.length > 0 ? (users.reduce((sum, user) => sum + parseFloat(user.rating || 0), 0) / users.length).toFixed(1) : "0", icon: Award, color: "from-orange-500 to-orange-600", change: "+0.2%" }
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
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Employee Directory
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage and track your team members efficiently
          </p>
        </div>
        
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statsCards.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <div key={index} className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200/50 dark:border-gray-700/50 p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{stat.title}</p>
                    <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">{stat.value}</p>
                    <p className="text-sm text-green-600 dark:text-green-400 mt-1 flex items-center">
                      <TrendingUp className="w-4 h-4 mr-1" />
                      {stat.change}
                    </p>
                  </div>
                  <div className={`p-3 rounded-2xl bg-gradient-to-r ${stat.color} shadow-lg`}>
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Search and Filter Section */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200/50 dark:border-gray-700/50 p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search employees..."
                className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="flex items-center gap-4">
              <Filter className="text-gray-500 w-5 h-5" />
              <select
                className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                value={selectedDepartment}
                onChange={(e) => setSelectedDepartment(e.target.value)}
              >
                <option value="all">All Departments</option>
                {departments.map(dept => (
                  <option key={dept} value={dept}>{dept}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Employee Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredUsers.map((user) => (
            <div
              key={user.id}
              className="group bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200/50 dark:border-gray-700/50 overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
            >
              {/* Card Header with Avatar */}
              <div className="relative p-6 pb-4">
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <img
                      src={user.avatar}
                      alt={`${user.firstName} ${user.lastName}`}
                      className="w-16 h-16 rounded-2xl border-4 border-white dark:border-gray-700 shadow-lg bg-white"
                    />
                    <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white dark:border-gray-800"></div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                      {user.firstName} {user.lastName}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
                      <Mail className="w-4 h-4 mr-1" />
                      {user.email}
                    </p>
                  </div>
                </div>
              </div>

              {/* Card Content */}
              <div className="px-6 space-y-4">
                
                {/* Department Badge */}
                <div className="flex items-center justify-between">
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold text-white bg-gradient-to-r ${departmentColors[user.department]} shadow-lg`}>
                    <Building className="w-3 h-3 mr-1" />
                    {user.department}
                  </span>
                  <button
                    onClick={() => handleBookmark(user)}
                    className={`p-2 rounded-xl transition-all duration-200 ${
                      isBookmarked(user.id)
                        ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-400 hover:text-yellow-500'
                    }`}
                  >
                    <Bookmark className={`w-4 h-4 ${isBookmarked(user.id) ? 'fill-current' : ''}`} />
                  </button>
                </div>

                {/* Rating */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="flex">
                      {renderStars(parseFloat(user.rating))}
                    </div>
                    <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                      {user.rating}
                    </span>
                  </div>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    Performance: {user.performance}%
                  </span>
                </div>

                {/* Details */}
                <div className="space-y-2 text-sm">
                  <div className="flex items-center text-gray-600 dark:text-gray-400">
                    <Calendar className="w-4 h-4 mr-2" />
                    Age: {user.age}
                  </div>
                  <div className="flex items-center text-gray-600 dark:text-gray-400">
                    <Phone className="w-4 h-4 mr-2" />
                    {user.phone}
                  </div>
                  <div className="flex items-center text-gray-600 dark:text-gray-400">
                    <MapPin className="w-4 h-4 mr-2" />
                    {user.address?.city || 'Remote'}
                  </div>
                </div>

                {/* Salary */}
                <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Annual Salary</span>
                    <span className="text-lg font-bold text-green-600 dark:text-green-400">
                      ${user.salary?.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>

              {/* Card Actions */}
              <div className="p-6 pt-4">
                <div className="flex gap-2">
                  <button
                    onClick={() => router.push(`/employee/${user.id}`)}
                    className="flex-1 flex items-center justify-center px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 font-medium"
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    View
                  </button>
                  <button className="flex-1 flex items-center justify-center px-4 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl hover:from-green-600 hover:to-green-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 font-medium">
                    <TrendingUp className="w-4 h-4 mr-2" />
                    Promote
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredUsers.length === 0 && !loading && (
          <div className="text-center py-16">
            <Users className="mx-auto h-24 w-24 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No employees found</h3>
            <p className="text-gray-500 dark:text-gray-400">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>
    </div>
  );
}