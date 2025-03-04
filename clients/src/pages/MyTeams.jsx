import { useState } from "react";
import { FaEye, FaTrophy, FaUserFriends } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const MyTeams = () => {
  const navigate = useNavigate();

  const [teams, setTeams] = useState([
    { id: 1, name: "Code Warriors", hackathon: "Hack4Impact", members: ["Alice", "Bob", "Charlie"], role: "Team Leader" },
    { id: 2, name: "Byte Crushers", hackathon: "CodeFest 2025", members: ["David", "Eva", "Frank"], role: "Member" },
    { id: 3, name: "AI Pioneers", hackathon: "AI Challenge 2025", members: ["Sophia", "Ethan", "Mia"], role: "Team Leader" },
    { id: 4, name: "Bug Busters", hackathon: "CyberSec Hack 2025", members: ["Ava", "Liam", "Noah"], role: "Member" },
  ]);

  const [selectedTeam, setSelectedTeam] = useState(null);
  const [actionType, setActionType] = useState(""); // "delete" or "leave"

  // Open modal function
  const openModal = (team, action) => {
    setSelectedTeam(team);
    setActionType(action);
    document.getElementById("confirmation_modal").showModal();
  };

  // Confirm delete/leave action
  const handleConfirm = () => {
    setTeams(teams.filter((team) => team.id !== selectedTeam.id));
    document.getElementById("confirmation_modal").close();
  };

  // Filter teams
  const leaderTeams = teams.filter((team) => team.role === "Team Leader");
  const joinedTeams = teams.filter((team) => team.role !== "Team Leader");

  return (
    <div className="w-full bg-base-200">
      <div className="p-6 max-w-3xl mx-auto bg-base-200 dark:bg-neutral-900 text-base-content min-h-screen">
        
        {/* Teams Created */}
        {leaderTeams.length > 0 && (
          <div>
<h2 className="text-lg font-semibold mb-2 text-center border border-black bg-neutral text-neutral-content mt-8 rounded-xl p-2">
  Teams Created
</h2>

            <div className="space-y-4">
              {leaderTeams.map((team) => (
                <div key={team.id} className="p-4 bg-base-100 dark:bg-neutral-800 rounded-lg shadow-md border border-gray-300 dark:border-gray-700 flex justify-between items-center">
                  <div>
                    <h2 className="text-lg font-semibold text-base-content">{team.name}</h2>
                    <p className="text-sm flex items-center gap-2 text-base-content"><FaTrophy /> {team.hackathon}</p>
                    <p className="text-sm flex items-center gap-2 text-base-content"><FaUserFriends /> {team.members.join(", ")}</p>
                  </div>
                  <div className="flex gap-3">
                    <button className="btn btn-outline btn-sm px-6" onClick={() => navigate(`/createdteam`)}><FaEye /></button>
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
                <div key={team.id} className="p-4 bg-base-100 dark:bg-neutral-800 rounded-lg shadow-md border border-gray-300 dark:border-gray-700 flex justify-between items-center">
                  <div>
                    <h2 className="text-lg font-semibold text-base-content">{team.name}</h2>
                    <p className="text-sm flex items-center gap-2 text-base-content"><FaTrophy /> {team.hackathon}</p>
                    <p className="text-sm flex items-center gap-2 text-base-content"><FaUserFriends /> {team.members.join(", ")}</p>
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
        {teams.length === 0 && (
          <p className="text-gray-500 text-center">You are not part of any teams yet.</p>
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
