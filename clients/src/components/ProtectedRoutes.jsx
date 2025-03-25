import { useState, useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import toast from "react-hot-toast";

const ProtectedRoute = () => {
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

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
        setLoading(false);
      } catch (error) {
        console.error("Authentication verification error:", error);
        setIsAuthenticated(false);
        setLoading(false);
      }
    };

    verifyAuth();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-base-200">
        <div className="loading loading-spinner loading-lg"></div>
      </div>
    );
  }

  if (isAuthenticated) {
    return <Outlet />;
  }

  toast.error("Please log in to continue");
  return <Navigate to="/login" />;
};

export default ProtectedRoute;
