import { useEffect, useState } from "react";
import { FaHome, FaArrowLeft, FaSun, FaMoon } from "react-icons/fa";
import { useNavigate } from "react-router-dom"; // React Router for navigation

const Toggle = () => {
  // Always initialize with light theme
  const [theme, setTheme] = useState("light");
  const navigate = useNavigate(); // Use React Router for navigation

  useEffect(() => {
    // Set light theme on initial load
    document.documentElement.setAttribute("data-theme", "light");
    localStorage.setItem("theme", "light");
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <div className="fixed sm:top-20 sm:left-4 left-20 top-4 flex sm:flex-col items-center gap-3 z-10">
      {/* Back Button */}
      <button
        className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-800 text-white shadow-md transition 
                   hover:bg-gray-700 hover:shadow-lg"
        onClick={() => navigate(-1)} // Goes back to the previous page
      >
        <FaArrowLeft className="w-6 h-6" />
      </button>

      {/* Home Button */}
      <button
        className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-800 text-white shadow-md transition 
                   hover:bg-gray-700 hover:shadow-lg"
        onClick={() => navigate("/main")} // Navigates to home
      >
        <FaHome className="w-6 h-6" />
      </button>

      {/* Theme Toggle - Sun & Moon Icons */}
      <button
        className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-800 text-yellow-400 shadow-md transition 
                   hover:bg-gray-700 hover:shadow-lg"
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      >
        {theme === "dark" ? <FaSun className="w-6 h-6" /> : <FaMoon className="w-6 h-6 text-gray-300" />}
      </button>
    </div>
  );
};

export default Toggle;
