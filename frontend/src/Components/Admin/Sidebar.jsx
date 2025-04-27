import {
  LayoutDashboard,
  Users,
  PenLine,
  BadgeDollarSign,
  LogOut,
  ChevronLeft,
  ChevronRight,
  MessageCircle,
  MailPlus,
} from "lucide-react";
import { NavLink } from "react-router-dom";
import AuthContext from "../../AuthContext";
import { useContext, useState, useEffect } from "react";

export default function Sidebar() {
  const { logout } = useContext(AuthContext);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth < 768) {
        setIsCollapsed(true);
      }
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const menuItems = [
    { path: "/admin/dashboard", icon: LayoutDashboard, label: "Dashboard" },
    { path: "/admin/users", icon: Users, label: "Users" },
    { path: "/admin/blogs", icon: PenLine, label: "Blogs" },
    { path: "/admin/transaction", icon: BadgeDollarSign, label: "Payments" },
    { path: "/admin/messages", icon: MessageCircle, label: "Messages" },
    {
      path: "/admin/registered-users",
      icon: MailPlus,
      label: "Registered Users",
    },
  ];

  return (
    <aside
      className={`h-fill pt-20 bg-gray-50 flex flex-col justify-between p-4 font-text transition-all duration-300 ease-in-out ${
        isCollapsed ? "w-24" : "w-64"
      } border-r border-gray-200 relative`}
    >
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -right-3 top-24 z-10 bg-white p-2 rounded-full shadow-md border border-gray-200 hover:bg-gray-100 transition-colors"
      >
        {isCollapsed ? (
          <ChevronRight className="text-gray-600 cursor-pointer" size={18} />
        ) : (
          <ChevronLeft className="text-gray-600 cursor-pointer" size={18} />
        )}
      </button>

      <div className="mt-8 space-y-1">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 p-3 my-4 ${
                isActive
                  ? "font-semibold bg-blue-50 text-blue-600 border-l-4 border-blue-600"
                  : "hover:bg-gray-100 hover:text-gray-800 text-gray-700"
              } rounded-r-md cursor-pointer transition-all duration-200`
            }
          >
            <item.icon
              className={`flex-shrink-0 ${isCollapsed ? "mx-auto" : ""}`}
              size={20}
            />
            {!isCollapsed && (
              <span className="whitespace-nowrap">{item.label}</span>
            )}
          </NavLink>
        ))}
      </div>

      <div
        className={`flex items-center gap-3 p-3 ${
          isCollapsed ? "justify-center" : ""
        } text-red-600 font-medium hover:bg-red-50 rounded-md cursor-pointer transition-colors duration-200`}
        onClick={logout}
      >
        <LogOut size={20} />
        {!isCollapsed && <span>Logout</span>}
      </div>
    </aside>
  );
}
