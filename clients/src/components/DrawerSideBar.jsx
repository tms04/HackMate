import { FiEdit, FiMail, FiUsers, FiLogOut, FiLayers } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

const DrawerSideBar = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("User"); // Default placeholder

  useEffect(() => {
    const fetchUsername = async () => {
      const userId = Cookies.get("userId");
      if (!userId) return;

      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/users/username/${userId}`
        );
        setUsername(response.data.username);
      } catch (error) {
        console.error("Error fetching username:", error);
      }
    };

    fetchUsername();
  }, []);

  // Function to navigate and close the drawer
  const handleNavigation = (path) => {
    navigate(path);
    document.getElementById("my-drawer").checked = false; // Close drawer
  };

  const handleLogout = () => {
    Cookies.remove("token");
    Cookies.remove("userId");
    handleNavigation("/login"); // Navigate to login and close drawer
  };

  return (
    <div className="drawer-side">
      <label
        htmlFor="my-drawer"
        aria-label="close sidebar"
        className="drawer-overlay"
      ></label>

      <div className="menu bg-base-100 text-base-content min-h-full w-80 flex flex-col shadow-lg p-0">
        {/* User Profile Section */}
        <div className="w-full px-5 py-4 bg-neutral text-white flex items-center justify-between">
          <span className="text-lg font-semibold tracking-wide">
            Hello {username}!
          </span>
          <button
            className="flex items-center gap-2 text-white hover:text-gray-300 transition-all"
            onClick={() => handleNavigation("/userdetails")}
          >
            <FiEdit size={18} />
            <span className="text-sm">Edit</span>
          </button>
        </div>

        {/* Navigation Options */}
        <div className="flex flex-col flex-grow p-5 gap-4">
          <button
            className="btn w-full h-32 bg-amber-500 hover:bg-amber-600 text-white text-lg font-medium flex items-center justify-center gap-3 rounded-xl shadow-md transition-all"
            onClick={() => handleNavigation("/newteam")}
          >
            <FiUsers size={26} />
            Create Team
          </button>
          <button
            onClick={() => handleNavigation("/notifications")}
            className="btn w-full h-32 bg-sky-500 hover:bg-sky-600 text-white text-lg font-medium flex items-center justify-center gap-3 rounded-xl shadow-md transition-all"
          >
            <FiMail size={26} />
            Requests
          </button>
          <button
            onClick={() => handleNavigation("/myteams")}
            className="btn w-full h-32 bg-green-500 hover:bg-green-600 text-white text-lg font-medium flex items-center justify-center gap-3 rounded-xl shadow-md transition-all"
          >
            <FiLayers size={26} />
            My Teams
          </button>
        </div>

        {/* Logout Button (Sticky at Bottom) */}
        <div className="p-5 mt-auto">
          <button
            className="btn w-full bg-red-600 hover:bg-red-700 text-white flex items-center justify-center gap-2 text-lg font-semibold rounded-xl shadow-md transition-all"
            onClick={handleLogout}
          >
            <FiLogOut size={22} />
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default DrawerSideBar;
