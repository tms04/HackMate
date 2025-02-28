/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { FaMapMarkerAlt, FaCalendarAlt, FaUsers } from "react-icons/fa"; // Importing icons
import SmallSquare from "./Square";

const Notification = ({ teamMember, teamName, hackathonName, location, dates, roles }) => {
  return (
    <div className="flex items-center w-full p-4 rounded-lg shadow-md bg-base-100 text-base-content font-sans gap-4 gap-x-20">
      <SmallSquare />
      <div className="flex flex-col w-full">
        <h1 className="font-bold text-lg">{hackathonName}</h1>

        <div className="text-sm text-base-content mb-2 space-y-1">
          <p className="flex items-center gap-2">
            <FaMapMarkerAlt className="text-neutral" /> {location}
          </p>
          <p className="flex items-center gap-2">
  <FaCalendarAlt className="text-neutral" />
  {new Date(dates.from).toLocaleDateString("en-US", { day: "numeric", month: "short" })} -  
  {new Date(dates.to).toLocaleDateString("en-US", { day: "numeric", month: "short", year: "numeric" })}
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
  );
};

export default Notification;
