import { useState, useEffect } from "react";
import axios from "axios";
import { FiMenu } from "react-icons/fi";
import { motion } from "framer-motion";
import DrawerSideBar from "../components/DrawerSideBar";
import ProfileCard from "../components/ProfileCard";

const MainPage = () => {
  const [users, setUsers] = useState([]); // State to store fetched users
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  // Fetch users from the backend
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/users/all`
        ); // Replace with your API endpoint
        setUsers(response.data.data); // Set the fetched users
        setLoading(false); // Set loading to false
      } catch (err) {
        console.error("Error fetching users:", err);
        setError("Failed to fetch users. Please try again later.");
        setLoading(false); // Set loading to false
      }
    };

    fetchUsers();
  }, []);

  // Display loading state
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-base-200">
        <p className="text-lg text-white">Loading...</p>
      </div>
    );
  }

  // Display error state
  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-base-200">
        <p className="text-lg text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="drawer">
      <input id="my-drawer" type="checkbox" className="drawer-toggle" />

      {/* Page Content */}
      <div className="drawer-content bg-base-200 min-h-screen text-white">
        {/* Drawer Button */}
        <label
          htmlFor="my-drawer"
          className="btn btn-circle btn-neutral fixed top-4 left-4 z-50 transition-opacity duration-300 drawer-button"
        >
          <FiMenu size={24} />
        </label>

        {/* Profile Cards Grid */}
        <div className="p-10 pt-14">
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 place-items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {users.map((profile) => (
              <ProfileCard
                key={profile._id} // Use _id from MongoDB
                name={profile.name}
                year={profile.year}
                gender={profile.gender}
                department={profile.department}
                profileImage={profile.profilePic} // Pass profile image if available
                roles={profile.roles} // Pass roles if available
                skills={profile.skills} // Pass skills if available
                achievements={profile.achievements} // Pass achievements if available
              />
            ))}
          </motion.div>
        </div>
      </div>

      <DrawerSideBar />

      {/* Hide Menu Icon When Drawer is Open */}
      <style>
        {`
          #my-drawer:checked ~ .drawer-content .drawer-button {
            opacity: 0;
            pointer-events: none;
          }
        `}
      </style>
    </div>
  );
};

export default MainPage;
