import { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import Cookies from "js-cookie";
import toast from "react-hot-toast";

const ProtectedRoute = () => {
  const token = Cookies.get("token"); // Check if authentication token exists
  const userId = Cookies.get("userId"); // Get user ID from cookies
  //   const [username, setUsername] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      if (userId) {
        try {
          const response = await fetch(
            `${import.meta.env.VITE_BACKEND_URL}/api/users/profile/${userId}`
          );
          const data = await response.json();
          if (response.ok) {
            // setUsername(data.username);
            toast.success(`Welcome, ${data.username}!`);
          }
        } catch (error) {
          console.error("Error fetching user:", error);
        }
      }
    };

    fetchUser();
  }, [userId]);

  return token ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
