import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import NotFound from "./Components/NotFound/NotFound";
import AboutPage from "./Pages/AboutPage";
import TeamPage from "./Pages/TeamPage";
import BlogsPage from "./Pages/BlogsPage";
import WhatWeDo from "./Pages/WhatWeDo";
import DonatePage from "./Pages/DonatePage";
import Signup from "./Components/Signup/Signup";
import Login from "./Components/Login/Login";
import { AuthProvider } from "./AuthContext";
import PrivateRoutes from "./PrivateRoutes";
import RegisterPage from "./Pages/RegisterPage";
import NewBlog from "./Components/Admin/Blogs/NewBlog";
import CreateBlog from "./Components/Admin/Blogs/CreateBlog";
import SingleBlog from "./Components/Blogs/SingleBlog";
import ViewBlog from "./Components/Admin/Blogs/ViewBlog";
import UpdateBlog from "./Components/Admin/Blogs/UpdateBlog";
import MainLayout from "./Layout/MainLayout";
import AdminLayout from "./Layout/AdminLayout";
import Dashboard from "./Components/Admin/Home/Dashboard";
import UsersPage from "./Components/Admin/Users/UsersPage";
import Transaction from "./Components/Admin/Transaction/Transaction";
import ChapaSuccess from "./Components/Result/ChapaSuccess";
import StripeSuccess from "./Components/Result/StripeSuccess";
import StripeCheckout from "./Components/Payment/StripeCheckout";
import ChapaCheckout from "./Components/Payment/ChapaCheckout";
import Messages from "./Components/Admin/Messages/Messages";
import FetchRegisteredUsers from "./Components/Admin/RegisteredUsers/FetchRegisteredUsers";
import SingleUser from "./Components/Admin/RegisteredUsers/SingleUser";
import ForgotPassword from "./Components/ForgotPassword/ForgotPassword";
import ResetPassword from "./Components/ResetPassword/ResetPassword";

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route element={<MainLayout />}>
            <Route index element={<HomePage />} />
            <Route path="*" element={<NotFound />} />
            <Route path="/about-us" element={<AboutPage />} />
            <Route path="/our-team" element={<TeamPage />} />
            <Route path="/blogs" element={<BlogsPage />} />
            <Route path="/what-we-do" element={<WhatWeDo />} />
            <Route path="/donate" element={<DonatePage />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/blogs/:id" element={<SingleBlog />} />
            <Route path="/chapa-payment-success" element={<ChapaSuccess />} />
            <Route path="/stripe-payment-success" element={<StripeSuccess />} />
            <Route path="/pay-with-stripe" element={<StripeCheckout />} />
            <Route path="/pay-with-chapa" element={<ChapaCheckout />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password/:token" element={<ResetPassword />} />
            <Route element={<PrivateRoutes />}>
              <Route element={<AdminLayout />}>
                <Route path="/admin/dashboard" element={<Dashboard />} />
                <Route path="/admin/blogs" element={<NewBlog />} />
                <Route path="/admin/blogs/create" element={<CreateBlog />} />
                <Route path="/admin/blogs/:id" element={<ViewBlog />} />
                <Route
                  path="/admin/blogs/update/:id"
                  element={<UpdateBlog />}
                />
                <Route path="/admin/users" element={<UsersPage />} />
                <Route path="/admin/transaction" element={<Transaction />} />
                <Route path="/admin/messages" element={<Messages />} />
                <Route
                  path="/admin/registered-users"
                  element={<FetchRegisteredUsers />}
                />
                <Route
                  path="/admin/registered-users/:id"
                  element={<SingleUser />}
                />
              </Route>
            </Route>
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}
