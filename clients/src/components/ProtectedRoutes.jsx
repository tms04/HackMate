import { useEffect, useRef, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import { FiMenu } from "react-icons/fi";
import DrawerSideBar from "./DrawerSideBar";

const ProtectedRoute = () => {
  const token = Cookies.get("token");
  const userId = Cookies.get("userId");
  const hasFetched = useRef(false);
  const [hasWelcomed, setHasWelcomed] = useState(false);

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

  return token ? (
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
