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




import { useEffect, useState } from "react";
import "./ProfilePage.css"; // Import the new styles

const ProfilePage = () => {
  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
    const storedData = localStorage.getItem("profileData");
    if (storedData) {
      setProfileData(JSON.parse(storedData));
    }
  }, []);

  return (
    <div className="min-h-screen w-full bg-base-300 flex justify-center items-center p-6">
      <div className="card bg-base-100 w-full max-w-3xl shadow-2xl p-6 rounded-xl profile-card">
        <h1 className="text-3xl font-bold text-center mb-6">Profile</h1>

        {/* Profile Picture */}
        <div className="flex justify-center mb-6">
          <img
            src={profileData?.profilePic || "/default-profile-pic.jpg"}
            alt="Profile Picture"
            className="w-32 h-32 rounded-full border-4 border-gray-300 shadow-md"
          />
        </div>

        {/* Profile Data */}
        <div className="profile-info">
          <div className="profile-box">
            <span className="label">Year:</span>
            <span className="value">{profileData?.year || "N/A"}</span>
          </div>

          <div className="profile-box">
            <span className="label">Gender:</span>
            <span className="value">{profileData?.gender || "N/A"}</span>
          </div>

          <div className="profile-box">
            <span className="label">Department:</span>
            <span className="value">{profileData?.department || "N/A"}</span>
          </div>

          <div className="profile-box">
            <span className="label">Skills:</span>
            <span className="value">{profileData?.skills?.join(", ") || "N/A"}</span>
          </div>

          <div className="profile-box">
            <span className="label">Roles:</span>
            <span className="value">{profileData?.roles?.join(", ") || "N/A"}</span>
          </div>

          <div className="profile-box">
            <span className="label">Experience:</span>
            <span className="value">
              {profileData?.experience
                ? profileData.experience.map((exp) => `${exp.name} (Rank: ${exp.rank})`).join(", ")
                : "N/A"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
