import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import HomePage from "./Pages/HomePage";
import NotFound from "./Components/NotFound/NotFound";
import AboutPage from "./Pages/AboutPage";
import TeamPage from "./Pages/TeamPage";
import BlogsPage from "./Pages/BlogsPage";
import WhatWeDo from "./Pages/WhatWeDo";
import DonatePage from "./Pages/DonatePage";
import Signup from "./Components/Signup/Signup";
import Login from "./Components/Login/Login";
import AdminPage from "./Pages/AdminPage";
import { AuthProvider } from "./AuthContext";
import PrivateRoutes from "./PrivateRoutes";
import RegisterPage from "./Pages/RegisterPage";

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="*" element={<NotFound />} />
            <Route path="/about-us" element={<AboutPage />} />
            <Route path="/our-team" element={<TeamPage />} />
            <Route path="/blogs" element={<BlogsPage />} />
            <Route path="/what-we-do" element={<WhatWeDo />} />
            <Route path="/donate" element={<DonatePage />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route element={<PrivateRoutes />}>
              <Route path="/admin/dashboard" element={<AdminPage />} />
            </Route>
            <Route path="/register" element={<RegisterPage />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}
