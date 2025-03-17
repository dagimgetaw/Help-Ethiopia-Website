import { useEffect, useContext } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import AuthContext from "./AuthContext";
import Spinner from "./Components/Spinner/Spinner";

export default function PrivateRoutes() {
  const { isLoggedIn, isAdmin } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn === null) return;

    if (!isLoggedIn) {
      navigate("/login");
    } else if (!isAdmin) {
      navigate("/404");
    }
  }, [isLoggedIn, isAdmin, navigate]);

  if (isLoggedIn === null) {
    return <Spinner />;
  }

  return <Outlet />;
}
