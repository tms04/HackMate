/* eslint-disable no-unused-vars */
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaArrowLeft, FaSignOutAlt } from "react-icons/fa"; // Icons

const JoinedTeamPage = () => {
  const { id } = useParams(); // Get team ID from URL
  const navigate = useNavigate();

  // Sample team data (Replace with API integration later)
  const [team, setTeam] = useState({
    id,
    name: "Byte Crushers",
    hackathon: "CodeFest 2025",
    members: [
      { id: 1, name: "David", role: "Team Leader" },
      { id: 2, name: "Eva", role: "Frontend Developer" },
      { id: 3, name: "Frank", role: "Backend Developer" },
    ],
  });

  // Leave Team Function (Redirects after leaving)
  const leaveTeam = () => {
    alert(`You left the team "${team.name}"!`);
    navigate("/myteams"); // Redirect back to My Teams
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      {/* Back Button */}
      <button
        className="btn btn-outline mb-4 flex items-center gap-2"
        onClick={() => navigate("/myteams")}
      >
        <FaArrowLeft /> Back to My Teams
      </button>

      {/* Team Info */}
      <div className="p-5 bg-blue-100 dark:bg-blue-900 rounded-lg shadow-md border border-blue-500">
        <h1 className="text-2xl font-bold text-blue-600 dark:text-blue-400">{team.name}</h1>
        <p className="text-gray-600 dark:text-gray-300">
          <strong>Hackathon:</strong> {team.hackathon}
        </p>
      </div>

      {/* Team Members */}
      <div className="mt-6">
        <h2 className="text-lg font-semibold mb-3 text-gray-800 dark:text-gray-200">Team Members</h2>
        <div className="space-y-4">
          {team.members.map((member) => (
            <div
              key={member.id}
              className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md flex justify-between items-center"
            >
              <div>
                <p className="font-medium">{member.name}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">{member.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Leave Team Button */}
      <div className="mt-6 flex justify-center">
        <button
          className="btn btn-outline btn-error flex items-center gap-2"
          onClick={leaveTeam}
        >
          <FaSignOutAlt /> Leave Team
        </button>
      </div>
    </div>
  );
};

export default JoinedTeamPage;
