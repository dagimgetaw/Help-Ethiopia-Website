import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Dashboard() {
  const [ok, setOk] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  axios.defaults.withCredentials = true;

  useEffect(() => {
    axios
      .get("http://localhost:3000/dashboard")
      .then((res) => {
        if (res.data.status === "ok") {
          setOk("ok");
        } else {
          navigate("/");
        }
      })
      .catch((err) => {
        console.log("Dashboard error:", err);
        if (err.response && err.response.status === 401) {
          // Redirect to login if unauthorized
          navigate("/login");
        } else {
          // Handle other errors (e.g., network issues)
          console.error("An error occurred:", err.message);
        }
      })
      .finally(() => {
        setLoading(false); // Set loading to false after the request completes
      });
  }, [navigate]);

  if (loading) {
    return <div>Loading...</div>; // Show a loading indicator
  }

  return (
    <div className="py-80">
      <h2>Dashboard</h2>
      <p>{ok}</p>
    </div>
  );
}
