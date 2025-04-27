import { useState, useContext, useMemo, useEffect, useRef } from "react";
import AuthContext from "../../AuthContext";
import { Link, NavLink, useLocation } from "react-router-dom";
import logo from "../../assets/logo.webp";
import {
  X,
  AlignJustify,
  Home,
  Users,
  BookOpen,
  HeartHandshake,
} from "lucide-react";

export default function Navbar() {
  const [state, setState] = useState({
    isOpen: false,
    isPopUp: false,
    isScrolled: false,
    mobilePopUp: false,
  });
  const { isLoggedIn, logout, firstName, isAdmin } = useContext(AuthContext);
  const location = useLocation();
  const popupRef = useRef(null);
  const navbarRef = useRef(null);
  const mobileMenuRef = useRef(null);

  const isHomePage = location.pathname === "/";

  // Close mobile menu when route changes
  useEffect(() => {
    setState((prev) => ({ ...prev, isOpen: false, mobilePopUp: false }));
  }, [location]);

  // Handle scroll effect
  useEffect(() => {
    if (!isHomePage) {
      setState((prev) => ({ ...prev, isScrolled: true }));
      return;
    }

    const handleScroll = () => {
      const isScrolled = window.scrollY > 100;
      if (isScrolled !== state.isScrolled) {
        setState((prev) => ({ ...prev, isScrolled }));
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [state.isScrolled, isHomePage]);

  // Close popups when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Close desktop popup
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        if (navbarRef.current && !navbarRef.current.contains(event.target)) {
          closePopUp();
        }
      }

      // Close mobile menu and popup
      if (
        state.isOpen &&
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target)
      ) {
        if (navbarRef.current && !navbarRef.current.contains(event.target)) {
          setState((prev) => ({ ...prev, isOpen: false, mobilePopUp: false }));
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [state.isOpen]);

  const navLinks = useMemo(
    () => [
      { path: "/", label: "Home", icon: <Home size={20} /> },
      { path: "/about-us", label: "About Us", icon: <Users size={20} /> },
      { path: "/our-team", label: "Our Team", icon: <Users size={20} /> },
      { path: "/blogs", label: "Blogs", icon: <BookOpen size={20} /> },
      {
        path: "/what-we-do",
        label: "What We Do",
        icon: <HeartHandshake size={20} />,
      },
    ],
    []
  );

  const toggleMenu = () =>
    setState((prev) => ({
      ...prev,
      isOpen: !prev.isOpen,
      mobilePopUp: false,
    }));

  const togglePopUp = () =>
    setState((prev) => ({
      ...prev,
      isPopUp: !prev.isPopUp,
    }));

  const toggleMobilePopUp = () =>
    setState((prev) => ({
      ...prev,
      mobilePopUp: !prev.mobilePopUp,
    }));

  const closePopUp = () =>
    setState((prev) => ({
      ...prev,
      isPopUp: false,
      mobilePopUp: false,
    }));

  const getNavLinkClass = ({ isActive }) =>
    `flex items-center gap-2 px-3 py-2 rounded-lg ${
      isActive
        ? "bg-blue-100 text-blue-700 font-semibold"
        : "text-gray-700 hover:bg-gray-100 hover:text-blue-600"
    }`;

  return (
    <nav
      ref={navbarRef}
      className={`fixed w-full z-50 ${
        !isHomePage || state.isScrolled
          ? "bg-white backdrop-blur-sm border-b border-gray-200 shadow-sm"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="mx-auto w-full flex justify-between items-center py-2 md:py-4 px-6 md:px-12 lg:px-14">
        {/* Logo */}
        <NavLink to="/" className="flex items-center gap-3 hover:opacity-90">
          <img
            src={logo}
            alt="Help Ethiopia Logo"
            className="w-16 h-auto md:w-16"
          />
        </NavLink>
        <span
          className={`md:block text-lg text-center lg:hidden ${
            state.isScrolled ? "text-gray-800" : "text-white"
          }`}
        >
          HELP Ethiopia
        </span>
        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `flex items-center gap-2 px-3 py-2 rounded-lg ${
                  isActive
                    ? "bg-blue-100 text-blue-700 font-semibold"
                    : state.isScrolled
                    ? "text-gray-700 hover:bg-gray-100 hover:text-blue-600"
                    : "text-white/90 hover:text-white hover:bg-white/10"
                }`
              }
            >
              {link.icon}
              {link.label}
            </NavLink>
          ))}
        </div>

        {/* Desktop Buttons */}
        <div className="hidden lg:flex items-center gap-3">
          {isLoggedIn ? (
            <div className="relative" ref={popupRef}>
              <button
                onClick={togglePopUp}
                className={`flex items-center gap-2 px-4 py-2 rounded-full cursor-pointer ${
                  state.isScrolled
                    ? "bg-gray-100 hover:bg-gray-200"
                    : "bg-white/10 hover:bg-white/20"
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center font-medium cursor-pointer ${
                    state.isScrolled
                      ? "bg-blue-600 text-white"
                      : "bg-white text-blue-600"
                  }`}
                >
                  {firstName.charAt(0).toUpperCase()}
                </div>
                <span
                  className={`font-medium ${
                    state.isScrolled ? "text-gray-800" : "text-white"
                  }`}
                >
                  {firstName}
                </span>
              </button>

              {state.isPopUp && (
                <UserPopup
                  firstName={firstName}
                  logout={logout}
                  closePopUp={closePopUp}
                  isAdmin={isAdmin}
                />
              )}
            </div>
          ) : (
            <NavLink to="/login">
              <button
                className={`px-6 py-2 rounded-lg font-medium cursor-pointer ${
                  state.isScrolled
                    ? "text-blue-700 bg-blue-50"
                    : "text-white bg-white/10"
                }`}
              >
                Sign In
              </button>
            </NavLink>
          )}
          <NavLink to="/donate">
            <button
              className={`px-6 py-2.5 rounded-lg font-medium shadow-sm hover:shadow-md cursor-pointer ${
                state.isScrolled
                  ? "bg-blue-600 text-white hover:bg-blue-700"
                  : "bg-white text-blue-600 hover:bg-white/90"
              }`}
            >
              Donate
            </button>
          </NavLink>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="lg:hidden flex items-center gap-3 py-2">
          {isLoggedIn && (
            <div className="relative">
              <button
                onClick={toggleMobilePopUp}
                className={`w-10 h-10 rounded-full flex items-center cursor-pointer justify-center ${
                  state.isScrolled
                    ? "bg-gray-100 hover:bg-gray-200"
                    : "bg-white/10 hover:bg-white/20"
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center font-medium ${
                    state.isScrolled
                      ? "bg-blue-600 text-white"
                      : "bg-white text-blue-600"
                  }`}
                >
                  {firstName.charAt(0).toUpperCase()}
                </div>
              </button>

              {state.mobilePopUp && (
                <MobileUserPopup
                  firstName={firstName}
                  logout={() => {
                    toggleMobilePopUp();
                    logout();
                  }}
                  closePopUp={toggleMobilePopUp}
                  isAdmin={isAdmin}
                />
              )}
            </div>
          )}
          <button
            onClick={toggleMenu}
            aria-label="Toggle menu"
            aria-expanded={state.isOpen}
            className={`p-2 rounded-md focus:outline-none ${
              state.isScrolled
                ? "text-gray-800 hover:bg-gray-100"
                : "text-white hover:bg-white/10"
            }`}
          >
            {state.isOpen ? (
              <X size={32} className="cursor-pointer" />
            ) : (
              <AlignJustify size={32} className="cursor-pointer" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {state.isOpen && (
        <div
          ref={mobileMenuRef}
          className={`lg:hidden overflow-hidden ${
            state.isScrolled ? "bg-white" : "bg-white/95 backdrop-blur-sm"
          }`}
        >
          <div className="container mx-auto px-4 py-3 flex flex-col gap-2">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                onClick={toggleMenu}
                className={getNavLinkClass}
              >
                {link.icon}
                {link.label}
              </NavLink>
            ))}
            <div className="flex flex-col gap-2 mt-2 pt-3 border-t border-gray-100">
              {isLoggedIn ? (
                <>
                  <button
                    onClick={() => {
                      toggleMenu();
                      logout();
                    }}
                    className="w-full px-4 py-2.5 text-left text-red-600 rounded-lg hover:bg-red-50"
                  >
                    Sign Out
                  </button>
                  {isAdmin && (
                    <NavLink
                      to="/admin/dashboard"
                      onClick={toggleMenu}
                      className="px-4 py-2.5 text-left rounded-lg hover:bg-gray-100"
                    >
                      Admin Dashboard
                    </NavLink>
                  )}
                </>
              ) : (
                <NavLink
                  to="/login"
                  onClick={toggleMenu}
                  className="px-4 py-2.5 text-center rounded-lg bg-blue-600 text-white hover:bg-blue-700"
                >
                  Sign In
                </NavLink>
              )}
              <NavLink
                to="/donate"
                onClick={toggleMenu}
                className="px-4 py-2.5 text-center rounded-lg border border-blue-600 text-blue-600 hover:bg-blue-50"
              >
                Donate
              </NavLink>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

// eslint-disable-next-line react/prop-types
function MobileUserPopup({ firstName, logout, closePopUp, isAdmin }) {
  return (
    <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-200 overflow-hidden z-50">
      <div className="p-3 border-b border-gray-100">
        <p className="font-medium text-gray-900 text-sm">Hello, {firstName}</p>
      </div>
      <div className="p-1">
        {isAdmin && (
          <Link
            to="/admin/dashboard"
            onClick={closePopUp}
            className="block px-3 py-2 text-left rounded-md hover:bg-gray-50 text-gray-700 text-sm"
          >
            Admin Dashboard
          </Link>
        )}
        <button
          onClick={logout}
          className="w-full px-3 py-2 text-left rounded-md hover:bg-gray-50 text-red-600 text-sm"
        >
          Sign Out
        </button>
      </div>
    </div>
  );
}

// eslint-disable-next-line react/prop-types
function UserPopup({ firstName, logout, closePopUp, isAdmin }) {
  return (
    <div className="absolute right-0 top-full mt-2 w-64 bg-white rounded-lg shadow-xl border border-gray-200 overflow-hidden z-50">
      <div className="p-4 border-b border-gray-100">
        <p className="font-medium text-gray-900">Hello, {firstName}</p>
        <p className="text-sm text-gray-500">Welcome back</p>
      </div>
      <div className="p-2">
        {isAdmin && (
          <Link
            to="/admin/dashboard"
            onClick={closePopUp}
            className="block px-3 py-2 text-left rounded-md hover:bg-gray-50 text-gray-700"
          >
            Admin Dashboard
          </Link>
        )}
        <button
          onClick={logout}
          className="w-full px-3 py-2 text-left rounded-md hover:bg-gray-50 text-red-600"
        >
          Sign Out
        </button>
      </div>
    </div>
  );
}
