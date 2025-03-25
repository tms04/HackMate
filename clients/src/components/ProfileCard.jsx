/* eslint-disable react/prop-types */
import React, { useState } from "react";
import {
  FaReact,
  FaNodeJs,
  FaFigma,
  FaRegQuestionCircle,
} from "react-icons/fa";
import { SiExpress, SiNextdotjs } from "react-icons/si";
import { motion } from "framer-motion";
import Cookies from "js-cookie";
import axios from "axios";

const ProfileCard = ({
  id,
  name,
  year,
  gender,
  department,
  profileImage,
  roles = [],
  skills = [],
  achievements = [],
  teamId,
}) => {
  // State for button feedback
  const [isRequestSent, setIsRequestSent] = useState(false);
  const [loading, setLoading] = useState(false);

  // Year Mapping for Better Readability
  const yearMap = { 1: "FY", 2: "SY", 3: "TY", 4: "Final" };
  year = yearMap[year] || "Unknown";

  const userId = Cookies.get("userId");

  const handleSendRequest = async () => {
    if (!userId) {
      alert("You must be logged in to send requests.");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/team/sendRequest`,
        {
          teamId, // Team to which the request is being sent
          requesterId: id, // The user being requested to join
        },
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`, // Authentication token
          },
        }
      );

      console.log("Request sent successfully:", response.data);
      alert("Request sent successfully!");
      setIsRequestSent(true); // Disable button after success
    } catch (error) {
      console.error("Error sending request:", error.response?.data || error);
      alert(error.response?.data?.message || "Failed to send request.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      className="relative bg-gradient-to-b from-base-100 to-base-200 p-5 min-w-80 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 h-full"
      whileHover={{ scale: 1.05 }}
    >
      {/* Profile Image & Name */}
      <div className="flex flex-col items-center">
        <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-neutral">
          <img
            src={profileImage}
            alt="Profile"
            className="w-full h-full object-cover"
          />
        </div>
        <h2 className="text-lg font-bold mt-2 text-base-content">{name}</h2>
        <p className="text-sm text-base-content/70">
          {department} | {year} | {gender}
        </p>
      </div>

      {/* Roles with Separator */}
      {roles.length > 0 && (
        <div className="mt-4 flex justify-center items-center gap-2 text-sm font-medium text-base-content">
          {roles.slice(0, 3).map((role, index) => (
            <React.Fragment key={index}>
              <span className="px-3 py-1 text-xs font-semibold bg-neutral text-neutral-content rounded-full">
                {role}
              </span>
              {index !== Math.min(roles.length - 1, 2) && (
                <span className="text-lg text-neutral">&raquo;</span>
              )}
            </React.Fragment>
          ))}
        </div>
      )}

      {/* Skills Icons */}
      {skills.length > 0 && (
        <div className="mt-4 flex justify-center gap-3 text-lg text-base-content">
          {skills.map((skill, index) => {
            const icons = {
              Figma: <FaFigma />,
              React: <FaReact />,
              Node: <FaNodeJs />,
              Express: <SiExpress />,
              NextJS: <SiNextdotjs />,
            };

            return (
              <div key={index} className="relative group">
                {icons[skill] || <FaRegQuestionCircle />}{" "}
                {/* Show Question Icon if Skill not in List */}
                <span className="absolute bottom-7 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-white text-black text-xs px-2 py-1 rounded shadow">
                  {skill}
                </span>
              </div>
            );
          })}
        </div>
      )}

      {/* Achievements (Ensuring Consistent UI) */}
      <div className="mt-4 flex justify-center min-h-[60px]">
        {achievements.length > 0 ? (
          <div className="grid grid-cols-2 gap-x-6 gap-y-3 text-xs text-base-content place-items-start">
            {achievements.slice(0, 6).map((achievement, index) => (
              <div key={index} className="flex items-center gap-2">
                <span className="w-6 h-6 flex items-center justify-center text-xs font-bold bg-neutral text-neutral-content rounded-full">
                  {achievement.rank}
                </span>
                <span className="text-left">{achievement.name}</span>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-xs text-base-content/60 italic">
            No Achievements Yet
          </p>
        )}
      </div>

      {/* Connect Button */}
      {teamId && (
        <motion.button
          className="btn btn-outline w-full mt-4 rounded-lg text-sm"
          whileHover={{ scale: 1.1 }}
          onClick={handleSendRequest}
          disabled={isRequestSent || loading}
        >
          {loading ? "Sending..." : isRequestSent ? "Request Sent" : "Connect"}
        </motion.button>
      )}
    </motion.div>
  );
};

export default ProfileCard;
