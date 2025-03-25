import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
<<<<<<< HEAD
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

=======
import axios from "axios";
import {
  FaUserMinus, FaUserPlus, FaTrash, FaMapMarkerAlt,
  FaCalendarAlt, FaGlobe, FaUsers, FaBriefcase
} from "react-icons/fa";
import Cookies from "js-cookie";
>>>>>>> 7b4fcee6eb8737021fa74a88ebcc3100d1cf316d
const CreatedTeamPage = () => {
  const { teamId } = useParams();
  const navigate = useNavigate();
<<<<<<< HEAD

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

=======
  const [team, setTeam] = useState(null);
  const [teamMembers, setTeamMembers] = useState([]);
>>>>>>> 7b4fcee6eb8737021fa74a88ebcc3100d1cf316d
  const [selectedMember, setSelectedMember] = useState(null);

  useEffect(() => {
    const token = Cookies.get("token");

    const fetchMembersDetails = async (members) => {
      try {
        const membersData = await Promise.all(
          members.slice(1).map(async (userId) => {
            const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/users/${userId}`, {
              headers: { Authorization: `Bearer ${token}` },
            });
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
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/team/${teamId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
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

  const openRemoveModal = (member) => {
    setSelectedMember(member);
    const modal = document.getElementById("remove_member_modal");
    if (modal) {
      modal.showModal();
    } else {
      console.error("Modal element not found.");
    }
  };


  const confirmRemoveMember = async () => {
    if (!selectedMember || !team) return;

    try {
      const token = Cookies.get("token");
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/team/removeTeamMember`,
        {
          teamId: team._id,
          requesterId: selectedMember._id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        setTeam((prevTeam) => ({
          ...prevTeam,
          teamMembers: prevTeam.teamMembers.filter((m) => m._id !== selectedMember._id),
        }));

        setTeamMembers((prevMembers) =>
          prevMembers.filter((m) => m._id !== selectedMember._id)
        );
      }
    } catch (error) {
      console.error("Error removing team member:", error.response?.data || error.message);
    } finally {
      document.getElementById("remove_member_modal").close();
    }
  };

  const openDeleteModal = () => {
    document.getElementById("delete_team_modal").showModal();
  };

  const confirmDeleteTeam = () => {
    navigate("/myteams");
    document.getElementById("delete_team_modal").close();
  };
  return (
    <div className="w-full bg-base-200">
      <div className="p-6 max-w-3xl mx-auto bg-base-200 dark:bg-neutral-900 text-base-content min-h-screen relative">
        {/* Hackathon Details Card */}
        <div className="mt-8">
          <h2 className="text-lg font-semibold mb-2 text-neutral-content text-center border border-gray-700 bg-neutral dark:bg-base-100 rounded-xl p-2">
            {team?.teamName}
          </h2>

          <div className="p-5 bg-base-100 dark:bg-neutral-800 text-base-content rounded-lg shadow-md border border-gray-700">
            <p className="flex items-center gap-2">
              <FaGlobe /> <strong>Mode:</strong> {team?.mode || "N/A"}
            </p>

            {team?.mode === "Offline" && (
              <p className="flex items-center gap-2">
<<<<<<< HEAD
                <FaMapMarkerAlt /> <strong>Location:</strong>{" "}
                {team.hackathon.location}
=======
                <FaMapMarkerAlt /> <strong>Location:</strong> {team?.location}
>>>>>>> 7b4fcee6eb8737021fa74a88ebcc3100d1cf316d
              </p>
            )}

            <p className="flex items-center gap-2">
              <FaCalendarAlt /> <strong>Dates:</strong>
<<<<<<< HEAD
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
=======
              {team?.startDate ? new Date(team.startDate).toLocaleDateString() : "N/A"} -
              {team?.endDate ? new Date(team.endDate).toLocaleDateString() : "N/A"}
            </p>

            <p className="flex items-center gap-2">
              <FaUsers /> <strong>Organizers:</strong> {team?.hackathonName || "N/A"}
            </p>

            <p className="flex items-center gap-2">
              <FaBriefcase /> <strong>Domains:</strong> {team?.domains?.join(", ") || "N/A"}
>>>>>>> 7b4fcee6eb8737021fa74a88ebcc3100d1cf316d
            </p>
          </div>
        </div>

        {/* Team Members List */}
        <div className="mt-6">
          <h2 className="text-lg font-semibold mb-2 text-neutral-content text-center border border-gray-700 bg-neutral dark:bg-base-100 rounded-xl p-2">
            {team?.teamName}
          </h2>
          <div className="bg-base-100 dark:bg-neutral-800 p-4 rounded-lg shadow-md w-full mt-2 space-y-4">
<<<<<<< HEAD
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
=======
            {teamMembers.map((member, index) => (
              <div
                key={member._id || index}
                className="flex items-center justify-between p-3 rounded-lg border bg-success/15 border-success"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={member.profilePic || "https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.webp"}
>>>>>>> 7b4fcee6eb8737021fa74a88ebcc3100d1cf316d
                    alt={member.name}
                    className="w-10 h-10 rounded-full"
                  />
                  <div className="text-sm">
                    <p className="font-semibold">{member.name}</p>
<<<<<<< HEAD
                    <p className="text-xs text-gray-400">
                      {member.year} | {member.dept} | {member.gender}
                    </p>
=======
                    <p className="text-xs text-gray-400">{member.year} | {member.department} | {member.gender}</p>
>>>>>>> 7b4fcee6eb8737021fa74a88ebcc3100d1cf316d
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
        {/* Buttons */}
        <div className="mt-6 flex justify-center gap-4">
<<<<<<< HEAD
          <button
            className="btn btn-outline flex items-center gap-2"
            onClick={() => navigate("/main", { state: { teamId: team.id } })}
          >
=======
          <button className="btn btn-outline flex items-center gap-2" onClick={() => navigate("/main")}>
>>>>>>> 7b4fcee6eb8737021fa74a88ebcc3100d1cf316d
            <FaUserPlus /> Add Member
          </button>
          <button
            className="btn btn-neutral flex items-center gap-2"
            onClick={openDeleteModal}
          >
            <FaTrash /> Delete Team
          </button>
        </div>
        <dialog id="remove_member_modal" className="modal">
<<<<<<< HEAD
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
=======
          <div className="modal-box">
            <h3 className="font-bold text-lg">Confirm Removal</h3>
            <p className="py-4">Are you sure you want to remove {selectedMember?.name}?</p>

            <div className="modal-action">
              <button className="btn btn-error" onClick={confirmRemoveMember}>
                Yes, Remove
>>>>>>> 7b4fcee6eb8737021fa74a88ebcc3100d1cf316d
              </button>
              <button className="btn" onClick={() => document.getElementById("remove_member_modal").close()}>
                Cancel
              </button>
            </div>
          </div>
        </dialog>
      </div>
    </div>
  );
};

export default CreatedTeamPage;
