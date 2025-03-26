import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Spinner from "../../Spinner/Spinner";

export default function Dashboard() {
  const [ok, setOk] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  axios.defaults.withCredentials = true;

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await axios.get("http://localhost:3000/dashboard");

        if (res.data.status === "ok") {
          setOk("ok");
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
    <div className="flex pt-40">
      {ok === "ok" ? <h1>Welcome to Dashboard</h1> : null}
    </div>
  );
}
