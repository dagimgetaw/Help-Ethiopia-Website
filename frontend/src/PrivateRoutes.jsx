import { useEffect, useContext } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import AuthContext from "./AuthContext";

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

  return <Outlet />;
}
