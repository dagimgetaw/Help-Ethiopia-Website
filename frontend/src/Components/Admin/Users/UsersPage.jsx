import { useEffect, useState } from "react";
import {
  Users,
  UserCheck,
  UserX,
  Search,
  Crown,
  Pencil,
  Trash2,
  ChevronLeft,
  RefreshCw,
  ChevronRight,
} from "lucide-react";

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 8;

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch("http://localhost:3000/getallusers", {
        credentials: "include",
      });
      if (!response.ok) throw new Error("Failed to fetch users");
      const data = await response.json();
      setUsers(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Filter users based on search term (do this first)
  const filteredUsers = users.filter(
    (user) =>
      user.firstName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.lastName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Then apply pagination to the filtered results
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  if (loading)
    return (
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="bg-gray-100 rounded-lg p-4 h-32 animate-pulse"
            ></div>
          ))}
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="h-16 bg-gray-100 rounded mb-2 animate-pulse"
            ></div>
          ))}
        </div>
      </div>
    );

  if (error)
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <div className="text-red-500 mb-4">{error}</div>
        <button
          onClick={fetchUsers}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded flex items-center gap-2"
        >
          <RefreshCw className="w-4 h-4" />
          Retry
        </button>
      </div>
    );

  return (
    <div className="p-6 font-text pt-30">
      <h1 className="text-3xl font-bold mb-6 text-gray-800 text-center">
        User Management
      </h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <StatCard
          icon={<Users className="w-5 h-5" />}
          title="Total Users"
          value={users.length}
          color="bg-blue-100 text-blue-600"
        />
        <StatCard
          icon={<Crown className="w-5 h-5" />}
          title="Admins"
          value={users.filter((user) => user.role === "admin").length}
          color="bg-purple-100 text-purple-600"
        />
        <StatCard
          icon={<UserX className="w-5 h-5" />}
          title="Inactive"
          value={users.filter((user) => !user.isActive).length}
          color="bg-red-100 text-red-600"
        />
        <StatCard
          icon={<UserCheck className="w-5 h-5" />}
          title="Active"
          value={users.filter((user) => user.isActive).length}
          color="bg-green-100 text-green-600"
        />
      </div>

      {/* Search and Controls */}
      <div className="flex flex-col md:flex-row justify-center items-center mb-6 gap-4">
        <div className="relative w-full md:w-84">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-4 h-4" />
          <input
            type="text"
            placeholder="Search users..."
            className="w-full pl-10 pr-4 py-2 text-gray-700 border-1 border-gray-400 placeholder-gray-400 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
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
                  Role
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Joined
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentUsers.length > 0 ? (
                currentUsers.map((user) => (
                  <UserRow key={user._id} user={user} />
                ))
              ) : (
                <tr>
                  <td
                    colSpan="6"
                    className="px-6 py-4 text-center text-gray-500"
                  >
                    No users found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="px-6 py-3 flex items-center justify-evenly border-t border-gray-200">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 border rounded-md disabled:opacity-50 flex items-center gap-1 cursor-pointer border-gray-200 hover:border-blue-300 hover:bg-blue-50 hover:text-[#1E3A8A] "
            >
              <ChevronLeft className="w-4 h-4" />
              Previous
            </button>
            <div className="text-sm text-gray-600">
              Page {currentPage} of {totalPages}
            </div>
            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className="px-4 py-2 border rounded-md disabled:opacity-50 flex items-center gap-1 cursor-pointer border-gray-200 hover:border-blue-300 hover:bg-blue-50 hover:text-[#1E3A8A] "
            >
              Next
              <ChevronRight className="w-4 h-4" />
            </button>
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

// User Row Component
const UserRow = ({ user }) => {
  const statusColor = user.isActive
    ? "bg-green-100 text-green-800"
    : "bg-red-100 text-red-800";
  const roleColor =
    user.role === "admin"
      ? "bg-purple-100 text-purple-800"
      : "bg-blue-100 text-blue-800";

  return (
    <tr className="hover:bg-gray-50 font-text">
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
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
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {user.email}
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span
          className={`px-2 py-1 text-xs font-semibold rounded-full ${roleColor}`}
        >
          {user.role || "user"}
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span
          className={`px-2 py-1 text-xs font-semibold rounded-full ${statusColor}`}
        >
          {user.isActive ? "Active" : "Inactive"}
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {new Date(user.createdAt).toLocaleDateString()}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
        <button className="text-blue-600 hover:text-blue-900 mr-3 flex items-center gap-1">
          <Pencil className="w-4 h-4" />
          Edit
        </button>
        <button className="text-red-600 hover:text-red-900 flex items-center gap-1">
          <Trash2 className="w-4 h-4" />
          Delete
        </button>
      </td>
    </tr>
  );
};
