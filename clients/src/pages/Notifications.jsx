import { useState, useEffect } from "react";
import Notification from "../components/Requests/Notification";
import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "react-hot-toast";

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const handleRequestAction = (teamId, action, success) => {
    if (success) {
      setNotifications((prev) => prev.filter((team) => team?._id !== teamId));
    }
  };

  const fetchNotifications = async () => {
    try {
      const token = Cookies.get("token");
      const userId = Cookies.get("userId");

      if (!token || !userId) {
        toast.error("You must be logged in to view notifications");
        return;
      }

      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/team/allRequests`,
        { userId },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response?.data?.requests?.length > 0) {
        const teamsWithDetails = await Promise.all(
          response.data.requests.map(async (request) => {
            try {
              const detailsResponse = await axios.get(
                `${import.meta.env.VITE_BACKEND_URL}/api/team/${request._id}`,
                { headers: { Authorization: `Bearer ${token}` } }
              );
              return detailsResponse.data;
            } catch (error) {
              console.error("Error fetching team details:", error);
              return null;
            }
          })
        );

        setNotifications(teamsWithDetails.filter((team) => team !== null));
      } else {
        setNotifications([]);
      }
    } catch (error) {
      toast.error("Failed to load notifications");
      console.error("Error fetching notifications:", error);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4 p-6 bg-base-200 min-h-screen">
      <h2 className="text-xl font-bold text-base-content">Hackathon Invitations</h2>
      {notifications.length > 0 ? (
        <div className="flex flex-col gap-4 w-full max-w-2xl">
          {notifications.map((team) =>
            team?._id ? (
              <Notification key={team._id} team={team} onAction={handleRequestAction} />
            ) : null
          )}
        </div>
      ) : (
        <div className="p-8 text-center">
          <p className="text-base-content opacity-70">No pending invitations at this time.</p>
        </div>
      )}
    </div>
  );
};

export default Notifications;
