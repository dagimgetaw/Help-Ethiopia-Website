import { useState } from "react";
import { NavLink } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import logo from "../../assets/logo.png";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/about-us", label: "About Us" },
    { path: "/our-team", label: "Our Team" },
    { path: "/what-we-do", label: "What We Do" },
    { path: "/contact", label: "Contact" },
  ];

  return (
    <nav className="bg-white fixed w-full backdrop-blur-sm bg-opacity-50 z-10 border-b-2 border-gray-200 shadow-md">
      <div className="flex justify-between items-center px-10 py-4 lg:px-15 xl:px-20">
        <div className="logo">
          <img src={logo} alt="Help Ethiopia Logo" className="w-18 h-18" />
        </div>

        <p className="text-2xl text-gray-800 font-title text-center lg:hidden">
          Help Ethiopia
        </p>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex lg:gap-8 xl:gap-10 font-text font-normal text-lg">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `cursor-pointer border-b-2 ${
                  isActive
                    ? "text-[#1E3A8A] font-semibold border-[#1E3A8A] border-b-3"
                    : "border-transparent hover:text-[#1E3A8A] border-b-3 hover:border-[#1E3A8A] hover:font-medium"
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </div>

        {/* Desktop Donate Button */}
        <div className="hidden lg:block">
          <NavLink to="/donate">
            <button className="py-2 px-10 border border-[#1E3A8A] rounded-lg bg-[#1E3A8A] text-white font-text font-normal text-lg cursor-pointer">
              Donate
            </button>
          </NavLink>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="lg:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-gray-800 cursor-pointer"
          >
            {isOpen ? <FaTimes size={28} /> : <FaBars size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isOpen && (
        <div className="lg:hidden flex flex-col items-center gap-6 text-md font-text py-4 bg-white shadow-md">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `cursor-pointer border-b-2 ${
                  isActive
                    ? "text-[#1E3A8A] font-semibold border-[#1E3A8A] border-b-3"
                    : "border-transparent hover:text-[#1E3A8A] border-b-3 hover:border-[#1E3A8A] hover:font-medium"
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
          <NavLink to="/donate" onClick={() => setIsOpen(false)}>
            <button className="py-2 px-10 border border-[#1E3A8A] rounded-lg bg-[#1E3A8A] text-white font-text font-normal text-lg cursor-pointer">
              Donate
            </button>
          </NavLink>
        </div>
      )}
    </nav>
  );
}
