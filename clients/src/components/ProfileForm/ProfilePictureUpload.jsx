/* eslint-disable react/prop-types */
import { FaUser } from "react-icons/fa";

const ProfilePictureUpload = ({ profilePic, setProfilePic }) => {
  const handleProfilePicUpload = (event) => {
    setProfilePic(URL.createObjectURL(event.target.files[0]));
  };

  return (
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
        <input
          type="file"
          className="hidden"
          onChange={handleProfilePicUpload}
        />
      </label>
      <p className="text-sm text-gray-500 mt-2">Profile Picture</p>
    </div>
  );
};

export default ProfilePictureUpload;
