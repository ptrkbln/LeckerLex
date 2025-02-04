import React, { useState, useEffect, useRef, useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import {
  FaUser,
  FaHeart,
  FaSignOutAlt,
  FaCartArrowDown,
  FaUtensils,
} from "react-icons/fa";

const HoverEffect = () => (
  <>
    <span className="absolute -bottom-1 left-1/2 w-0 transition-all h-0.5 bg-green-600 group-hover:w-3/6"></span>
    <span className="absolute -bottom-1 right-1/2 w-0 transition-all h-0.5 bg-green-600 group-hover:w-3/6"></span>
  </>
);

function Navbar() {

  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  // Close the dropdown menu if clicking outside of it.
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  const handleLogout = async () => {
    try {
      const response = await fetch("http://localhost:3000/users/logout", {
        method: "POST",
        credentials: "include",
      });

      if (!response.ok) {
        const errorMessage = await response.json();
        console.error("Failed to logout", errorMessage);
        return;
      }
      navigate("/");
      setIsDropdownOpen(false);
      setTimeout(() => setIsLoggedIn(false), 0);
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <nav className="hidden md:flex items-center justify-between p-8 mr-6 ml-6 bg-transparent z-50">
      <div className="flex items-center">
        {/* Logo or Brand Name */}
        <NavLink to="/home" className="text-2xl font-bold text-orange-200">
          LeckerLex
        </NavLink>
      </div>
      {/* Increase horizontal gap between navlinks */}
      <div className="flex items-center space-x-8">
        {isLoggedIn && (
          <NavLink
            to="/home/profile"
            className="relative group text-orange-100 text-md w-max flex items-center"
          >
            <FaUser className="mr-2" />
            Profile
            <HoverEffect />
          </NavLink>
        )}

        <NavLink
          to="/home/favorites"
          className="relative group text-orange-100 text-md w-max flex items-center"
        >
          <FaHeart className="mr-2" />
          Favorites
          <HoverEffect />
        </NavLink>

        <NavLink
          to="/home/shopping-list"
          className="relative group text-orange-100 text-md w-max flex items-center"
        >
          <FaCartArrowDown className="mr-2" />
          Shopping List
          <HoverEffect />
        </NavLink>

               <NavLink
                  to="/home/journal"
                  className="relative group text-orange-100 text-md w-max flex items-center"
                >
                  <FaUtensils className="mr-2" /> Culinary Journal
                  <HoverEffect />
                </NavLink>

        {isLoggedIn ? (
          <button
            onClick={handleLogout}
            className="relative group text-orange-100 text-md w-max flex items-center"
          >
            <FaSignOutAlt className="mr-2" />
            Log Out
            <HoverEffect />
          </button>
        ) : (
          <NavLink
            to="/home/login"
            className="relative group text-orange-100 text-md w-max flex items-center"
          >
            <FaUser className="mr-2" />
            Log In
            <HoverEffect />
          </NavLink>
          
        )}
      </div>
    </nav>
  );
}

export default Navbar;
