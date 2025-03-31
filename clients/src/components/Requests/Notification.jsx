/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { FaMapMarkerAlt, FaCalendarAlt, FaUsers, FaChevronDown, FaChevronUp } from "react-icons/fa";
import Square from "./Square";
import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Notification = ({ team = {}, onAction }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [teamMembers, setTeamMembers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMemberProfiles = async () => {
      if (!team.teamMembers || team.teamMembers.length === 0) return;

      try {
        const token = Cookies.get("token");
        if (!token) {
          toast.error("You must be logged in to see team members.");
          return;
        }

        const responses = await Promise.all(
          team.teamMembers.map((memberId) =>
            axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/users/profile/${memberId}`, {
              headers: { Authorization: `Bearer ${token}` },
            })
          )
        );

        const profiles = responses.map((res) => res.data);
        setTeamMembers(profiles);
      } catch (error) {
        toast.error("Failed to fetch team member details.");
      }
    };

    fetchMemberProfiles();
  }, [team.teamMembers]);

  const handleDropdownToggle = () => setShowDropdown((prev) => !prev);

  const handleAction = async (actionType) => {
    try {
      const token = Cookies.get("token");
      if (!token) {
        toast.error("You must be logged in to perform this action");
        return;
      }

      const apiUrl = `${import.meta.env.VITE_BACKEND_URL}/api/team/${actionType === "accept" ? "acceptRequest" : "declineRequest"
        }`;

      await axios.post(
        apiUrl,
        { teamId: team._id },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      toast.success(`Invitation ${actionType}ed successfully!`);
      if (typeof onAction === "function") {
        onAction(team._id, actionType, true);
      }

      if (actionType === "accept") navigate("/myteams");
    } catch (error) {
      toast.error(error.response?.data?.message || `Failed to ${actionType} invitation`);
      if (typeof onAction === "function") {
        onAction(team._id, actionType, false);
      }
    }
  };

  return (
    <div className="relative flex flex-col w-full ">
      <div className=" sm:flex-row flex-col flex items-center w-full p-4 rounded-lg shadow-md bg-base-100 text-base-content font-sans gap-4 sm:gap-x-20">
        {team.teamLeader && <Square leaderId={team.teamLeader} teamName={team.teamName} />}
        <div className="flex flex-col w-full pl-10">
          <div className="flex justify-between items-center">
            <h1 className="font-bold text-lg">{team.hackathonName || "Unnamed Hackathon"}</h1>
            <button className="bg-neutral p-2 rounded-full shadow-md" onClick={handleDropdownToggle}>
              {showDropdown ? <FaChevronUp className="w-4 h-4 text-white" /> : <FaChevronDown className="w-4 h-4 text-white" />}
            </button>
          </div>
          <div className="text-sm text-base-content mb-2 space-y-1">
            <p className="flex items-center gap-2">
              <FaMapMarkerAlt className="text-neutral" />
              {team.location || (team.mode === "Online" ? "Online" : "Location not specified")}
            </p>
            <p className="flex items-center gap-2">
              <FaCalendarAlt className="text-neutral" />
              {team.startDate
                ? new Date(team.startDate).toLocaleDateString("en-US", { day: "numeric", month: "short" })
                : "Start date not set"}{" "}
              -{" "}
              {team.endDate
                ? new Date(team.endDate).toLocaleDateString("en-US", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })
                : "End date not set"}
            </p>
            <p className="flex items-center gap-2">
              <FaUsers className="text-neutral" />
              Team: {team.teamName || "Unnamed"} ({team.teamMembers?.length || 0}/{team.maxSize || "∞"})
            </p>
            <p className="flex items-center gap-2">
              <FaUsers className="text-neutral" />
              Domains: {Array.isArray(team.domains) ? team.domains.join(", ") : "No domains specified"}
            </p>
          </div>
          <div className="flex gap-3">
            <button className="btn btn-neutral btn-sm" onClick={() => handleAction("accept")}>
              Accept
            </button>
            <button className="btn btn-outline btn-sm" onClick={() => handleAction("decline")}>
              Decline
            </button>
          </div>
        </div>
      </div>
      {showDropdown && (
        <div className="bg-base-100 p-4 rounded-lg shadow-md w-full mt-2 flex flex-wrap gap-4">
          {teamMembers.length > 0 ? (
            teamMembers.map((member, index) => (
              <div
                key={member._id || `member-${index}`}
                className="flex items-center w-full gap-3 mb-3 bg-success/15 p-2 rounded-lg border border-success"
              >
                <img
                  src={member.profilePic || "https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.webp"}
                  alt={member.name || "Member"}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div className="text-sm">
                  <p className="font-semibold">{member.name || "Unnamed Member"}</p>
                  <p className="text-xs text-gray-400">
                    {member.year ? `Year ${member.year}` : "year"}
                    {member.department ? ` | ${member.department}` : "dept"}
                    {member.gender ? ` | ${member.gender}` : "none"}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center w-full text-sm text-base-content opacity-70">
              No team members available
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default Notification;
