/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import axios from "axios";

const Square = ({ leaderId, teamName }) => {
  const [leader, setLeader] = useState(null);
  useEffect(() => {
    if (!leaderId) return;
  
    const fetchLeaderDetails = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/users/profile/${leaderId}`);
        setLeader(response.data);
      } catch (error) {
        console.error("Error fetching leader details:", error);
      }
    };
  
    fetchLeaderDetails();
  }, [leaderId]);
  

  if (!leader) {
    return <p className="text-sm text-gray-400">Team leader data not available</p>;
  }
  return (
    <div className="chat chat-start [transform:rotateX(180deg)] w-full">
      <div className="chat-bubble w-full max-w-3xl">
        <div className="[transform:rotateX(180deg)]">
          <div className="flex items-center gap-3 mb-3">
            <img
              src={leader.profilePic || "https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.webp"}
              alt={leader.name || "Leader"}
              className="w-10 h-10 rounded-full object-cover"
            />
            <div className="text-sm">
              <p className="font-semibold">{leader.name || "Unnamed Leader"}</p>
              <p className="text-xs text-gray-400">
                {leader.year ? `Year ${leader.year}` : "year"}
                {leader.department ? ` | ${leader.department}` : "dept"}
                {leader.gender ? ` | ${leader.gender}` : "gender"}
              </p>
              <p>{teamName || "Unnamed Team"}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Square;
