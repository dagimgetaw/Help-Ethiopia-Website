import { useContext } from "react";
import { Outlet, Navigate } from "react-router-dom";
import AuthContext from "./AuthContext";

export default function PrivateRoutes() {
  const { isAdmin } = useContext(AuthContext);
  //   const navigate = useNavigate();

  return isAdmin ? <Outlet /> : <Navigate to="/login" />;
}
