import {
  LayoutDashboard,
  Users,
  PenLine,
  BadgeDollarSign,
  LogOut,
} from "lucide-react";
import { NavLink } from "react-router-dom";
import AuthContext from "../../AuthContext";
import { useContext } from "react";

export default function Sidebar() {
  const { logout } = useContext(AuthContext);

  return (
    <aside className="h-fill w-84 pt-30 bg-gray-100 text-white flex flex-col justify-between p-4 font-text text-md">
      <div>
        <NavLink
          to={"/admin/dashboard"}
          className={({ isActive }) =>
            `flex items-center gap-3 p-5 ml-4 my-3 mr-8 ${
              isActive
                ? "font-semibold bg-gray-200 border-l-10 border-[#1E3A8A] text-[#1E3A8A] transform translate-x-2"
                : "hover:font-semibold hover:text-[#1E3A8A] transition-all duration-300 ease-in-out transform hover:translate-x-4 text-black"
            } cursor-pointer`
          }
        >
          <LayoutDashboard />
          <p>Dashboard</p>
        </NavLink>
        <NavLink
          to={"/admin/users"}
          className={({ isActive }) =>
            `flex items-center gap-3 p-5 ml-4 my-3 mr-8 ${
              isActive
                ? "font-semibold bg-gray-200 border-l-10 border-[#1E3A8A] text-[#1E3A8A] transform translate-x-2"
                : "hover:font-semibold hover:text-[#1E3A8A] transition-all duration-300 ease-in-out transform hover:translate-x-4 text-black"
            } rounded-md cursor-pointer`
          }
        >
          <Users />
          <p>Users</p>
        </NavLink>
        <NavLink
          to={"/admin/blogs"}
          className={({ isActive }) =>
            `flex items-center gap-3 p-5 ml-4 my-3 mr-8 ${
              isActive
                ? "font-semibold bg-gray-200 border-l-10 border-[#1E3A8A] text-[#1E3A8A] transform translate-x-2"
                : "hover:font-semibold hover:text-[#1E3A8A] transition-all duration-300 ease-in-out transform hover:translate-x-4 text-black"
            } rounded-md cursor-pointer`
          }
        >
          <PenLine />
          <p>Blogs</p>
        </NavLink>
        <NavLink
          to={"/admin/transaction"}
          className={({ isActive }) =>
            `flex items-center gap-3 p-5 ml-4 my-3 mr-8 ${
              isActive
                ? "font-semibold bg-gray-200 border-l-10 border-[#1E3A8A] text-[#1E3A8A] transform translate-x-2"
                : "hover:font-semibold hover:text-[#1E3A8A] transition-all duration-300 ease-in-out transform hover:translate-x-4 text-black"
            } rounded-md cursor-pointer`
          }
        >
          <BadgeDollarSign />
          <p>Payment Transaction</p>
        </NavLink>
      </div>
      <div
        className="flex items-center gap-3 p-3 ml-4 my-2 text-red-900 font-semibold transition-all duration-300 ease-in-out transform hover:translate-x-4 rounded-md cursor-pointer"
        onClick={() => {
          logout();
        }}
      >
        <LogOut />
        <p>Logout</p>
      </div>
    </aside>
  );
}
