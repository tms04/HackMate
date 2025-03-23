import { useEffect, useRef, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import { FiMenu } from "react-icons/fi";
import DrawerSideBar from "./DrawerSideBar";
import { useAuth } from "@clerk/clerk-react";

const ProtectedRoute = () => {
  const token = Cookies.get("token");
  const userId = Cookies.get("userId");
  const clerkUserId = Cookies.get("clerkUserId");
  const { isLoaded, isSignedIn } = useAuth();
  const hasFetched = useRef(false);
  const [hasWelcomed, setHasWelcomed] = useState(false);
  const [isAuthenticating, setIsAuthenticating] = useState(true);
  
  // Check for Google authentication flag
  const googleAuthenticated = localStorage.getItem("googleAuthenticated") === "true";

  // Determine if user is authenticated either via traditional auth, Clerk, or other means
  const isAuthenticated = token || (isLoaded && isSignedIn) || clerkUserId || googleAuthenticated;

  useEffect(() => {
    // Set authenticating to false once Clerk is loaded
    if (isLoaded) {
      setIsAuthenticating(false);
      
      if (isSignedIn) {
        console.log("User is authenticated via Clerk");
      } else if (token) {
        console.log("User is authenticated via JWT token");
      } else if (clerkUserId) {
        console.log("User is authenticated via Clerk User ID cookie");
      } else if (googleAuthenticated) {
        console.log("User is authenticated via Google OAuth flag");
      }
    }
  }, [isLoaded, isSignedIn, token, clerkUserId, googleAuthenticated]);

  useEffect(() => {
    const fetchUser = async () => {
      if (userId && !hasFetched.current) {
        try {
          const response = await fetch(
            `${import.meta.env.VITE_BACKEND_URL}/api/users/profile/${userId}`
          );
          const data = await response.json();
          if (response.ok) {
            if (!sessionStorage.getItem("welcomed")) {
              toast.success(`Welcome, ${data.username}!`);
              sessionStorage.setItem("welcomed", "true");
              setHasWelcomed(true);
            }
          }
        } catch (error) {
          console.error("Error fetching user:", error);
        }
        hasFetched.current = true;
      }
    };

    fetchUser();
  }, [userId]);

  // Show loading state while authenticating
  if (isAuthenticating) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-base-200">
        <div className="loading loading-spinner loading-lg"></div>
      </div>
    );
  }

  return isAuthenticated ? (
    <div className="drawer">
      <input id="my-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content bg-base-200 min-h-screen">
        <label
          htmlFor="my-drawer"
          className="btn btn-circle btn-neutral fixed top-4 left-4 z-50 transition-opacity duration-300 drawer-button"
        >
          <FiMenu size={24} />
        </label>
        <Outlet />
      </div>
      <DrawerSideBar />
      <style>
        {`
          #my-drawer:checked ~ .drawer-content .drawer-button {
            opacity: 0;
            pointer-events: none;
          }
        `}
      </style>
    </div>
  ) : (
    <Navigate to="/login" replace />
  );
};

export default ProtectedRoute;
