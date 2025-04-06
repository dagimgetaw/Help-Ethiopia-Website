import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Spinner from "../../Spinner/Spinner";
import { Users, FileText, DollarSign, Activity } from "lucide-react";

export default function Dashboard() {
  const [ok, setOk] = useState("");
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState(null); // To store statistics data
  const navigate = useNavigate();

  axios.defaults.withCredentials = true;

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await axios.get("http://localhost:3000/dashboard");

        if (res.data.status === "ok") {
          setOk("ok");
          setStats(res.data.stats); // Assuming the backend sends stats data
        } else {
          navigate("/");
        }
      } catch (error) {
        console.log("Dashboard error:", error);

        if (error.response && error.response.status === 401) {
          navigate("/login");
        } else {
          console.error("An error occurred:", error.message);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, [navigate]);

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="pt-30 px-6 font-text">
      {ok === "ok" ? (
        <>
          <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
            Admin Dashboard
          </h1>

          {/* Statistics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatCard
              icon={<Users className="w-6 h-6" />}
              title="Total Users"
              value={stats?.totalUsers || 0}
              color="bg-blue-100 text-blue-600"
            />
            <StatCard
              icon={<FileText className="w-6 h-6" />}
              title="Total Blogs"
              value={stats?.totalBlogs || 0}
              color="bg-green-100 text-green-600"
            />
            <StatCard
              icon={<DollarSign className="w-6 h-6" />}
              title="Total Donations"
              value={`$${stats?.totalDonations || 0}`}
              color="bg-yellow-100 text-yellow-600"
            />
            <StatCard
              icon={<Activity className="w-6 h-6" />}
              title="Active Users"
              value={stats?.activeUsers || 0}
              color="bg-purple-100 text-purple-600"
            />
          </div>

          {/* Recent Activity Section */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Recent Activity
            </h2>
            {stats?.recentActivity?.length > 0 ? (
              <ul className="divide-y divide-gray-200">
                {stats.recentActivity.map((activity, index) => (
                  <li key={index} className="py-3">
                    <p className="text-gray-700 text-sm">{activity}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500 text-sm">No recent activity.</p>
            )}
          </div>
        </>
      ) : null}
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
