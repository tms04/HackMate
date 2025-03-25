import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  FaSignOutAlt,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaGlobe,
  FaUsers,
  FaBriefcase,
} from "react-icons/fa";
import Cookies from "js-cookie";

const JoinedTeamPage = () => {
  const { teamId } = useParams();
  const navigate = useNavigate();
  const [team, setTeam] = useState(null);
  const [teamMembers, setTeamMembers] = useState([]);
  const [showLeaveModal, setShowLeaveModal] = useState(false);

  useEffect(() => {
    const token = Cookies.get("token");

    const fetchMembersDetails = async (members) => {
      try {
        const membersData = await Promise.all(
          members.map(async (userId) => {
            const res = await axios.get(
              `${import.meta.env.VITE_BACKEND_URL}/api/users/${userId}`,
              {
                headers: { Authorization: `Bearer ${token}` },
              }
            );
            return res.data;
          })
        );
        setTeamMembers(membersData);
      } catch (error) {
        console.error("Error fetching team members data:", error);
      }
    };

    const fetchTeam = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/team/${teamId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setTeam(response.data);
        if (response.data.teamMembers?.length > 0) {
          fetchMembersDetails(response.data.teamMembers);
        }
      } catch (error) {
        console.error("Error fetching team data:", error.response?.data || error.message);
      }
    };

    fetchTeam();
  }, [teamId]);

  const openLeaveModal = () => {
    setShowLeaveModal(true);
    document.getElementById("leave_team_modal").showModal();
  };

  const confirmLeaveTeam = async () => {
    try {
      const token = Cookies.get("token");
      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/team/leaveTeam`,
        { teamId },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      navigate("/myteams");
    } catch (error) {
      console.error("Error leaving team:", error.response?.data || error.message);
    } finally {
      document.getElementById("leave_team_modal").close();
    }
  };

  // if (!team) return <p>Loading...</p>;

  return (
    <div className="w-full bg-base-200">
      <div className="p-6 max-w-3xl mx-auto bg-base-200 dark:bg-neutral-900 text-base-content min-h-screen">
        <h2 className="text-lg font-semibold mb-2 text-white text-center border border-gray-700 bg-neutral dark:bg-base-100 rounded-xl p-2">
          {team?.teamName}
        </h2>

        <div className="p-5 bg-base-100 dark:bg-neutral-800 text-base-content rounded-lg shadow-md border border-gray-700">
          <p className="flex items-center gap-2">
            <FaGlobe /> <strong>Mode:</strong> {team?.mode}
          </p>
          {team?.mode === "Offline" && (
            <p className="flex items-center gap-2">
              <FaMapMarkerAlt /> <strong>Location:</strong> {team?.location}
            </p>
          )}
          <p className="flex items-center gap-2">
            <FaCalendarAlt /> <strong>Dates:</strong>
            {new Date(team?.startDate).toLocaleDateString()} - {new Date(team?.endDate).toLocaleDateString()}
          </p>
          <p className="flex items-center gap-2">
            <FaUsers /> <strong>Organizers:</strong> {team?.hackathonName}
          </p>
          <p className="flex items-center gap-2">
            <FaBriefcase /> <strong>Domains:</strong> {team?.domains.join(", ")}
          </p>
        </div>

        <h2 className="text-lg font-semibold mb-2 text-white text-center border border-gray-700 bg-neutral dark:bg-base-100 rounded-xl p-2">
          {team?.teamName}
        </h2>

        <div className="bg-base-100 dark:bg-neutral-800 p-4 rounded-lg shadow-md w-full mt-2 space-y-4">
          {teamMembers.map((member, index) => (
            <div key={member._id || index} className="flex items-center justify-between bg-success/15 p-3 rounded-lg border border-success">
              <div className="flex items-center gap-3">
                <img src={member.profilePic || "default-avatar.png"} alt={member.name} className="w-10 h-10 rounded-full" />
                <div className="text-sm">
                  <p className="font-semibold">{member.name}</p>
                  <p className="text-xs text-gray-400">{member.year} | {member.department} | {member.gender}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 flex justify-center">
          <button className="btn btn-neutral flex items-center gap-2" onClick={openLeaveModal}>
            <FaSignOutAlt /> Leave Team
          </button>
        </div>

        <dialog id="leave_team_modal" className="modal">
          <div className="modal-box bg-base-100 dark:bg-neutral-800">
            <h3 className="font-bold text-lg text-base-content">Confirm Leaving</h3>
            <p className="py-4 text-base-content">
              Are you sure you want to leave the team <b>{team?.name}</b>?
            </p>
            <div className="modal-action">
              <button className="btn btn-outline" onClick={() => document.getElementById("leave_team_modal").close()}>
                Cancel
              </button>
              <button className="btn btn-error" onClick={confirmLeaveTeam}>
                Confirm
              </button>
            </div>
          </div>
        </dialog>
      </div>
    </div>
  );
};

export default JoinedTeamPage;
