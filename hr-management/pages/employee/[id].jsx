// pages/employee/[id].jsx
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import {
  Mail,
  Phone,
  MapPin,
  Calendar,
  Building,
  Star,
  StarHalf,
  TrendingUp,
  Award,
  Users,
  Clock,
  Target,
  MessageCircle,
  CheckCircle,
  AlertCircle,
  User,
  Briefcase,
  ChevronLeft
} from "lucide-react";

const tabs = [
  { id: "Overview", label: "Overview", icon: User },
  { id: "Projects", label: "Projects", icon: Briefcase },
  { id: "Feedback", label: "Feedback", icon: MessageCircle }
];

const departmentColors = {
  "HR": "from-pink-500 to-rose-500",
  "Engineering": "from-blue-500 to-indigo-600",
  "Marketing": "from-green-500 to-emerald-600",
  "Finance": "from-yellow-500 to-orange-500",
  "Design": "from-purple-500 to-violet-600",
  "Operations": "from-cyan-500 to-teal-600"
};

export default function EmployeeDetails() {
  const router = useRouter();
  const { id } = router.query;
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState("Overview");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      setLoading(true);
      fetch(`https://dummyjson.com/users/${id}`)
        .then((res) => res.json())
        .then((data) => {
          const departments = ["HR", "Engineering", "Marketing", "Finance", "Design", "Operations"];
          const enrichedData = {
            ...data,
            department: departments[Math.floor(Math.random() * departments.length)],
            rating: (Math.random() * 2 + 3).toFixed(1),
            salary: Math.floor(Math.random() * 80000 + 40000),
            joinDate: new Date(2020 + Math.floor(Math.random() * 4), Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1),
            performance: Math.floor(Math.random() * 40 + 60),
            avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${data.email}&backgroundColor=b6e3f4,c0aede,d1d4f9`,
            projects: [
              { name: "Onboarding Revamp", status: "completed", progress: 100 },
              { name: "Internal Tools Upgrade", status: "in-progress", progress: 75 },
              { name: "Department Mentorship", status: "planning", progress: 25 }
            ],
            feedback: [
              { type: "positive", message: "Great collaboration on Q2 project!", date: "2024-06-15" },
              { type: "improvement", message: "Could improve time management.", date: "2024-05-20" },
              { type: "positive", message: "Excellent mentorship in team building.", date: "2024-04-10" }
            ]
          };
          setUser(enrichedData);
          setLoading(false);
        })
        .catch(error => {
          console.error("Error fetching user:", error);
          setLoading(false);
        });
    }
  }, [id]);

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const stars = [];

    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />);
    }

    if (hasHalfStar) {
      stars.push(<StarHalf key="half" className="w-5 h-5 fill-yellow-400 text-yellow-400" />);
    }

    const remainingStars = 5 - Math.ceil(rating);
    for (let i = 0; i < remainingStars; i++) {
      stars.push(<Star key={`empty-${i}`} className="w-5 h-5 text-gray-300 dark:text-gray-600" />);
    }

    return stars;
  };

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

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-950 dark:via-gray-900 dark:to-gray-800">
        <Navbar />
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <AlertCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">Employee not found</h3>
            <p className="text-gray-500 dark:text-gray-400">The employee you're looking for doesn't exist.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-950 dark:via-gray-900 dark:to-gray-800">
      <Navbar />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="flex items-center text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white mb-6 transition-colors"
        >
          <ChevronLeft className="w-5 h-5 mr-1" />
          Back to Directory
        </button>

        {/* Header Section */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200/50 dark:border-gray-700/50 overflow-hidden mb-8">
          <div className="relative">
            {/* Background Gradient */}
            <div className={`h-32 bg-gradient-to-r ${departmentColors[user.department] || 'from-gray-500 to-gray-600'}`}></div>
            
            {/* Profile Content */}
            <div className="relative px-6 pb-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-end space-y-4 sm:space-y-0 sm:space-x-6">
                
                {/* Avatar */}
                <div className="relative -mt-16">
                  <img
                    src={user.avatar}
                    alt={`${user.firstName} ${user.lastName}`}
                    className="w-32 h-32 rounded-2xl border-4 border-white dark:border-gray-800 shadow-xl bg-white"
                  />
                  <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full border-4 border-white dark:border-gray-800 shadow-lg"></div>
                </div>

                {/* User Info */}
                <div className="flex-1">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                        {user.firstName} {user.lastName}
                      </h1>
                      <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4 text-sm text-gray-600 dark:text-gray-400">
                        <div className="flex items-center">
                          <Mail className="w-4 h-4 mr-2" />
                          {user.email}
                        </div>
                        <div className="flex items-center">
                          <Phone className="w-4 h-4 mr-2" />
                          {user.phone}
                        </div>
                      </div>
                    </div>
                    
                    {/* Department Badge */}
                    <div className="mt-4 sm:mt-0">
                      <span className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold text-white bg-gradient-to-r ${departmentColors[user.department]} shadow-lg`}>
                        <Building className="w-4 h-4 mr-2" />
                        {user.department}
                      </span>
                    </div>
                  </div>

                  {/* Rating and Performance */}
                  <div className="flex items-center space-x-6 mt-4">
                    <div className="flex items-center space-x-2">
                      <div className="flex">
                        {renderStars(parseFloat(user.rating))}
                      </div>
                      <span className="text-lg font-semibold text-gray-900 dark:text-white">
                        {user.rating}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <TrendingUp className="w-5 h-5 text-green-500" />
                      <span className="text-sm font-medium text-gray-900 dark:text-white">
                        {user.performance}% Performance
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200/50 dark:border-gray-700/50 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Salary</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">${user.salary?.toLocaleString()}</p>
              </div>
              <div className="p-3 rounded-2xl bg-gradient-to-r from-green-500 to-green-600">
                <Award className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200/50 dark:border-gray-700/50 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Experience</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {new Date().getFullYear() - user.joinDate.getFullYear()}y
                </p>
              </div>
              <div className="p-3 rounded-2xl bg-gradient-to-r from-blue-500 to-blue-600">
                <Clock className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200/50 dark:border-gray-700/50 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Projects</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{user.projects?.length || 3}</p>
              </div>
              <div className="p-3 rounded-2xl bg-gradient-to-r from-purple-500 to-purple-600">
                <Target className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200/50 dark:border-gray-700/50 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Age</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{user.age}</p>
              </div>
              <div className="p-3 rounded-2xl bg-gradient-to-r from-orange-500 to-orange-600">
                <Users className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200/50 dark:border-gray-700/50 mb-8">
          <div className="flex border-b border-gray-200 dark:border-gray-700">
            {tabs.map((tab) => {
              const IconComponent = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 flex items-center justify-center px-6 py-4 text-sm font-medium transition-all duration-200 ${
                    activeTab === tab.id
                      ? "text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400 bg-blue-50 dark:bg-blue-900/20"
                      : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/30"
                  }`}
                >
                  <IconComponent className="w-5 h-5 mr-2" />
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {activeTab === "Overview" && (
              <div className="space-y-6">
                
                {/* Personal Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Personal Information</h3>
                    
                    <div className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                      <MapPin className="w-5 h-5 text-gray-500" />
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Address</p>
                        <p className="text-gray-900 dark:text-white">{user.address?.address}, {user.address?.city}</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                      <Calendar className="w-5 h-5 text-gray-500" />
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Join Date</p>
                        <p className="text-gray-900 dark:text-white">{user.joinDate.toLocaleDateString()}</p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Bio</h3>
                    <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl border border-blue-200/50 dark:border-blue-800/50">
                      <p className="text-gray-700 dark:text-gray-300">
                        Enthusiastic team player with great potential. Dedicated professional who consistently delivers high-quality work and collaborates effectively with team members.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Rating History */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Recent Rating History</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {[1, 2, 3].map((quarter, i) => (
                      <div key={i} className="p-4 bg-white dark:bg-gray-700/50 rounded-xl border border-gray-200 dark:border-gray-600 shadow-sm">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                            Q{quarter} 2024
                          </span>
                          <div className="flex items-center space-x-1">
                            {renderStars(Math.ceil(Math.random() * 2 + 3))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === "Projects" && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Current Projects</h3>
                
                <div className="space-y-4">
                  {user.projects?.map((project, index) => (
                    <div key={index} className="p-6 bg-gradient-to-r from-white to-gray-50 dark:from-gray-700/50 dark:to-gray-800/50 rounded-xl border border-gray-200 dark:border-gray-600 shadow-sm">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                          {project.name}
                        </h4>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          project.status === 'completed' 
                            ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
                            : project.status === 'in-progress'
                            ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300'
                            : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300'
                        }`}>
                          {project.status.charAt(0).toUpperCase() + project.status.slice(1).replace('-', ' ')}
                        </span>
                      </div>
                      
                      <div className="mb-2">
                        <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-1">
                          <span>Progress</span>
                          <span>{project.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full transition-all duration-300 ${
                              project.progress === 100 ? 'bg-green-500' : 'bg-blue-500'
                            }`}
                            style={{ width: `${project.progress}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "Feedback" && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Performance Feedback</h3>
                
                <div className="space-y-4">
                  {user.feedback?.map((feedback, index) => (
                    <div key={index} className={`p-6 rounded-xl border shadow-sm ${
                      feedback.type === 'positive'
                        ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800'
                        : 'bg-orange-50 dark:bg-orange-900/20 border-orange-200 dark:border-orange-800'
                    }`}>
                      <div className="flex items-start space-x-3">
                        {feedback.type === 'positive' ? (
                          <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" />
                        ) : (
                          <AlertCircle className="w-6 h-6 text-orange-500 flex-shrink-0 mt-0.5" />
                        )}
                        <div className="flex-1">
                          <p className={`text-sm font-medium ${
                            feedback.type === 'positive'
                              ? 'text-green-800 dark:text-green-300'
                              : 'text-orange-800 dark:text-orange-300'
                          }`}>
                            {feedback.type === 'positive' ? 'Positive Feedback' : 'Area for Improvement'}
                          </p>
                          <p className="text-gray-700 dark:text-gray-300 mt-1">
                            {feedback.message}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                            {new Date(feedback.date).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}