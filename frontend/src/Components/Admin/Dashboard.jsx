import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Spinner from "../Spinner/Spinner";
import Sidebar from "./Sidebar";
import Statics from "./Statics";

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
          navigate("/login");
        } else {
          console.error("An error occurred:", err.message);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }, [navigate]);

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-4 justify-center items-center pt-30">
        <Statics />
      </div>
    </div>
  );
}
