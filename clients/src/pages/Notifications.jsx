import { useState, useEffect } from "react";
import Notification from "../components/Requests/Notification";
import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "react-hot-toast";

// Test data for debugging purposes
const testNotifications = [
  {
    _id: "6602f00d3a991833b8357610", // Valid MongoDB ObjectID format
    teamName: "Debug Team",
    hackathonName: "Debug Hackathon",
    mode: "Online",
    startDate: new Date(),
    endDate: new Date(Date.now() + 86400000), // tomorrow
    domains: ["React", "Node"],
    teamMembers: [],
    maxSize: 5
  }
];

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [useTestData, setUseTestData] = useState(false);

  // Fetch pending team requests
  useEffect(() => {
    fetchNotifications();
  }, []);

  // Handle when a team request is accepted or declined
  const handleRequestAction = (teamId, action, success) => {
    console.log(`Request action: teamId=${teamId}, action=${action}, success=${success}`);
    
    if (success) {
      // Remove the notification from the list
      setNotifications(prev => prev.filter(team => team._id !== teamId));
      
      // We don't need to show toast here since it's already shown in the Notification component
      console.log(`Team invitation ${action === 'accept' ? 'accepted' : 'declined'} successfully!`);
    } else {
      console.log(`Failed to ${action} team invitation`);
      // No need to show error toast here, it's already shown in the Notification component
      
      // If using test data, still remove the notification to simulate successful action
      if (useTestData) {
        setNotifications(prev => prev.filter(team => team._id !== teamId));
      }
    }
  };

  // Toggle test data for debugging
  const toggleTestData = () => {
    if (useTestData) {
      setNotifications(testNotifications);
    } else {
      setNotifications([]);
    }
    setUseTestData(!useTestData);
  };

  // Add a function to create a test invitation
  const createTestInvitation = async () => {
    try {
      const token = Cookies.get("token");
      if (!token) {
        toast.error("You must be logged in to create a test invitation");
        return;
      }

      const toastId = toast.loading("Creating test invitation...");
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/team/create-test-invitation`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.dismiss(toastId);
      if (response.data && response.data.team) {
        toast.success("Test invitation created successfully");
        // Refresh notifications instead of reloading page
        fetchNotifications();
      }
    } catch (error) {
      toast.dismiss();
      console.error("Error creating test invitation:", error);
      console.error("Response data:", error.response?.data);
      console.error("Response status:", error.response?.status);
      console.error("Error message:", error.message);
      toast.error("Failed to create test invitation: " + (error.response?.data?.message || error.message));
      
      // Show test data if we can't create a real invitation
      setUseTestData(true);
      setNotifications(testNotifications);
    }
  };

  // Add a refresh function
  const refreshNotifications = () => {
    toast.success("Refreshing notifications...");
    fetchNotifications();
  };

  // Move the fetchNotifications function outside useEffect so we can reuse it
  const fetchNotifications = async () => {
    try {
      setLoading(true);
      const token = Cookies.get("token");
      if (!token) {
        toast.error("You must be logged in to view notifications");
        setLoading(false);
        return;
      }

      console.log("Fetching notifications with token:", token);

      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/team/allRequests`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("API Response:", response.data);

      if (response.data.requests && response.data.requests.length > 0) {
        console.log("Found requests:", response.data.requests);
        
        // Fetch complete team details for each request
        const teamsWithDetails = await Promise.all(
          response.data.requests.map(async (request) => {
            try {
              console.log("Fetching details for team:", request._id);
              const detailsResponse = await axios.get(
                `${import.meta.env.VITE_BACKEND_URL}/api/team/${request._id}`,
                {
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                }
              );
              console.log("Team details:", detailsResponse.data);
              return detailsResponse.data;
            } catch (error) {
              console.error("Error fetching team details:", error);
              console.error("Error details:", {
                status: error.response?.status,
                message: error.response?.data?.message || error.message
              });
              return null;
            }
          })
        );

        // Filter out null values (failed requests)
        const validTeams = teamsWithDetails.filter(team => team !== null);
        console.log("Valid teams with details:", validTeams);
        
        if (validTeams.length > 0) {
          setNotifications(validTeams);
          setUseTestData(false);
        } else {
          console.log("No valid teams found, using test data for debugging");
          setNotifications([]);
          setUseTestData(true);
        }
      } else {
        console.log("No requests found, using test data for debugging");
        setNotifications([]);
        setUseTestData(true);
      }
    } catch (error) {
      console.error("Error fetching notifications:", error);
      console.error("Error details:", {
        status: error.response?.status,
        message: error.response?.data?.message || error.message
      });
      toast.error("Failed to load notifications: " + (error.response?.data?.message || error.message));
      setUseTestData(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4 p-6 bg-base-200 min-h-screen">
      <h2 className="text-xl font-bold text-base-content">Hackathon Invitations</h2>
      
      <div className="flex gap-2 mb-4">
        {/* Debug button */}
        <button 
          onClick={toggleTestData} 
          className="btn btn-xs btn-outline"
        >
          {useTestData ? "Hide Test Data" : "Show Test Data"}
        </button>
        
        {/* Create test invitation button */}
        <button 
          onClick={createTestInvitation}
          className="btn btn-xs btn-primary"
        >
          Create Test Invitation
        </button>

        {/* Refresh button */}
        <button 
          onClick={refreshNotifications}
          className="btn btn-xs btn-success"
          disabled={loading}
        >
          {loading ? <span className="loading loading-spinner loading-xs"></span> : "Refresh"}
        </button>
      </div>
      
      {loading ? (
        <div className="flex justify-center items-center h-40">
          <div className="loading loading-spinner loading-lg"></div>
        </div>
      ) : (useTestData ? testNotifications : notifications).length > 0 ? (
        <div className="flex flex-col gap-4 w-full max-w-2xl">
          {(useTestData ? testNotifications : notifications).map((team) => (
            <Notification 
              key={team._id} 
              team={team}
              onAction={handleRequestAction}
            />
          ))}
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
