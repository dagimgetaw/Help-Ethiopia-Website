import { useEffect, useState } from "react";
import {
  Search,
  ChevronLeft,
  ChevronRight,
  RefreshCw,
  Users,
  Mars,
  Venus,
  Crown,
  User,
} from "lucide-react";
import { Link } from "react-router-dom";
import Spinner from "../../Spinner/Spinner";

export default function FetchRegisteredUsers() {
  const [registeredUsers, setRegisteredUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isMobile, setIsMobile] = useState(false);
  const usersPerPage = 8;

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    fetchRegisteredUsers();
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  const fetchRegisteredUsers = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(
        "http://localhost:3000/get-registered-users",
        {
          credentials: "include",
        }
      );
      if (!response.ok) throw new Error("Failed to fetch registered users");
      const data = await response.json();
      setRegisteredUsers(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const filteredUsers = registeredUsers.filter((user) =>
    [user.firstName, user.lastName, user.email, user.region]
      .join(" ")
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  if (loading) return <Spinner />;

  if (error)
    return (
      <div className="flex flex-col items-center justify-center h-64 p-4">
        <div className="text-red-500 mb-4 text-center">{error}</div>
        <button
          onClick={fetchRegisteredUsers}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded flex items-center gap-2"
        >
          <RefreshCw className="w-4 h-4" />
          Retry
        </button>
      </div>
    );

  return (
    <div className="px-4 sm:px-6 font-text pt-30 pb-10">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-800 text-center">
        Registered Users
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <StatCard
          icon={<Users className="w-5 h-5" />}
          title="Total Users"
          value={registeredUsers.length}
          color="bg-blue-100 text-blue-600"
        />
        <StatCard
          icon={<Mars className="w-5 h-5" />}
          title="Female"
          value={
            registeredUsers.filter((user) => user.gender === "female").length
          }
          color="bg-purple-100 text-purple-600"
        />
        <StatCard
          icon={<Venus className="w-5 h-5" />}
          title="Male"
          value={
            registeredUsers.filter((user) => user.gender === "male").length
          }
          color="bg-green-100 text-green-600"
        />
        <StatCard
          icon={<Crown className="w-5 h-5" />}
          title="Employed"
          value={
            registeredUsers.filter(
              (user) =>
                user.employmentStatus === "Employed" ||
                user.employmentStatus === "Self-employed"
            ).length
          }
          color="bg-yellow-100 text-yellow-600"
        />
      </div>

      <div className="flex flex-col sm:flex-row justify-center items-center mb-6 gap-4">
        <div className="relative w-full sm:w-84">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-4 h-4" />
          <input
            type="text"
            placeholder="Search registered users..."
            className="w-full pl-10 pr-4 py-2 text-gray-700 border-1 border-gray-400 placeholder-gray-400 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          {isMobile ? (
            <div className="divide-y divide-gray-200">
              {currentUsers.length > 0 ? (
                currentUsers.map((user) => (
                  <MobileUserCard key={user._id} user={user} />
                ))
              ) : (
                <div className="p-6 text-center text-gray-500">
                  <User className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                  No users found
                </div>
              )}
            </div>
          ) : (
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Gender
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Region
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Employment
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Registered On
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {currentUsers.length > 0 ? (
                  currentUsers.map((user) => (
                    <tr key={user._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Link
                          to={`/admin/registered-users/${user._id}`}
                          className="flex items-center"
                        >
                          <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center">
                            <span className="text-gray-600">
                              {user.firstName?.charAt(0)}
                              {user.lastName?.charAt(0)}
                            </span>
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {user.firstName} {user.lastName}
                            </div>
                          </div>
                        </Link>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <Link
                          to={`/admin/registered-users/${user._id}`}
                          className="block"
                        >
                          {user.email}
                        </Link>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Link
                          to={`/admin/registered-users/${user._id}`}
                          className="block"
                        >
                          <span
                            className={`px-2 py-1 text-xs font-semibold rounded-full ${
                              user.gender === "female"
                                ? "bg-pink-100 text-pink-800"
                                : "bg-blue-100 text-blue-800"
                            }`}
                          >
                            {user.gender}
                          </span>
                        </Link>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <Link
                          to={`/admin/registered-users/${user._id}`}
                          className="block"
                        >
                          {user.region}
                        </Link>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Link
                          to={`/admin/registered-users/${user._id}`}
                          className="block"
                        >
                          <span
                            className={`px-2 py-1 text-xs font-semibold rounded-full ${
                              user.employmentStatus === "employed"
                                ? "bg-green-100 text-green-800"
                                : user.employmentStatus === "unemployed"
                                ? "bg-red-100 text-red-800"
                                : user.employmentStatus === "self-employed"
                                ? "bg-blue-100 text-blue-800"
                                : "bg-gray-100 text-gray-800"
                            }`}
                          >
                            {user.employmentStatus}
                          </span>
                        </Link>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <Link
                          to={`/admin/registered-users/${user._id}`}
                          className="block"
                        >
                          {new Date(user.createdAt).toLocaleDateString()}
                        </Link>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="6"
                      className="px-6 py-4 text-center text-gray-500"
                    >
                      <User className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                      No users found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>

        {totalPages > 1 && (
          <div className="px-4 sm:px-6 py-3 flex flex-col sm:flex-row items-center justify-between border-t border-gray-200 gap-4">
            <div className="text-sm text-gray-600">
              Page {currentPage} of {totalPages}
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 border rounded-md disabled:opacity-50 flex items-center gap-1 cursor-pointer border-gray-200 hover:border-blue-300 hover:bg-blue-50 hover:text-[#1E3A8A]"
              >
                <ChevronLeft className="w-4 h-4" />
                {!isMobile && "Previous"}
              </button>
              <button
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}
                className="px-4 py-2 border rounded-md disabled:opacity-50 flex items-center gap-1 cursor-pointer border-gray-200 hover:border-blue-300 hover:bg-blue-50 hover:text-[#1E3A8A]"
              >
                {!isMobile && "Next"}
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Stat Card Component
const StatCard = ({ icon, title, value, color }) => (
  <div className={`${color} rounded-lg p-4 shadow-sm`}>
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-gray-600">{title}</p>
        <p className="text-2xl font-bold">{value}</p>
      </div>
      <div className="p-2 rounded-full bg-white bg-opacity-30">{icon}</div>
    </div>
  </div>
);

// Mobile User Card Component
const MobileUserCard = ({ user }) => {
  const genderColor = user.gender === "female" 
    ? "bg-pink-100 text-pink-800" 
    : "bg-blue-100 text-blue-800";

  const employmentColor = user.employmentStatus === "employed"
    ? "bg-green-100 text-green-800"
    : user.employmentStatus === "unemployed"
    ? "bg-red-100 text-red-800"
    : user.employmentStatus === "self-employed"
    ? "bg-blue-100 text-blue-800"
    : "bg-gray-100 text-gray-800";

  return (
    <Link to={`/admin/registered-users/${user._id}`} className="block">
      <div className="p-4 hover:bg-gray-50">
        <div className="flex items-start gap-4 mb-3">
          <div className="flex-shrink-0 h-12 w-12 rounded-full bg-gray-300 flex items-center justify-center">
            <span className="text-gray-600 text-lg">
              {user.firstName?.charAt(0)}
              {user.lastName?.charAt(0)}
            </span>
          </div>
          <div className="flex-1">
            <div className="font-medium text-gray-900">
              {user.firstName} {user.lastName}
            </div>
            <div className="text-sm text-gray-500">{user.email}</div>
          </div>
        </div>
        <div className="flex flex-wrap gap-2 mb-3">
          <span className={`px-2 py-1 text-xs font-semibold rounded-full ${genderColor}`}>
            {user.gender}
          </span>
          <span className={`px-2 py-1 text-xs font-semibold rounded-full ${employmentColor}`}>
            {user.employmentStatus}
          </span>
        </div>
        <div className="text-sm text-gray-500">
          <div>Region: {user.region}</div>
          <div>Joined: {new Date(user.createdAt).toLocaleDateString()}</div>
        </div>
      </div>
    </Link>
  );
};
