import { useState } from "react";
import { NavLink } from "react-router-dom";
// import { FaBars, FaTimes } from "react-icons/fa";
import logo from "../../assets/logo.webp";

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
    <nav className="bg-white fixed w-full border-b z-10 border-gray-200 shadow-md">
      <div className="flex justify-between items-center px-6 py-4 lg:px-12 xl:px-20">
        <div>
          <img
            src={logo}
            alt="Help Ethiopia Logo"
            className="w-16 h-auto md:w-20"
          />
        </div>
        <p className="text-2xl text-gray-800 font-title text-center lg:hidden">
          Help Ethiopia
        </p>
        <div className="hidden lg:flex gap-8 font-text text-lg">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `cursor-pointer border-b-3 ${
                  isActive
                    ? "text-[#1E3A8A] font-semibold border-[#1E3A8A]"
                    : "border-transparent hover:text-[#1E3A8A] hover:border-[#1E3A8A] hover:font-medium"
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </div>
        <div className="hidden lg:block">
          <NavLink to="/donate">
            <button className="py-2 px-8 border border-[#1E3A8A] rounded-lg bg-[#1E3A8A] text-white font-text text-lg cursor-pointer">
              Donate
            </button>
          </NavLink>
        </div>
        <div className="lg:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
            className="text-gray-800 cursor-pointer"
          >
            {isOpen ? (
              <img
                src="https://img.icons8.com/?size=100&id=8112&format=png&color=000000"
                alt="Close Menu"
                loading="lazy"
                className="w-8"
              />
            ) : (
              <img
                src="https://img.icons8.com/?size=100&id=59832&format=png&color=000000"
                alt="Humberg Menu"
                loading="lazy"
                className="w-8"
              />
            )}
          </button>
        </div>
      </div>
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
                    ? "text-[#1E3A8A] font-semibold border-[#1E3A8A]"
                    : "border-transparent hover:text-[#1E3A8A] hover:border-[#1E3A8A] hover:font-medium"
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
          <NavLink to="/donate" onClick={() => setIsOpen(false)}>
            <button className="py-2 px-8 border border-[#1E3A8A] rounded-lg bg-[#1E3A8A] text-white font-text text-lg cursor-pointer">
              Donate
            </button>
          </NavLink>
        </div>
      )}
    </nav>
  );
}
