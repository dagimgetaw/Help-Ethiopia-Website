import { createContext, useState, useEffect } from "react";
import Spinner from "./Components/Spinner/Spinner";

const AuthContext = createContext();

// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [role, setRole] = useState(null);
  const [firstName, setFirstName] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedRole = localStorage.getItem("role");
    const storedFirstName = localStorage.getItem("firstName");

    if (token && storedRole) {
      setIsLoggedIn(true);
      setRole(storedRole);
      setIsAdmin(storedRole === "admin");
      setFirstName(storedFirstName || "");
    } else {
      setIsLoggedIn(false);
    }

    setLoading(false);
  }, []);

  const login = (token, role, firstName) => {
    localStorage.setItem("token", token);
    localStorage.setItem("role", role);
    localStorage.setItem("firstName", firstName);

    setIsLoggedIn(true);
    setRole(role);
    setIsAdmin(role === "admin");
    setFirstName(firstName);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("firstName");

    setIsLoggedIn(false);
    setRole(null);
    setIsAdmin(false);
    setFirstName("");
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, isAdmin, role, login, logout, firstName }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
