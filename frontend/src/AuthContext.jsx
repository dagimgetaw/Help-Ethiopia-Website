import { createContext, useState, useEffect } from "react";

const AuthContext = createContext();

// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [role, setRole] = useState(null);

  const [firstName, setFirstName] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedRole = localStorage.getItem("role");

    if (token) {
      setIsLoggedIn(true);
      if (storedRole) {
        setRole(storedRole);
        setIsAdmin(storedRole === "admin");
      }
    }
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

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedRole = localStorage.getItem("role");
    const storedFirstName = localStorage.getItem("firstName");

    if (token) {
      setIsLoggedIn(true);
      setRole(storedRole);
      setIsAdmin(storedRole === "admin");
      setFirstName(storedFirstName);
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    setIsLoggedIn(false);
    setRole(null);
    setIsAdmin(false);
  };

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, isAdmin, role, login, logout, firstName }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
