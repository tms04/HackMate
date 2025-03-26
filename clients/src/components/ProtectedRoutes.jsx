import { useState, useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import toast from "react-hot-toast";

const ProtectedRoute = () => {
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showToast, setShowToast] = useState(false); // ✅ State to control toast

  useEffect(() => {
    const verifyAuth = async () => {
      try {
        const token = Cookies.get("token");
        const userId = Cookies.get("userId");

        if (token && userId) {
          try {
            const response = await axios.get(
              `${import.meta.env.VITE_BACKEND_URL}/api/users/${userId}`,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );

            if (response.data) {
              setIsAuthenticated(true);
              setLoading(false);
              return;
            }
          } catch (error) {
            console.error("JWT validation failed:", error);
          }
        }

        setIsAuthenticated(false);
        setShowToast(true); // ✅ Set state to trigger toast later
      } catch (error) {
        console.error("Authentication verification error:", error);
        setIsAuthenticated(false);
        setShowToast(true); // ✅ Set state to trigger toast later
      } finally {
        setLoading(false);
      }
    };

    verifyAuth();
  }, []);

  // ✅ Show toast only after state updates
  useEffect(() => {
    if (showToast) {
      toast.error("Please log in to continue");
    }
  }, [showToast]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-base-200">
        <div className="loading loading-spinner loading-lg"></div>
      </div>
    );
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
