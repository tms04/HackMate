import PropTypes from "prop-types";

const Notification = ({ teamMember, teamName, hackathonName, location, dates, roles }) => {
  return (
    <div className="relative w-80 p-4 border border-gray-700 rounded-lg shadow-md bg-base-100 text-base-content font-sans">

      {/* Profile Section */}
      <div className="flex items-center gap-3 mb-3">
        <img
          src="https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.webp" // Replace with actual image URL
          alt={teamMember}
          className="w-10 h-10 rounded-full"
        />
        <div className="text-sm">
          <p className="font-semibold">Saurabhkumar Sharma</p>
          <p className="text-xs text-gray-400">TY | IT | Male</p>
        </div>
      </div>

      {/* Invitation Message */}
      <p className="text-sm font-semibold mb-1">
        {teamMember} <span className="font-normal">invited you to join</span> {teamName}.
      </p>
      <p className="text-xs text-gray-400 mb-3">Hackathon: {hackathonName}</p>

      {/* Hackathon Details */}
      <div className="text-sm text-gray-300 mb-3">
        <p><strong>Location:</strong> {location}</p>
        <p><strong>Dates:</strong> {dates}</p>
        <p><strong>Roles Offered:</strong> {roles.join(", ")}</p>
      </div>

      {/* Buttons */}
      <div className="flex gap-3">
        <button className="bg-neutral text-white text-xs px-4 py-2 rounded-md hover:bg-primary-focus transition">Accept</button>
        <button className="border border-gray-500 text-xs px-4 py-2 rounded-md hover:bg-gray-700 transition">Decline</button>
      </div>
    </div>
  );
};

Notification.propTypes = {
  teamMember: PropTypes.string.isRequired,
  teamName: PropTypes.string.isRequired,
  hackathonName: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
  dates: PropTypes.string.isRequired,
  roles: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default Notification;
