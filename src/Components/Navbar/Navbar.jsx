import { useState } from "react";
import { NavLink } from "react-router-dom";
import logo from "../../assets/logo.webp";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/about-us", label: "About Us" },
    { path: "/our-team", label: "Our Team" },
    { path: "/blogs", label: "Blogs" },
    { path: "/what-we-do", label: "What We Do" },
  ];

  return (
    <nav className="bg-white fixed w-full border-b z-10 border-gray-200 shadow-md">
      <div className="flex justify-between items-center px-6 py-4 lg:px-12 xl:px-20">
        {/* Logo */}
        <div>
          <img
            src={logo}
            alt="Help Ethiopia Logo"
            className="w-16 h-auto md:w-20 transition-transform duration-300 hover:scale-105"
          />
        </div>

        {/* Mobile Title */}
        <p className="text-2xl text-gray-800 font-title text-center lg:hidden">
          Help Ethiopia
        </p>

        {/* Desktop Navigation Links */}
        <div className="hidden lg:flex gap-8 font-text text-lg">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `cursor-pointer border-b-3 transition-colors duration-300 ${
                  isActive
                    ? "text-[#1E3A8A] font-semibold border-[#1E3A8A]"
                    : "border-transparent text-gray-700 hover:text-[#1E3A8A] hover:border-[#1E3A8A]"
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </div>

        {/* Desktop Buttons */}
        <div className="hidden lg:flex gap-4">
          <NavLink to="/signup">
            <button className="py-2 px-6 border border-[#1E3A8A] rounded-lg text-gray-800 font-text text-lg cursor-pointer transition-all duration-300 hover:bg-[#1E3A8A] hover:text-white hover:shadow-lg">
              Join
            </button>
          </NavLink>
          <NavLink to="/donate">
            <button className="py-2 px-8 border border-[#1E3A8A] rounded-lg bg-[#1E3A8A] text-white font-text text-lg cursor-pointer transition-all duration-300 hover:bg-[#172554] hover:shadow-lg">
              Donate
            </button>
          </NavLink>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="lg:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
            className="text-gray-800 cursor-pointer focus:outline-none"
          >
            {isOpen ? (
              <img
                src="https://img.icons8.com/?size=100&id=8112&format=png&color=000000"
                alt="Close Menu"
                loading="lazy"
                className="w-8 transition-transform duration-300 hover:rotate-180"
              />
            ) : (
              <img
                src="https://img.icons8.com/?size=100&id=59832&format=png&color=000000"
                alt="Hamburger Menu"
                loading="lazy"
                className="w-8 transition-transform duration-300 hover:rotate-180"
              />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden flex flex-col items-center gap-6 text-md font-text py-4 bg-white shadow-md">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `cursor-pointer border-b-3 transition-colors duration-300 ${
                  isActive
                    ? "text-[#1E3A8A] font-semibold border-[#1E3A8A]"
                    : "border-transparent text-gray-700 hover:text-[#1E3A8A] hover:border-[#1E3A8A]"
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}

          {/* Mobile Buttons */}
          <div className="flex gap-6">
            <NavLink to="/signup" onClick={() => setIsOpen(false)}>
              <button className="py-2 px-6 border border-gray-700 rounded-lg text-gray-800 font-text text-lg cursor-pointer transition-all duration-300 hover:bg-gray-100 hover:shadow-md">
                Join
              </button>
            </NavLink>
            <NavLink to="/donate" onClick={() => setIsOpen(false)}>
              <button className="py-2 px-8 border border-[#1E3A8A] rounded-lg bg-[#1E3A8A] text-white font-text text-lg cursor-pointer transition-all duration-300 hover:bg-[#172554] hover:shadow-md">
                Donate
              </button>
            </NavLink>
          </div>
        </div>
      )}
    </nav>
  );
}
