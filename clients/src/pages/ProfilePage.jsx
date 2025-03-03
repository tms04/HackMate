// import { useEffect, useState } from "react";

// const ProfilePage = () => {
//   const [profileData, setProfileData] = useState(null);

//   useEffect(() => {
//     const storedData = localStorage.getItem("profileData");
//     if (storedData) {
//       setProfileData(JSON.parse(storedData));
//     }
//   }, []);

//   return (
//     <div className="min-h-screen w-full bg-base-300 flex justify-center items-center p-6">
//       <div className="card bg-base-100 w-full max-w-3xl shadow-2xl p-6 rounded-xl">
//         <h1 className="text-3xl font-bold text-center mb-6">Profile</h1>

//         {/* Display Profile Picture */}
//         <div className="flex justify-center">
//           <img
//             src={profileData?.profilePic || "/default-profile-pic.jpg"}
//             alt="Profile Picture"
//             className="w-32 h-32 rounded-full"
//           />
//         </div>

//         <div className="space-y-4 mt-6">
//           {/* Display the saved data */}
//           <div className="flex justify-between">
//             <span className="font-bold">Year:</span>
//             <span>{profileData?.year}</span>
//           </div>

//           <div className="flex justify-between">
//             <span className="font-bold">Gender:</span>
//             <span>{profileData?.gender}</span>
//           </div>

//           <div className="flex justify-between">
//             <span className="font-bold">Department:</span>
//             <span>{profileData?.department}</span>
//           </div>

//           <div className="flex justify-between">
//             <span className="font-bold">Skills:</span>
//             <span>{profileData?.skills?.join(", ")}</span>
//           </div>

//           <div className="flex justify-between">
//             <span className="font-bold">Roles:</span>
//             <span>{profileData?.roles?.join(", ")}</span>
//           </div>

//           <div className="flex justify-between">
//             <span className="font-bold">Experience:</span>
//             <span>
//               {profileData?.experience
//                 .map((exp) => `${exp.name} (Rank: ${exp.rank})`)
//                 .join(", ")}
//             </span>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProfilePage;
import Cookies from "js-cookie";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "./ProfilePage.css";
import { FaUser } from "react-icons/fa";
// import ProfilePictureUpload from "../components/ProfileForm/ProfilePictureUpload"; // Import the new styles

const ProfilePage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [year, setYear] = useState(1);
  const [department, setDepartment] = useState("");
  const [gender, setGender] = useState("");
  const [skills, setSkills] = useState([]);
  const [roles, setRoles] = useState([]);
  const [experience, setExperience] = useState([{ name: "", rank: "" }]);
  const [profilePic, setProfilePic] = useState(null);
  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const userId = Cookies.get("userId");
        const token = Cookies.get("token");

        if (!userId || !token) {
          navigate("/login");
          return;
        }

        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/users/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        // If profile data exists, populate the form
        if (response.data) {
          const {
            name,
            year,
            department,
            gender,
            skills,
            roles,
            experience,
            profilePic,
          } = response.data;
          setName(name);
          if (year) setYear(year);
          if (department) setDepartment(department);
          if (gender) setGender(gender);
          if (skills && skills.length) setSkills(skills);
          if (roles && roles.length) setRoles(roles);
          if (experience && experience.length) setExperience(experience);
          if (profilePic) setProfilePic(profilePic);
        }
      } catch (error) {
        console.error("Error fetching profile data:", error);
        // Don't set error for first-time users as they won't have profile data yet
        if (error.response && error.response.status !== 404) {
          setError("Failed to load profile data. Please try again.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, [navigate]);

  if (loading) {
    return (
      <div className="min-h-screen w-full bg-base-300 flex justify-center items-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }
  return (
    <div className="min-h-screen w-full bg-base-300 flex justify-center items-center p-6">
      <div className="card bg-base-100 w-full max-w-3xl shadow-2xl p-6 rounded-xl profile-card">
        <h1 className="text-3xl font-bold text-center mb-6">User Profile</h1>

        {/* Profile Picture */}
        <div className="flex flex-col items-center mb-4">
          <label className="avatar cursor-pointer w-24 h-24 border rounded-full overflow-hidden flex items-center justify-center">
            {profilePic ? (
              <img
                src={profilePic}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            ) : (
              <FaUser size={48} />
            )}
          </label>
        </div>

        <div className="profile-info">
          <div className="profile-box">
            <span className="label">Name:</span>
            <span className="value">{name}</span>
          </div>
          <div className="profile-box">
            <span className="label">Year:</span>
            <span className="value">{year}</span>
          </div>

          <div className="profile-box">
            <span className="label">Gender:</span>
            <span className="value">{gender}</span>
          </div>

          <div className="profile-box">
            <span className="label">Department:</span>
            <span className="value">{department}</span>
          </div>

          <div className="profile-box">
            <span className="label">Skills:</span>
            <span className="value">{skills.join(", ") || "N/A"}</span>
          </div>

          <div className="profile-box">
            <span className="label">Roles:</span>
            <span className="value">{roles.join(", ") || "N/A"}</span>
          </div>

          <div className="profile-box">
            <span className="label">Experience:</span>
            <span className="value">{experience.join(", ") || "N/A"}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
