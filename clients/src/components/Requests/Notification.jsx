/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import {
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaUsers,
  FaChevronDown,
  FaChevronUp,
} from "react-icons/fa";
import SmallSquare from "./Square";
import { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "react-hot-toast";

const Notification = ({ team, onAction }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleDropdownToggle = () => {
    setShowDropdown(!showDropdown);
  };

  // Handle accept invitation
  const handleAccept = async () => {
    try {
      setLoading(true);
      const token = Cookies.get("token");
      if (!token) {
        toast.error("You must be logged in to accept invitations");
        setLoading(false);
        return;
      }

      console.log("Accepting invitation for team:", team._id);
      
      // Show the request being made
      console.log("POST request to:", `${import.meta.env.VITE_BACKEND_URL}/api/team/acceptRequest`);
      console.log("Request body:", { teamId: team._id });
      
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/team/acceptRequest`,
        { teamId: team._id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Accept response:", response.data);
      
      // Log success and call the parent component's callback
      console.log("Invitation accepted successfully");
      setLoading(false);
      onAction(team._id, 'accept', true);
    } catch (error) {
      console.error("Error accepting invitation:", error);
      console.error("Response:", error.response?.data);
      toast.error(error.response?.data?.message || "Failed to accept invitation");
      setLoading(false);
    }
  };

  // Handle decline invitation
  const handleDecline = async () => {
    try {
      setLoading(true);
      const token = Cookies.get("token");
      if (!token) {
        toast.error("You must be logged in to decline invitations");
        setLoading(false);
        return;
      }

      console.log("Declining invitation for team:", team._id);
      
      // Show the request being made
      console.log("POST request to:", `${import.meta.env.VITE_BACKEND_URL}/api/team/declineRequest`);
      console.log("Request body:", { teamId: team._id });
      
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/team/declineRequest`,
        { teamId: team._id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Decline response:", response.data);
      
      // Log success and call the parent component's callback
      console.log("Invitation declined successfully");
      setLoading(false);
      onAction(team._id, 'decline', true);
    } catch (error) {
      console.error("Error declining invitation:", error);
      console.error("Response:", error.response?.data);
      toast.error(error.response?.data?.message || "Failed to decline invitation");
      setLoading(false);
    }
  };

  return (
    <div className="relative flex flex-col w-full">
      <div className="flex items-center w-full p-4 rounded-lg shadow-md bg-base-100 text-base-content font-sans gap-4 gap-x-20">
        <SmallSquare />
        <div className="flex flex-col w-full">
          {/* Header */}
          <div className="flex justify-between items-center">
            <h1 className="font-bold text-lg">{team.hackathonName || "Unnamed Hackathon"}</h1>
            {/* Toggle Button with Chevron */}
            <button
              className="bg-neutral p-2 rounded-full shadow-md transition-all"
              onClick={handleDropdownToggle}
            >
              {showDropdown ? (
                <FaChevronUp className="w-4 h-4 text-white" />
              ) : (
                <FaChevronDown className="w-4 h-4 text-white" />
              )}
            </button>
          </div>

          <div className="text-sm text-base-content mb-2 space-y-1">
            <p className="flex items-center gap-2">
              <FaMapMarkerAlt className="text-neutral" /> 
              {team.location || (team.mode === "Online" ? "Online" : "Location not specified")}
            </p>
            <p className="flex items-center gap-2">
              <FaCalendarAlt className="text-neutral" />
              {team.startDate ? new Date(team.startDate).toLocaleDateString("en-US", {
                day: "numeric",
                month: "short",
              }) : "Start date not set"}{" "}
              -
              {team.endDate ? new Date(team.endDate).toLocaleDateString("en-US", {
                day: "numeric",
                month: "short",
                year: "numeric",
              }) : "End date not set"}
            </p>
            <p className="flex items-center gap-2">
              <FaUsers className="text-neutral" /> 
              Team: {team.teamName || "Unnamed"} ({(team.teamMembers?.length || 0)}/{team.maxSize || "∞"})
            </p>
            <p className="flex items-center gap-2">
              <FaUsers className="text-neutral" /> 
              Domains: {team.domains?.join(", ") || "No domains specified"}
            </p>
          </div>

          <div className="flex gap-3">
            <button 
              className={`btn ${loading ? 'loading loading-spinner' : 'btn-neutral'} btn-sm`}
              onClick={handleAccept}
              disabled={loading}
            >
              Accept
            </button>
            <button 
              className={`btn ${loading ? 'loading loading-spinner' : 'btn-outline'} btn-sm`}
              onClick={handleDecline}
              disabled={loading}
            >
              Decline
            </button>
          </div>
        </div>
      </div>

      {/* Team Members Dropdown */}
      {showDropdown && (
        <div className="bg-base-100 p-4 rounded-lg shadow-md w-full mt-2 flex flex-wrap gap-4 ">
          {team.teamMembers && team.teamMembers.length > 0 ? (
            team.teamMembers.map((member, index) => (
              <div key={index} className="flex items-center gap-3 mb-3 bg-success/15 p-2 rounded-lg border border-success">
                <img
                  src={member.profilePic || "https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.webp"}
                  alt={member.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div className="text-sm">
                  <p className="font-semibold">{member.name}</p>
                  <p className="text-xs text-gray-400">
                    {member.year ? `Year ${member.year}` : ''} 
                    {member.department ? ` | ${member.department}` : ''}
                    {member.gender ? ` | ${member.gender}` : ''}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center w-full text-sm text-base-content opacity-70">No team members available</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Notification;
