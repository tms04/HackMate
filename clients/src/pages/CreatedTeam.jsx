/* eslint-disable no-unused-vars */
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  FaUserMinus,
  FaUserPlus,
  FaTrash,
  FaArrowLeft,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaGlobe,
  FaUsers,
  FaBriefcase,
} from "react-icons/fa"; // Icons

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
      organizers: "Tech Society India",
      domains: ["AI", "Blockchain", "Cybersecurity"],
    },
    members: [
      {
        id: 1,
        name: "Alice Johnson",
        role: "Frontend Developer",
        year: "TY",
        dept: "IT",
        gender: "Female",
        state: "Accepted",
      },
      {
        id: 2,
        name: "Bob Smith",
        role: "Backend Developer",
        year: "TY",
        dept: "IT",
        gender: "Male",
        state: "Accepted",
      },
      {
        id: 3,
        name: "Charlie Brown",
        role: "UI/UX Designer",
        year: "TY",
        dept: "IT",
        gender: "Male",
        state: "Pending",
      },
    ],
  });

  const [selectedMember, setSelectedMember] = useState(null);

  // Open Remove Confirmation Modal
  const openRemoveModal = (member) => {
    setSelectedMember(member);
    document.getElementById("remove_member_modal").showModal();
  };

  // Confirm Remove Member
  const confirmRemoveMember = () => {
    setTeam((prevTeam) => ({
      ...prevTeam,
      members: prevTeam.members.filter((m) => m.id !== selectedMember.id),
    }));
    document.getElementById("remove_member_modal").close();
  };

  // Open Delete Team Confirmation Modal
  const openDeleteModal = () => {
    document.getElementById("delete_team_modal").showModal();
  };

  // Confirm Delete Team
  const confirmDeleteTeam = () => {
    navigate("/myteams");
    document.getElementById("delete_team_modal").close();
  };

  return (
    <div className="w-full bg-base-200">
      <div className="p-6 max-w-3xl mx-auto bg-base-200 dark:bg-neutral-900 text-base-content min-h-screen relative ">
        {/* Back Button */}
        {/* <button className="btn btn-outline mb-4 flex items-center gap-2 absolute top-4 -left-10" onClick={() => navigate("/myteams")}>
          <FaArrowLeft /> Back to My Teams
        </button> */}

        {/* Hackathon Details Card */}
        <div className="mt-8">
          <h2 className="text-lg font-semibold mb-2 text-neutral-content text-center border border-gray-700 bg-neutral dark:bg-base-100 rounded-xl p-2">
            {team.hackathon.name}
          </h2>

          <div className="p-5 bg-base-100 dark:bg-neutral-800 text-base-content rounded-lg shadow-md border border-gray-700">
            <p className="flex items-center gap-2">
              <FaGlobe /> <strong>Mode:</strong> {team.hackathon.mode}
            </p>

            {team.hackathon.mode === "Offline" && (
              <p className="flex items-center gap-2">
                <FaMapMarkerAlt /> <strong>Location:</strong>{" "}
                {team.hackathon.location}
              </p>
            )}

            <p className="flex items-center gap-2">
              <FaCalendarAlt /> <strong>Dates:</strong>
              {new Date(team.hackathon.dates.from).toLocaleDateString()} -{" "}
              {new Date(team.hackathon.dates.to).toLocaleDateString()}
            </p>

            <p className="flex items-center gap-2">
              <FaUsers /> <strong>Organizers:</strong>{" "}
              {team.hackathon.organizers}
            </p>

            <p className="flex items-center gap-2">
              <FaBriefcase /> <strong>Domains:</strong>{" "}
              {team.hackathon.domains.join(", ")}
            </p>
          </div>
        </div>

        {/* Team Name Heading */}
        <div className="mt-6">
          <h2 className="text-lg font-semibold mb-2 text-neutral-content text-center border border-gray-700 bg-neutral dark:bg-base-100 rounded-xl p-2">
            {team.name}
          </h2>

          {/* Team Members List */}
          <div className="bg-base-100 dark:bg-neutral-800 p-4 rounded-lg shadow-md w-full mt-2 space-y-4">
            {team.members.map((member) => (
              <div
                key={member.id}
                className={`flex items-center justify-between p-3 rounded-lg border 
      ${
        member.state === "Accepted"
          ? "bg-success/15 border-success"
          : "bg-warning/15 border-warning"
      }`}
              >
                <div className="flex items-center gap-3">
                  <img
                    src="https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.webp"
                    alt={member.name}
                    className="w-10 h-10 rounded-full"
                  />
                  <div className="text-sm">
                    <p className="font-semibold">{member.name}</p>
                    <p className="text-xs text-gray-400">
                      {member.year} | {member.dept} | {member.gender}
                    </p>
                  </div>
                </div>
                <button
                  className="btn btn-outline btn-sm bg-neutral text-neutral-content border-gray-700 hover:bg-gray-700 hover:text-white flex items-center gap-2"
                  onClick={() => openRemoveModal(member)}
                >
                  <FaUserMinus /> Remove
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Add Member & Delete Team Buttons (Side by Side) */}
        <div className="mt-6 flex justify-center gap-4">
          <button
            className="btn btn-outline flex items-center gap-2"
            onClick={() => navigate("/main", { state: { teamId: team.id } })}
          >
            <FaUserPlus /> Add Member
          </button>
          <button
            className="btn btn-neutral flex items-center gap-2"
            onClick={openDeleteModal}
          >
            <FaTrash /> Delete Team
          </button>
        </div>

        {/* Remove Member Confirmation Modal */}
        <dialog id="remove_member_modal" className="modal">
          <div className="modal-box bg-base-100 dark:bg-neutral-800">
            <h3 className="font-bold text-lg text-base-content">
              Confirm Removal
            </h3>
            <p className="py-4 text-base-content">
              Are you sure you want to remove <b>{selectedMember?.name}</b> from
              the team?
            </p>
            <div className="modal-action">
              <button
                className="btn btn-outline"
                onClick={() =>
                  document.getElementById("remove_member_modal").close()
                }
              >
                Cancel
              </button>
              <button className="btn btn-error" onClick={confirmRemoveMember}>
                Confirm
              </button>
            </div>
          </div>
        </dialog>

        {/* Delete Team Confirmation Modal */}
        <dialog id="delete_team_modal" className="modal">
          <div className="modal-box bg-base-100 dark:bg-neutral-800">
            <h3 className="font-bold text-lg text-base-content">
              Confirm Deletion
            </h3>
            <p className="py-4 text-base-content">
              Are you sure you want to delete this team? This action cannot be
              undone.
            </p>
            <div className="modal-action">
              <button
                className="btn btn-outline"
                onClick={() =>
                  document.getElementById("delete_team_modal").close()
                }
              >
                Cancel
              </button>
              <button className="btn btn-error" onClick={confirmDeleteTeam}>
                Confirm
              </button>
            </div>
          </div>
        </dialog>
      </div>
    </div>
  );
};

export default CreatedTeamPage;
