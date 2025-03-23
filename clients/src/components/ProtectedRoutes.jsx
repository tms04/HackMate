import { useState, useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import { useAuth } from "@clerk/clerk-react";

const ProtectedRoute = () => {
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { isLoaded, isSignedIn } = useAuth();

  useEffect(() => {
    const verifyAuth = async () => {
      try {
        // First check for regular JWT authentication
        const token = Cookies.get("token");
        const userId = Cookies.get("userId");
        
        if (token && userId) {
          try {
            // Verify the token with the backend
            const response = await axios.get(
              `${import.meta.env.VITE_BACKEND_URL}/api/users/${userId}`,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );
            
            if (response.data) {
              console.log("User authenticated via JWT");
              setIsAuthenticated(true);
              setLoading(false);
              return;
            }
          } catch (error) {
            console.error("JWT validation failed:", error);
            // Don't clear tokens here, we'll check Clerk auth next
          }
        }
        
        // Check for Clerk authentication if JWT fails
        const clerkUserId = Cookies.get("clerkUserId");
        if (isLoaded && isSignedIn) {
          console.log("User authenticated via Clerk");
          setIsAuthenticated(true);
          setLoading(false);
          return;
        }
        
        // If we get here, user is not authenticated
        console.log("User is not authenticated");
        setIsAuthenticated(false);
        setLoading(false);
      } catch (error) {
        console.error("Authentication verification error:", error);
        setIsAuthenticated(false);
        setLoading(false);
      }
    };

    verifyAuth();
  }, [isLoaded, isSignedIn]);

  if (loading) {
    // Show loading state while checking authentication
    return (
      <div className="flex justify-center items-center min-h-screen bg-base-200">
        <div className="loading loading-spinner loading-lg"></div>
      </div>
    );
  }

  // If authenticated, render the child routes
  if (isAuthenticated) {
    return <Outlet />;
  }

  // If not authenticated, redirect to login
  toast.error("Please log in to continue");
  return <Navigate to="/login" />;
};

export default ProtectedRoute;
