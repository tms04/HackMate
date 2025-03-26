import { useState, useEffect } from "react";
import Notification from "../components/Requests/Notification";
import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft, FaSync } from "react-icons/fa";

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

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
      setLoading(true);
      const token = Cookies.get("token");
      const userId = Cookies.get("userId");

      if (!token || !userId) {
        toast.error("You must be logged in to view notifications");
        setLoading(false);
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
    } finally {
      setLoading(false);
    }
  };

  // Function to refresh notifications
  const refreshNotifications = () => {
    toast.success("Refreshing invitations...");
    fetchNotifications();
  };

  return (
    <div className="flex flex-col items-center gap-4 p-6 bg-base-200 min-h-screen">
      <div className="w-full max-w-2xl flex justify-center items-center mb-4">
        <h2 className="text-2xl font-bold text-base-content">Hackathon Invitations</h2>
      </div>
      
      {loading ? (
        <div className="flex justify-center items-center h-40">
          <div className="loading loading-spinner loading-lg"></div>
        </div>
      ) : notifications.length > 0 ? (
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
