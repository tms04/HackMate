import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { FaEye, FaTrophy, FaUserFriends, FaSync } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

const MyTeams = () => {
  const navigate = useNavigate();

  const [selectedTeam, setSelectedTeam] = useState(null);
  const [actionType, setActionType] = useState(""); // "delete" or "leave"
  const [createdTeams, setCreatedTeams] = useState([]);
  const [joinedTeams, setJoinedTeams] = useState([]);
  const [loading, setLoading] = useState(false);

  // Open modal function
  const openModal = (team, action) => {
    setSelectedTeam(team);
    setActionType(action);
    document.getElementById("confirmation_modal").showModal();
  };

  // Confirm delete/leave action
  const handleConfirm = async () => {
    try {
      const userToken = Cookies.get("token");
      if (!userToken) {
        toast.error("User not authenticated");
        return;
      }

      let apiUrl = "";
      let requestData = {};

      if (actionType === "delete") {
        apiUrl = `${import.meta.env.VITE_BACKEND_URL}/api/team/deleteTeam`;
        requestData = { teamId: selectedTeam._id };
      } else if (actionType === "leave") {
        apiUrl = `${import.meta.env.VITE_BACKEND_URL}/api/team/leaveTeam`;
        requestData = { teamId: selectedTeam._id, userId: Cookies.get("userId") };
      }

      const response = await axios.post(apiUrl, requestData, {
        headers: { Authorization: `Bearer ${userToken}` },
      });

      if (response.status === 200) {
        toast.success(actionType === "delete" ? "Team deleted successfully" : "You left the team");
        // Update frontend state
        if (actionType === "delete") {
          setCreatedTeams((prevTeams) => prevTeams.filter(team => team._id !== selectedTeam._id));
        } else if (actionType === "leave") {
          setJoinedTeams((prevTeams) => prevTeams.filter(team => team._id !== selectedTeam._id));
        }
      }
    } catch (error) {
      console.error(`Error in ${actionType} team:`, error);
      toast.error(error.response?.data?.message || `Failed to ${actionType} team`);
    } finally {
      document.getElementById("confirmation_modal").close();
    }
  };
  
  // Combined function to fetch both types of teams
  const fetchAllTeams = useCallback(async () => {
    setLoading(true);
    try {
      const userId = Cookies.get("userId");
      const token = Cookies.get("token");
      if (!userId || !token) {
        toast.error("User not logged in");
        setLoading(false);
        return;
      }

      // Fetch both created and joined teams in parallel
      const [createdResponse, joinedResponse] = await Promise.all([
        axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/team/createdTeams/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
        axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/team/joinedTeams/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
      ]);

      console.log("Created teams:", createdResponse.data.teams);
      console.log("Joined teams:", joinedResponse.data.teams);
      
      setCreatedTeams(createdResponse.data.teams);
      setJoinedTeams(joinedResponse.data.teams);
    } catch (error) {
      console.error("Error fetching teams:", error);
      toast.error("Failed to fetch teams");
    } finally {
      setLoading(false);
    }
  }, []);

  // Manually refresh teams data
  const refreshTeams = () => {
    toast.success("Refreshing teams...");
    fetchAllTeams();
  };
  
  useEffect(() => {
    fetchAllTeams();
  }, [fetchAllTeams]);

  return (
    <div className="w-full bg-base-200">
      <div className="p-6 max-w-3xl mx-auto bg-base-200 dark:bg-neutral-900 text-base-content min-h-screen">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">My Teams</h1>
          <button 
            onClick={refreshTeams} 
            className="btn btn-sm btn-outline"
            disabled={loading}
          >
            {loading ? (
              <span className="loading loading-spinner loading-xs"></span>
            ) : (
              <><FaSync /> Refresh</>
            )}
          </button>
        </div>

        {/* Teams Created */}
        {createdTeams.length > 0 && (
          <div>
            <h2 className="text-lg font-semibold mb-2 text-center border border-black bg-neutral text-neutral-content mt-8 rounded-xl p-2">
              Teams Created
            </h2>

            <div className="space-y-4">
              {createdTeams.map((team) => (
                <div key={team._id} className="p-4 bg-base-100 dark:bg-neutral-800 rounded-lg shadow-md border border-gray-300 dark:border-gray-700 flex justify-between items-center">
                  <div>
                    <h2 className="text-lg font-semibold text-base-content">{team.teamName}</h2>
                    <p className="text-sm flex items-center gap-2 text-base-content"><FaTrophy /> {team.hackathonName}</p>
                    <p className="text-sm flex items-center gap-2 text-base-content"><FaUserFriends /> {team.teamMembers?.map(member => member.name).join(", ") || "No Members"}</p>
                  </div>
                  <div className="flex gap-3">
                    <button className="btn btn-outline btn-sm px-6" onClick={() => navigate(`/createdteam/${team._id}`)}><FaEye /></button>
                    <button className="btn btn-neutral btn-sm" onClick={() => openModal(team, "delete")}>Delete</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Teams Joined */}
        {joinedTeams.length > 0 && (
          <div className="mt-6">
            <h1 className="text-lg font-semibold mb-2 text-center border border-black bg-neutral text-neutral-content rounded-xl p-2">
              Teams Joined
            </h1>

            <div className="space-y-4">
              {joinedTeams.map((team) => (
                <div key={team._id} className="p-4 bg-base-100 dark:bg-neutral-800 rounded-lg shadow-md border border-gray-300 dark:border-gray-700 flex justify-between items-center">
                  <div>
                    <h2 className="text-lg font-semibold text-base-content">{team.teamName}</h2>
                    <p className="text-sm flex items-center gap-2 text-base-content"><FaTrophy /> {team.hackathonName}</p>
                    <p className="text-sm flex items-center gap-2 text-base-content"><FaUserFriends /> {team.teamMembers?.map(member => member.name).join(", ") || "No Members"}</p>
                  </div>
                  <div className="flex gap-3">
                    <button className="btn btn-outline btn-sm px-6" onClick={() => navigate(`/joinedteam`)}><FaEye /></button>
                    <button className="btn btn-neutral btn-sm" onClick={() => openModal(team, "leave")}>Leave</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* If No Teams Exist */}
        {createdTeams.length === 0 && joinedTeams.length === 0 && !loading && (
          <p className="text-gray-500 text-center">You are not part of any teams yet.</p>
        )}

        {/* Loading State */}
        {loading && createdTeams.length === 0 && joinedTeams.length === 0 && (
          <div className="flex justify-center items-center h-40">
            <div className="loading loading-spinner loading-lg"></div>
          </div>
        )}

        {/* DaisyUI Modal */}
        <dialog id="confirmation_modal" className="modal">
          <div className="modal-box bg-base-100 dark:bg-neutral-800">
            <h3 className="font-bold text-lg text-base-content">Confirm Action</h3>
            <p className="py-4 text-base-content">
              Are you sure you want to {actionType} the team <b>{selectedTeam?.name}</b>?
            </p>
            <div className="modal-action">
              <button className="btn btn-outline" onClick={() => document.getElementById("confirmation_modal").close()}>Cancel</button>
              <button className="btn btn-error" onClick={handleConfirm}>Confirm</button>
            </div>
          </div>
        </dialog>
      </div>
    </div>
  );
};

export default MyTeams;
