/* eslint-disable no-unused-vars */
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { 
  FaArrowLeft, FaMapMarkerAlt, FaCalendarAlt, FaGlobe, 
  FaUsers, FaBriefcase, FaSignOutAlt 
} from "react-icons/fa"; // Icons

const JoinedTeamPage = () => {
  const { id } = useParams(); // Get team ID from URL
  const navigate = useNavigate();

  // Sample team data (Replace with API integration later)
  const [team, setTeam] = useState({
    id,
    name: "Byte Crushers",
    hackathon: {
      name: "CodeFest 2025",
      mode: "Online", // Change to "Offline" for in-person hackathons
      location: "Not Applicable", // Show only if mode is "Offline"
      dates: { from: "2025-06-15", to: "2025-06-17" },
      organizers: "Global Coding League",
      domains: ["Web Development", "AI", "Cloud Computing"],
    },
    members: [
      { id: 1, name: "David Miller", role: "Frontend Developer", year: "TY", dept: "IT", gender: "Male" },
      { id: 2, name: "Eva Thompson", role: "Backend Developer", year: "TY", dept: "IT", gender: "Female" },
      { id: 3, name: "Frank White", role: "UI/UX Designer", year: "TY", dept: "IT", gender: "Male" },
    ],
  });

  const [showLeaveModal, setShowLeaveModal] = useState(false);

  // Open Leave Confirmation Modal
  const openLeaveModal = () => {
    setShowLeaveModal(true);
    document.getElementById("leave_team_modal").showModal();
  };

  // Confirm Leave Team
  const confirmLeaveTeam = () => {
    navigate("/myteams"); // Redirect to My Teams page
    document.getElementById("leave_team_modal").close();
  };

  return (
    <div className="w-full bg-base-200">
      <div className="p-6 max-w-3xl mx-auto bg-base-200 dark:bg-neutral-900 text-base-content min-h-screen">
        {/* Back Button */}
        {/* <button className="btn btn-outline mb-4 flex items-center gap-2" onClick={() => navigate("/myteams")}>
          <FaArrowLeft /> Back to My Teams
        </button> */}

        {/* Hackathon Details Card */}
        <div className="mt-8">
          <h2 className="text-lg font-semibold mb-2 text-white text-center border border-gray-700 bg-neutral dark:bg-base-100 rounded-xl p-2">
            {team.hackathon.name}
          </h2>

          <div className="p-5 bg-base-100 dark:bg-neutral-800 text-base-content rounded-lg shadow-md border border-gray-700">
            <p className="flex items-center gap-2">
              <FaGlobe /> <strong>Mode:</strong> {team.hackathon.mode}
            </p>

            {team.hackathon.mode === "Offline" && (
              <p className="flex items-center gap-2">
                <FaMapMarkerAlt /> <strong>Location:</strong> {team.hackathon.location}
              </p>
            )}

            <p className="flex items-center gap-2">
              <FaCalendarAlt /> <strong>Dates:</strong> 
              {new Date(team.hackathon.dates.from).toLocaleDateString()} - {new Date(team.hackathon.dates.to).toLocaleDateString()}
            </p>

            <p className="flex items-center gap-2">
              <FaUsers /> <strong>Organizers:</strong> {team.hackathon.organizers}
            </p>

            <p className="flex items-center gap-2">
              <FaBriefcase /> <strong>Domains:</strong> {team.hackathon.domains.join(", ")}
            </p>
          </div>
        </div>

        {/* Team Name Heading */}
        <div className="mt-6">
          <h2 className="text-lg font-semibold mb-2 text-white text-center border border-gray-700 bg-neutral dark:bg-base-100 rounded-xl p-2">
            {team.name}
          </h2>

          {/* Team Members List */}
          <div className="bg-base-100 dark:bg-neutral-800 p-4 rounded-lg shadow-md w-full mt-2 space-y-4">
            {team.members.map((member) => (
              <div key={member.id} className="flex items-center justify-between bg-success/15 p-3 rounded-lg border border-success">
                <div className="flex items-center gap-3">
                  <img
                    src="https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.webp"
                    alt={member.name}
                    className="w-10 h-10 rounded-full"
                  />
                  <div className="text-sm">
                    <p className="font-semibold">{member.name}</p>
                    <p className="text-xs text-gray-400">{member.year} | {member.dept} | {member.gender}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Leave Team Button */}
        <div className="mt-6 flex justify-center">
          <button className="btn btn-neutral flex items-center gap-2" onClick={openLeaveModal}>
            <FaSignOutAlt /> Leave Team
          </button>
        </div>

        {/* Leave Team Confirmation Modal */}
        <dialog id="leave_team_modal" className="modal">
          <div className="modal-box bg-base-100 dark:bg-neutral-800">
            <h3 className="font-bold text-lg text-base-content">Confirm Leaving</h3>
            <p className="py-4 text-base-content">
              Are you sure you want to leave the team <b>{team.name}</b>?
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
