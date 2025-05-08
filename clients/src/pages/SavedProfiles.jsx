import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import ProfileCard from "../components/ProfileCard";
import Cookies from "js-cookie";

const SavedProfiles = () => {
  const userId = Cookies.get("userId");
  const [savedProfileIds, setSavedProfileIds] = useState([]);
  const [savedProfiles, setSavedProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("savedProfiles")) || [];
    setSavedProfileIds(saved);
  }, []);

  useEffect(() => {
    const fetchSavedProfiles = async () => {
      if (savedProfileIds.length === 0) {
        setSavedProfiles([]);
        setLoading(false);
        return;
      }

      try {
        // Assuming backend API supports fetching multiple users by IDs
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/users/all`,
          { userIds: savedProfileIds }
        );
        setSavedProfiles(response.data.data || []);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching saved profiles:", err);
        setError("Failed to fetch saved profiles. Please try again later.");
        setLoading(false);
      }
    };

    fetchSavedProfiles();
  }, [savedProfileIds]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-base-200 text-white">
        <p className="text-lg">Loading saved profiles...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-base-200 text-white">
        <p className="text-lg text-red-500">{error}</p>
      </div>
    );
  }

  if (savedProfiles.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-base-200 text-white">
        <p className="text-lg">No saved profiles found.</p>
      </div>
    );
  }

  return (
    <div className="p-4 bg-base-200 min-h-screen text-white">
      <h1 className="text-2xl font-bold mb-6">Saved Profiles</h1>
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 place-items-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {savedProfiles.map((profile) => (
          <ProfileCard
            key={profile._id}
            id={profile._id}
            userId1={userId}
            name={profile.name}
            year={profile.year}
            gender={profile.gender}
            department={profile.department}
            profileImage={profile.profilePic}
            roles={profile.roles}
            skills={profile.skills}
            achievements={profile.experience}
            resumeLink={profile.resumeLink}
          />
        ))}
      </motion.div>
    </div>
  );
};

export default SavedProfiles;
