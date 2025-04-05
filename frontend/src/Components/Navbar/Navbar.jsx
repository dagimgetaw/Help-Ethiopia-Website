import { useState, useContext, useMemo } from "react";
import AuthContext from "../../AuthContext";
import { Link, NavLink } from "react-router-dom";
import logo from "../../assets/logo.webp";
import { User, X, AlignJustify } from "lucide-react";

export default function Navbar() {
  const [state, setState] = useState({ isOpen: false, isPopUp: false });
  const { isLoggedIn, logout, firstName, isAdmin } = useContext(AuthContext);

  const navLinks = useMemo(
    () => [
      { path: "/", label: "Home" },
      { path: "/about-us", label: "About Us" },
      { path: "/our-team", label: "Our Team" },
      { path: "/blogs", label: "Blogs" },
      { path: "/what-we-do", label: "What We Do" },
    ],
    []
  );

  const toggleMenu = () =>
    setState((prev) => ({ ...prev, isOpen: !prev.isOpen }));
  const togglePopUp = () =>
    setState((prev) => ({ ...prev, isPopUp: !prev.isPopUp }));
  const closePopUp = () => setState((prev) => ({ ...prev, isPopUp: false }));

  const getNavLinkClass = ({ isActive }) =>
    `cursor-pointer border-b-[3px] transition-colors duration-300 ${
      isActive
        ? "text-[#1E3A8A] font-semibold border-[#1E3A8A]"
        : "border-transparent text-gray-700 hover:text-[#1E3A8A] hover:border-[#1E3A8A]"
    }`;

  return (
    <nav className="bg-white fixed w-full border-b z-10 border-gray-200 shadow-md font-text">
      <div className="flex justify-between items-center px-6 py-4 lg:px-12 xl:px-20">
        <NavLink to="/">
          <img
            src={logo}
            alt="Help Ethiopia Logo"
            className="w-16 h-auto md:w-20"
          />
        </NavLink>

        <p className="text-2xl text-gray-800 font-title text-center lg:hidden">
          Help Ethiopia
        </p>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex gap-8 text-lg">
          {navLinks.map((link) => (
            <NavLink key={link.path} to={link.path} className={getNavLinkClass}>
              {link.label}
            </NavLink>
          ))}
        </div>

        {/* Desktop Buttons */}
        <div className="hidden lg:flex gap-4">
          {isLoggedIn ? (
            <>
              <button
                title="Profile"
                className="p-2 border border-gray-400 rounded-3xl cursor-pointer"
                onClick={togglePopUp}
              >
                <User size={28} color="#808080" strokeWidth={1} />
              </button>
              {state.isPopUp && (
                <UserPopup
                  firstName={firstName}
                  logout={logout}
                  closePopUp={closePopUp}
                  isAdmin={isAdmin}
                />
              )}
            </>
          ) : (
            <NavLink to="/login">
              <button className="py-2 px-6 border border-[#1E3A8A] rounded-lg text-gray-80 text-lg cursor-pointer transition-all duration-300 hover:bg-[#1E3A8A] hover:text-white hover:shadow-lg">
                Join
              </button>
            </NavLink>
          )}
          <NavLink to="/donate">
            <button className="py-2 px-8 border border-[#1E3A8A] rounded-lg bg-[#1E3A8A] text-white text-lg cursor-pointer transition-all duration-300 hover:bg-[#172554] hover:shadow-lg">
              Donate
            </button>
          </NavLink>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="lg:hidden flex gap-4">
          {isLoggedIn && (
            <button
              title="Profile"
              className="p-2 border border-gray-400 rounded-3xl cursor-pointer"
              onClick={togglePopUp}
            >
              <User size={28} color="#808080" strokeWidth={1} />
            </button>
          )}
          <button
            onClick={toggleMenu}
            aria-label="Toggle menu"
            aria-expanded={state.isOpen}
            className="text-gray-800 cursor-pointer focus:outline-none"
          >
            {state.isOpen ? (
              <X
                size={48}
                color="#000000"
                strokeWidth={1}
                className="w-8 transition-transform duration-300 hover:rotate-180"
              />
            ) : (
              <AlignJustify
                size={48}
                color="#000000"
                strokeWidth={1}
                className="w-8 transition-transform duration-300 hover:rotate-180"
              />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {state.isOpen && (
        <div className="lg:hidden flex flex-col items-center gap-6 text-md py-4 bg-white shadow-md">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              onClick={toggleMenu}
              className={getNavLinkClass}
            >
              {link.label}
            </NavLink>
          ))}
        </div>
      )}
    </nav>
  );
}

// eslint-disable-next-line react/prop-types
function UserPopup({ firstName, logout, closePopUp, isAdmin }) {
  return (
    <div className="absolute w-80 h-auto top-24 right-8 text-center border border-gray-400 rounded-xl backdrop-blur-md bg-white/30 p-6 shadow-xl">
      <X
        size={28}
        color="#000000"
        strokeWidth={1}
        className="absolute top-2 right-2 cursor-pointer"
        onClick={closePopUp}
      />
      <p className="text-lg text-gray-900 font-semibold mb-4">
        Welcome, {firstName}.
      </p>
      <p className="text-sm text-gray-600 mb-4">
        Thanks for being a part of Help Ethiopia!
      </p>
      <div className="flex justify-center gap-2">
        {isAdmin && (
          <Link to="/admin/dashboard">
            <button className="py-1 px-4 border border-[#1E3A8A] rounded-lg text-[#1E3A8A] text-sm cursor-pointer transition-all duration-300 hover:bg-[#1E3A8A] hover:text-white">
              Dashboard
            </button>
          </Link>
        )}
        <button
          className="py-1 px-4 border border-[#1E3A8A] rounded-lg text-[#1E3A8A] text-sm cursor-pointer transition-all duration-300 hover:bg-[#1E3A8A] hover:text-white"
          onClick={() => {
            closePopUp();
            logout();
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
}
