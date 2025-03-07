import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Dashboard() {
  const [ok, setOk] = useState("");
  const navigate = useNavigate();

  axios.defaults.withCredentials = true;

  useEffect(() => {
    axios
      .get("http://localhost:3000/dashboard")
      .then((res) => {
        if (res.data === "ok") {
          setOk("ok");
        } else {
          navigate("/");
        }
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <div className="py-80">
      <h2>Dashboard</h2>
      <p>{ok}</p>
    </div>
  );
}
