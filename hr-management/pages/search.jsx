// pages/search.jsx - Improved with Better Colors
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Navbar from "../components/Navbar";
import { 
  Search,
  Filter,
  Star,
  StarHalf,
  Users,
  Mail,
  Building,
  Eye,
  X,
  ChevronDown
} from "lucide-react";

export default function SearchPage() {
  const [users, setUsers] = useState([]);
  const [query, setQuery] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState([]);
  const [ratingFilter, setRatingFilter] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showDeptFilter, setShowDeptFilter] = useState(false);
  const [showRatingFilter, setShowRatingFilter] = useState(false);
  const router = useRouter();

  const departments = ["HR", "Engineering", "Marketing", "Finance", "Design", "Operations"];
  const departmentColors = {
    "HR": "from-rose-500 to-pink-600 dark:from-rose-600 dark:to-pink-700",
    "Engineering": "from-blue-500 to-indigo-600 dark:from-blue-600 dark:to-indigo-700",
    "Marketing": "from-emerald-500 to-green-600 dark:from-emerald-600 dark:to-green-700",
    "Finance": "from-amber-500 to-orange-600 dark:from-amber-600 dark:to-orange-700",
    "Design": "from-violet-500 to-purple-600 dark:from-violet-600 dark:to-purple-700",
    "Operations": "from-teal-500 to-cyan-600 dark:from-teal-600 dark:to-cyan-700"
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const response = await fetch("https://dummyjson.com/users?limit=24");
        const data = await response.json();
        const enrichedUsers = data.users.map((user) => ({
          ...user,
          department: departments[Math.floor(Math.random() * departments.length)],
          rating: (Math.random() * 2 + 3).toFixed(1), // Rating between 3-5
          avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.email}&backgroundColor=b6e3f4,c0aede,d1d4f9`
        }));
        setUsers(enrichedUsers);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const filtered = users.filter((user) => {
    const searchMatch =
      user.firstName.toLowerCase().includes(query.toLowerCase()) ||
      user.lastName.toLowerCase().includes(query.toLowerCase()) ||
      user.email.toLowerCase().includes(query.toLowerCase()) ||
      user.department.toLowerCase().includes(query.toLowerCase());

    const deptMatch =
      departmentFilter.length === 0 || departmentFilter.includes(user.department);

    const ratingMatch = 
      ratingFilter.length === 0 || ratingFilter.some(r => Math.floor(parseFloat(user.rating)) === r);

    return searchMatch && deptMatch && ratingMatch;
  });

  const toggleDepartmentFilter = (dept) => {
    setDepartmentFilter(prev =>
      prev.includes(dept)
        ? prev.filter(d => d !== dept)
        : [...prev, dept]
    );
  };

  const toggleRatingFilter = (rating) => {
    setRatingFilter(prev =>
      prev.includes(rating)
        ? prev.filter(r => r !== rating)
        : [...prev, rating]
    );
  };

  const clearAllFilters = () => {
    setDepartmentFilter([]);
    setRatingFilter([]);
    setQuery("");
  };

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const stars = [];

    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400 dark:fill-amber-500 dark:text-amber-500" />);
    }

    if (hasHalfStar) {
      stars.push(<StarHalf key="half" className="w-4 h-4 fill-amber-400 text-amber-400 dark:fill-amber-500 dark:text-amber-500" />);
    }

    const remainingStars = 5 - Math.ceil(rating);
    for (let i = 0; i < remainingStars; i++) {
      stars.push(<Star key={`empty-${i}`} className="w-4 h-4 text-gray-300 dark:text-gray-600" />);
    }

    return stars;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-800">
        <Navbar />
        <div className="flex items-center justify-center h-96">
          <div className="animate-spin rounded-full h-32 w-32 border-b-4 border-blue-500 dark:border-blue-400"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-800">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-2 flex items-center">
            <Search className="w-8 h-8 mr-3 text-blue-500 dark:text-blue-400" />
            Search & Filter Employees
          </h1>
          <p className="text-slate-600 dark:text-slate-400">
            Find and filter employees by name, department, or rating
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border border-slate-200/60 dark:border-slate-700/60 rounded-2xl shadow-lg shadow-slate-200/50 dark:shadow-slate-900/50 p-6 mb-8">
          
          {/* Search Bar */}
          <div className="relative mb-6">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 dark:text-slate-500 w-5 h-5" />
            <input
              type="text"
              placeholder="Search by name, email, department..."
              className="w-full pl-12 pr-4 py-4 border border-slate-300 dark:border-slate-600 rounded-xl bg-slate-50/80 dark:bg-slate-700/80 text-slate-900 dark:text-slate-100 placeholder-slate-500 dark:placeholder-slate-400 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-all backdrop-blur-sm text-lg"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>

          {/* Filter Controls */}
          <div className="flex flex-wrap gap-4 items-center">
            <Filter className="text-slate-500 dark:text-slate-400 w-5 h-5" />
            
            {/* Department Filter */}
            <div className="relative">
              <button
                onClick={() => setShowDeptFilter(!showDeptFilter)}
                className="flex items-center gap-2 px-4 py-2 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-600 transition-all"
              >
                <Building className="w-4 h-4" />
                Departments
                {departmentFilter.length > 0 && (
                  <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
                    {departmentFilter.length}
                  </span>
                )}
                <ChevronDown className={`w-4 h-4 transition-transform ${showDeptFilter ? 'rotate-180' : ''}`} />
              </button>
              
              {showDeptFilter && (
                <div className="absolute top-full mt-2 left-0 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-lg z-10 p-2 min-w-48">
                  {departments.map(dept => (
                    <label key={dept} className="flex items-center p-2 hover:bg-slate-50 dark:hover:bg-slate-700 rounded-lg cursor-pointer">
                      <input
                        type="checkbox"
                        checked={departmentFilter.includes(dept)}
                        onChange={() => toggleDepartmentFilter(dept)}
                        className="mr-3 rounded text-blue-500 focus:ring-blue-500"
                      />
                      <span className={`inline-block w-3 h-3 rounded-full mr-2 bg-gradient-to-r ${departmentColors[dept]}`}></span>
                      <span className="text-slate-700 dark:text-slate-300">{dept}</span>
                    </label>
                  ))}
                </div>
              )}
            </div>

            {/* Rating Filter */}
            <div className="relative">
              <button
                onClick={() => setShowRatingFilter(!showRatingFilter)}
                className="flex items-center gap-2 px-4 py-2 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-600 transition-all"
              >
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                Rating
                {ratingFilter.length > 0 && (
                  <span className="bg-amber-500 text-white text-xs px-2 py-1 rounded-full">
                    {ratingFilter.length}
                  </span>
                )}
                <ChevronDown className={`w-4 h-4 transition-transform ${showRatingFilter ? 'rotate-180' : ''}`} />
              </button>
              
              {showRatingFilter && (
                <div className="absolute top-full mt-2 left-0 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-lg z-10 p-2 min-w-40">
                  {[5, 4, 3, 2, 1].map(rating => (
                    <label key={rating} className="flex items-center p-2 hover:bg-slate-50 dark:hover:bg-slate-700 rounded-lg cursor-pointer">
                      <input
                        type="checkbox"
                        checked={ratingFilter.includes(rating)}
                        onChange={() => toggleRatingFilter(rating)}
                        className="mr-3 rounded text-amber-500 focus:ring-amber-500"
                      />
                      <div className="flex items-center">
                        {Array.from({ length: rating }).map((_, i) => (
                          <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
                        ))}
                        <span className="ml-2 text-slate-700 dark:text-slate-300">
                          {rating} Star{rating > 1 ? 's' : ''}
                        </span>
                      </div>
                    </label>
                  ))}
                </div>
              )}
            </div>

            {/* Clear Filters */}
            {(departmentFilter.length > 0 || ratingFilter.length > 0 || query) && (
              <button
                onClick={clearAllFilters}
                className="flex items-center gap-2 px-4 py-2 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-lg hover:bg-red-200 dark:hover:bg-red-900/50 transition-all"
              >
                <X className="w-4 h-4" />
                Clear All
              </button>
            )}
          </div>

          {/* Active Filters Display */}
          {(departmentFilter.length > 0 || ratingFilter.length > 0) && (
            <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-700">
              <div className="flex flex-wrap gap-2">
                {departmentFilter.map(dept => (
                  <span key={dept} className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold text-white bg-gradient-to-r ${departmentColors[dept]} shadow-lg`}>
                    {dept}
                    <button
                      onClick={() => toggleDepartmentFilter(dept)}
                      className="ml-2 hover:bg-white/20 rounded-full p-1"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
                {ratingFilter.map(rating => (
                  <span key={rating} className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400">
                    {rating} Star{rating > 1 ? 's' : ''}
                    <button
                      onClick={() => toggleRatingFilter(rating)}
                      className="ml-2 hover:bg-amber-200 dark:hover:bg-amber-800 rounded-full p-1"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Results Header */}
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
            Search Results ({filtered.length} found)
          </h2>
        </div>

        {/* Employee Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filtered.map((user) => (
            <div
              key={user.id}
              className="group bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm border border-slate-200/60 dark:border-slate-700/60 rounded-2xl shadow-lg shadow-slate-200/50 dark:shadow-slate-900/50 overflow-hidden hover:shadow-2xl hover:shadow-slate-300/50 dark:hover:shadow-slate-800/50 transition-all duration-300 transform hover:-translate-y-1"
            >
              {/* Avatar and Name */}
              <div className="p-6 pb-4">
                <div className="flex items-center space-x-4 mb-4">
                  <img
                    src={user.avatar}
                    alt={`${user.firstName} ${user.lastName}`}
                    className="w-12 h-12 rounded-xl border-2 border-white dark:border-slate-700 shadow-md bg-white"
                  />
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
                      {user.firstName} {user.lastName}
                    </h3>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-center text-sm text-slate-500 dark:text-slate-400 mb-3">
                  <Mail className="w-4 h-4 mr-2" />
                  {user.email}
                </div>

                {/* Department Badge */}
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold text-white bg-gradient-to-r ${departmentColors[user.department]} shadow-lg mb-3`}>
                  <Building className="w-3 h-3 mr-1" />
                  {user.department}
                </span>

                {/* Rating */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="flex">
                      {renderStars(parseFloat(user.rating))}
                    </div>
                    <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                      {user.rating}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="px-6 pb-6">
                <button
                  onClick={() => router.push(`/employee/${user.id}`)}
                  className="w-full flex items-center justify-center px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 dark:from-blue-600 dark:to-blue-700 text-white rounded-xl hover:from-blue-600 hover:to-blue-700 dark:hover:from-blue-700 dark:hover:to-blue-800 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 font-medium"
                >
                  <Eye className="w-4 h-4 mr-2" />
                  View Profile
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filtered.length === 0 && !loading && (
          <div className="text-center py-16">
            <Users className="mx-auto h-24 w-24 text-slate-400 dark:text-slate-500 mb-4" />
            <h3 className="text-lg font-medium text-slate-900 dark:text-slate-100 mb-2">No employees found</h3>
            <p className="text-slate-500 dark:text-slate-400 mb-4">
              Try adjusting your search terms or filters
            </p>
            <button
              onClick={clearAllFilters}
              className="px-6 py-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-all"
            >
              Clear All Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}