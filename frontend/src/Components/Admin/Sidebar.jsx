import {
  LayoutDashboard,
  Users,
  PenLine,
  BadgeDollarSign,
  LogOut,
} from "lucide-react";
import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <aside className="h-screen w-84 pt-30 bg-gray-100 text-white flex flex-col justify-between p-4 font-text text-md">
      <div>
        <Link to={"/admin/dashboard"}>
          <div className="flex items-center gap-3 p-3 ml-4 my-3 text-gray-900 hover:font-semibold hover:text-[#1E3A8A] transition-all duration-300 ease-in-out transform hover:translate-x-2 rounded-md cursor-pointer">
            <LayoutDashboard />
            <p>Dashboard</p>
          </div>
        </Link>
        <Link to={"/admin/users"}>
          <div className="flex items-center gap-3 p-3 ml-4 my-3 text-gray-900 hover:font-semibold hover:text-[#1E3A8A] transition-all duration-300 ease-in-out transform hover:translate-x-2 rounded-md cursor-pointer">
            <Users />
            <p>Users</p>
          </div>
        </Link>
        <Link to={"/admin/dashboard"}>
          <div className="flex items-center gap-3 p-3 ml-4 my-3 text-gray-900 hover:font-semibold hover:text-[#1E3A8A] transition-all duration-300 ease-in-out transform hover:translate-x-2 rounded-md cursor-pointer">
            <PenLine />
            <p>Blogs</p>
          </div>
        </Link>
        <Link to={"/admin/transaction"}>
          <div className="flex items-center gap-3 p-3 ml-4 my-3 text-gray-900 hover:font-semibold hover:text-[#1E3A8A] transition-all duration-300 ease-in-out transform hover:translate-x-2 rounded-md cursor-pointer">
            <BadgeDollarSign />
            <p>Payment Transaction</p>
          </div>
        </Link>
      </div>
      <div className="flex items-center gap-3 p-3 ml-4 my-2 text-red-900 font-semibold transition-all duration-300 ease-in-out transform hover:translate-x-2 rounded-md cursor-pointer">
        <LogOut />
        <p>Logout</p>
      </div>
    </aside>
  );
}
