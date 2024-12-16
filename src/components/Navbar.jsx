import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  // Retrieve user data from localStorage
  const user = JSON.parse(localStorage.getItem("user"));
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("access_token");
    setDropdownOpen(false);
    navigate("/login");
  };

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  return (
    <div className="flex flex-row justify-between p-4">
      <div>
        <Link to="/" className="font-bold text-2xl">
          AR Shakir
        </Link>
      </div>

      <div className="flex flex-row gap-4">
        <Link to="#" className="px-4 py-2 hover:text-purple-700">
          Products
        </Link>
        <Link to="#" className="px-4 py-2 hover:text-purple-700">
          Home
        </Link>
        <Link to="#" className="px-4 py-2 hover:text-purple-700">
          Price
        </Link>
      </div>

      <div>
        {user ? (
          <div className="relative">
            <div
              onClick={toggleDropdown}
              className="flex items-center gap-2 cursor-pointer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-purple-700"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5.121 17.804A6 6 0 0112 14a6 6 0 016.879 3.804M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              <div className="text-sm">
                <p className="font-bold">{user.name}</p>
                <p className="text-gray-600">{user.email}</p>
              </div>
            </div>

            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md">
                <button
                  onClick={handleLogout}
                  className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100 w-full text-left"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <Link
            to="/login"
            className="px-8 py-3 bg-purple-700 text-white text-sm flex flex-row justify-center items-center"
          >
            Start Free
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
