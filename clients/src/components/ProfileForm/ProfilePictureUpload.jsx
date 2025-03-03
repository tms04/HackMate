/* eslint-disable react/prop-types */
import { FaUser } from "react-icons/fa";

const ProfilePictureUpload = ({ profilePic, setProfilePic }) => {
  const handleProfilePicUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        compressImage(reader.result, (compressedBase64) => {
          setProfilePic(compressedBase64);
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const compressImage = (
    base64Str,
    callback,
    maxWidth = 150,
    maxHeight = 150,
    quality = 0.7
  ) => {
    const img = new Image();
    img.src = base64Str;
    img.onload = () => {
      const canvas = document.createElement("canvas");
      let width = img.width;
      let height = img.height;

      if (width > maxWidth || height > maxHeight) {
        if (width > height) {
          height *= maxWidth / width;
          width = maxWidth;
        } else {
          width *= maxHeight / height;
          height = maxHeight;
        }
      }

      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0, width, height);
      const compressedBase64 = canvas.toDataURL("image/jpeg", quality); // Reduce quality
      callback(compressedBase64);
    };
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
          accept="image/*"
          onChange={handleProfilePicUpload}
        />
      </label>
      <p className="text-sm text-gray-500 mt-2">Profile Picture</p>
    </div>
  );
};

export default ProfilePictureUpload;
