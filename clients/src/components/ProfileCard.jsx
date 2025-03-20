import React from "react";

const ProfileCard = ({
  name,
  year,
  gender,
  department,
  profileImage,
  roles,
  skills,
  achievements,
}) => {
  // console.log("Profile Image Data:", profileImage?.substring(0, 50)); // Logs first 50 chars for debugging

  // const isBase64 = profileImage && profileImage.startsWith("/9j"); // JPEG Base64 check

  return (
    <div className="max-w-sm rounded-2xl overflow-hidden shadow-lg bg-white p-6 text-center">
      {/* Profile Image */}
      <div className="flex justify-center">
        {profileImage ? (
          <img
            src={`${profileImage}`}
            alt="Profile"
            className="w-32 h-32 rounded-full object-cover border border-gray-300"
          />
        ) : (
          <img
            src="https://via.placeholder.com/128" // Placeholder image
            alt="Default"
            className="w-32 h-32 rounded-full object-cover border border-gray-300"
          />
        )}
      </div>

      {/* User Details */}
      <h2 className="text-xl font-semibold mt-3">{name || "User Name"}</h2>
      <p className="text-gray-600">
        {department || "Department not available"}
      </p>
      <p className="text-gray-500">
        {year ? `Year: ${year}` : "Year not available"}
      </p>
      <p className="text-gray-500">
        {gender ? `Gender: ${gender}` : "Gender not available"}
      </p>

      {/* Roles */}
      {roles?.length > 0 && (
        <div className="mt-2">
          <h3 className="font-semibold">Roles:</h3>
          <ul className="text-gray-500">
            {roles.map((role, index) => (
              <li key={index}>{role}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Skills */}
      {skills?.length > 0 && (
        <div className="mt-2">
          <h3 className="font-semibold">Skills:</h3>
          <ul className="text-gray-500 flex flex-wrap justify-center">
            {skills.map((skill, index) => (
              <li
                key={index}
                className="bg-gray-200 rounded-full px-3 py-1 text-sm m-1"
              >
                {skill}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Achievements */}
      {achievements?.length > 0 && (
        <div className="mt-2">
          <h3 className="font-semibold">Achievements:</h3>
          <ul className="text-gray-500">
            {achievements.map((achievement, index) => (
              <li key={index}>{achievement}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ProfileCard;
