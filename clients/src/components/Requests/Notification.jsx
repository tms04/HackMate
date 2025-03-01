/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import {
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaUsers,
  FaChevronDown,
  FaChevronUp,
} from "react-icons/fa";
import SmallSquare from "./Square";
import { useState } from "react";

const Notification = ({
  teamMember,
  teamName,
  hackathonName,
  location,
  dates,
  roles,
}) => {
  const [showDropdown, setShowDropdown] = useState(false);

  const handleDropdownToggle = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <div className="relative flex flex-col w-full">
      <div className="flex items-center w-full p-4 rounded-lg shadow-md bg-base-100 text-base-content font-sans gap-4 gap-x-20">
        <SmallSquare />
        <div className="flex flex-col w-full">
          {/* Header */}
          <div className="flex justify-between items-center">
            <h1 className="font-bold text-lg">{hackathonName}</h1>
            {/* Toggle Button with Chevron */}
            <button
              className="bg-neutral p-2 rounded-full shadow-md transition-all"
              onClick={handleDropdownToggle}
            >
              {showDropdown ? (
                <FaChevronUp className="w-4 h-4 text-white" />
              ) : (
                <FaChevronDown className="w-4 h-4 text-white" />
              )}
            </button>
          </div>

          <div className="text-sm text-base-content mb-2 space-y-1">
            <p className="flex items-center gap-2">
              <FaMapMarkerAlt className="text-neutral" /> {location}
            </p>
            <p className="flex items-center gap-2">
              <FaCalendarAlt className="text-neutral" />
              {new Date(dates.from).toLocaleDateString("en-US", {
                day: "numeric",
                month: "short",
              })}{" "}
              -
              {new Date(dates.to).toLocaleDateString("en-US", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
            </p>
            <p className="flex items-center gap-2">
              <FaUsers className="text-neutral" /> {roles.join(", ")}
            </p>
          </div>

          <div className="flex gap-3">
            <button className="btn btn-neutral btn-sm">Accept</button>
            <button className="btn btn-outline btn-sm">Decline</button>
          </div>
        </div>
      </div>

      {/* Team Members Dropdown */}
      {showDropdown && (
        <div className="bg-base-100 p-4 rounded-lg shadow-md w-full mt-2 flex gap-4 ">
          <div className="flex items-center gap-3 mb-3 bg-success/15 p-2 rounded-lg border border-success">
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

          <div className="flex items-center gap-3 mb-3 bg-success/15 p-2 rounded-lg border border-success">
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

          <div className="flex items-center gap-3 mb-3 bg-success/15 p-2 rounded-lg border border-success">
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
     
        </div>
      )}
    </div>
  );
};

export default Notification;
