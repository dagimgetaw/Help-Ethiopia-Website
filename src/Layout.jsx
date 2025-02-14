import { Outlet } from "react-router";
import Navbar from "./Components/Navbar/Navbar";
import Footer from "./Components/Footer/Footer";

export default function Layout() {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
}
