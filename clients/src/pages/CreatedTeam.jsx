import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaUserMinus, FaUserPlus, FaTrash, FaArrowLeft, FaMapMarkerAlt, FaCalendarAlt, FaGlobe } from "react-icons/fa"; // Icons

const CreatedTeamPage = () => {
  const { id } = useParams(); // Get team ID from URL
  const navigate = useNavigate();

  // Sample team data (Replace with API integration later)
  const [team, setTeam] = useState({
    id,
    name: "Code Warriors",
    hackathon: {
      name: "Hack4Impact",
      mode: "Offline", // Change to "Online" for online hackathons
      location: "Mumbai, India", // Show only if mode is "Offline"
      dates: { from: "2025-04-10", to: "2025-04-12" },
    },
    members: [
      { id: 1, name: "Alice Johnson", role: "Frontend Developer", year: "TY", dept: "IT", gender: "Female" },
      { id: 2, name: "Bob Smith", role: "Backend Developer", year: "TY", dept: "IT", gender: "Male" },
      { id: 3, name: "Charlie Brown", role: "UI/UX Designer", year: "TY", dept: "IT", gender: "Male" },
    ],
  });

  // Remove Member Function
  const removeMember = (memberId) => {
    setTeam((prevTeam) => ({
      ...prevTeam,
      members: prevTeam.members.filter((member) => member.id !== memberId),
    }));
  };

  return (
    <div className="p-6 max-w-3xl mx-auto bg-base-200 dark:bg-neutral-900 text-base-content min-h-screen">
      {/* Back Button */}
      <button className="btn btn-outline mb-4 flex items-center gap-2" onClick={() => navigate("/myteams")}>
        <FaArrowLeft /> Back to My Teams
      </button>

      {/* Hackathon Details Card */}
      <div className="p-5 bg-black text-white dark:bg-neutral-800 rounded-lg shadow-md border border-gray-700">
        <h2 className="text-xl font-bold mb-3">Hackathon Details</h2>

        <p className="flex items-center gap-2 text-gray-300">
          <FaGlobe /> <strong>Hackathon:</strong> {team.hackathon.name}
        </p>

        <p className="flex items-center gap-2 text-gray-300">
          <FaGlobe /> <strong>Mode:</strong> {team.hackathon.mode}
        </p>

        {team.hackathon.mode === "Offline" && (
          <p className="flex items-center gap-2 text-gray-300">
            <FaMapMarkerAlt /> <strong>Location:</strong> {team.hackathon.location}
          </p>
        )}

        <p className="flex items-center gap-2 text-gray-300">
          <FaCalendarAlt /> <strong>Dates:</strong> 
          {new Date(team.hackathon.dates.from).toLocaleDateString()} - {new Date(team.hackathon.dates.to).toLocaleDateString()}
        </p>
      </div>

      {/* Team Name Heading */}
      <div className="mt-6">
        <h2 className="text-lg font-semibold mb-3 text-gray-800 dark:text-gray-200">{team.name}</h2>
        
        {/* Team Members Grid */}
        <div className="bg-base-100 p-4 rounded-lg shadow-md w-full mt-2 flex gap-4 flex-wrap">
          {team.members.map((member) => (
            <div key={member.id} className="flex items-center gap-3 bg-success/15 p-2 rounded-lg border border-success">
              <img
                src="https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.webp" // Replace with actual image URL
                alt={member.name}
                className="w-10 h-10 rounded-full"
              />
              <div className="text-sm">
                <p className="font-semibold">{member.name}</p>
                <p className="text-xs text-gray-400">{member.year} | {member.dept} | {member.gender}</p>
              </div>
              <button
                className="btn btn-outline btn-sm text-red-500 border-red-500 hover:bg-red-500 hover:text-white flex items-center gap-2"
                onClick={() => removeMember(member.id)}
              >
                <FaUserMinus /> Remove
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Add Member Button */}
      <div className="mt-6 flex justify-center">
        <button className="btn btn-primary flex items-center gap-2" onClick={() => alert("Feature to add members coming soon!")}>
          <FaUserPlus /> Add Member
        </button>
      </div>

      {/* Delete Team Button */}
      <div className="mt-6 flex justify-center">
        <button className="btn btn-outline btn-error flex items-center gap-2">
          <FaTrash /> Delete Team
        </button>
      </div>
    </div>
  );
};

export default CreatedTeamPage;
