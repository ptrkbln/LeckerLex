import React, { useState } from "react";
import {
  FaSearch,
  FaHeart,
  FaUser,
  FaInstagram,
  FaFacebook,
  FaWhatsapp,
  FaCartArrowDown,
} from "react-icons/fa";
import { BsJournalAlbum } from "react-icons/bs";
import { NavLink } from "react-router-dom";

function Footer() {
  const [activeIcon, setActiveIcon] = useState(null);
  return (
    <>
      <footer className="bg-current p-1 shadow-md w-full hidden md:block z-20">
        <div className="w-full mx-auto max-w-screen-2xl p-2 md:flex md:items-center md:justify-between">
          <span className="text-sm text-gray-500 sm:text-center dark:text-gray-600 flex items-center">
            © 2025{" "}
            <a href="#" className="hover:underline ml-1">
              LeckerLex
            </a>
            . All Rights Reserved.
            <span className="flex ml-4 space-x-2">
              <NavLink
                to="https://www.facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                <FaFacebook
                  size={24}
                  className="text-blue-500 hover:scale-125"
                />
              </NavLink>
              <NavLink
                to="https://web.whatsapp.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                <FaWhatsapp
                  size={24}
                  className="text-green-500 hover:scale-125"
                />
              </NavLink>
              <NavLink
                to="https://www.instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                <FaInstagram
                  size={24}
                  className="text-pink-500 hover:scale-125"
                />
              </NavLink>
            </span>
          </span>
          <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-600 sm:mt-0">
            <li>
              <NavLink to="#" className="hover:underline me-4 md:me-6">
                About
              </NavLink>
            </li>
            <li>
              <NavLink to="#" className="hover:underline me-4 md:me-6">
                Privacy Policy
              </NavLink>
            </li>
            <li>
              <NavLink to="#" className="hover:underline">
                Contact
              </NavLink>
            </li>
          </ul>
        </div>
      </footer>

      {/* Navigationsleiste für mobile Geräte */}

      <nav className="bg-green-50 rounded-lg shadow-md mx-auto fixed bottom-0 w-full md:hidden z-30">
        <ul className="flex justify-around p-2 text-sm font-medium text-gray-700">
          <li className="hover:text-green-500">
            <NavLink
              to="/home"
              className={`hover:underline ${
                activeIcon === "search" ? "text-green-500" : ""
              }`}
              onClick={() => setActiveIcon("search")}
            >
              <FaSearch size={20} />
            </NavLink>
          </li>
          <li className="hover:text-green-500">
            <NavLink
              to="shopping-list"
              className={`hover:underline ${
                activeIcon === "home" ? "text-green-500" : ""
              }`}
              onClick={() => setActiveIcon("home")}
            >
              <FaCartArrowDown size={20} />
            </NavLink>
          </li>
          <li className="hover:text-red-500">
            <NavLink
              to="favorites"
              className={`hover:underline ${
                activeIcon === "heart" ? "text-red-600" : ""
              }`}
              onClick={() => setActiveIcon("heart")}
            >
              <FaHeart size={20} />
            </NavLink>
          </li>
          <li className="hover:text-green-500">
            <NavLink
              to="journal"
              className={`hover:underline ${
                activeIcon === "journal" ? "text-green-500" : ""
              }`}
              onClick={() => setActiveIcon("journal")}
            >
              <BsJournalAlbum size={20} />
            </NavLink>
          </li>
          <li className="hover:text-green-500">
            <NavLink
              to="profile"
              className={`hover:underline ${
                activeIcon === "user" ? "text-green-500" : ""
              }`}
              onClick={() => setActiveIcon("user")}
            >
              <FaUser size={20} />
            </NavLink>
          </li>
        </ul>
      </nav>
    </>
  );
}

export default Footer;
