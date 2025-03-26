/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { FaHome, FaArrowLeft, FaSun, FaMoon } from "react-icons/fa";
import { useNavigate } from "react-router-dom"; // React Router for navigation

const Toggle = () => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const navigate = useNavigate(); // Use React Router for navigation

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <div className="fixed top-8 right-4 md:top-8 md:right-8 flex flex-col items-center gap-3 z-10">
      {/* Theme Toggle - Sun & Moon Icons */}
      <button
        className="sm:w-12 sm:h-12 w-8 h-8 flex items-center justify-center rounded-full bg-gray-800 text-yellow-400 shadow-md transition 
                   hover:bg-gray-700 hover:shadow-lg"
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      >
        {theme === "dark" ? <FaSun className="w-4 h-4 sm:w-6 sm:h-6" /> : <FaMoon className="w-4 h-4 sm:w-6 sm:h-6 text-gray-300" />}
      </button>
    </div>
  );
};

export default Toggle;
