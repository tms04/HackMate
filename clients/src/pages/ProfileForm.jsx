import { useState } from "react";
import ExperienceFields from "../components/ProfileForm/ExperienceFields";
import ProfilePictureUpload from "../components/ProfileForm/ProfilePictureUpload";
import RoleInput from "../components/ProfileForm/RoleInput";
import SelectionButtons from "../components/ProfileForm/SelectionButtons";
import SkillInput from "../components/ProfileForm/SkillInput";

import { useNavigate } from "react-router-dom";

const ProfileForm = () => {
  const navigate = useNavigate();
  const [year, setYear] = useState(1);
  const [department, setDepartment] = useState("IT");
  const [gender, setGender] = useState("Male");
  const [skills, setSkills] = useState([]);
  const [roles, setRoles] = useState([]);
  const [experience, setExperience] = useState([{ name: "", rank: "" }]);
  const [profilePic, setProfilePic] = useState(null);

  const years = [1, 2, 3, 4];
  const departments = ["IT", "CS", "AI/ML", "Civil", "Mech", "EXTC"];
  const genders = ["Male", "Female", "Prefer Not to Say"];
  const skillOptions = ["MongoDB", "Express", "Node", "React", "Next", "Figma"];
  const roleOptions = [
    "Frontend",
    "Backend",
    "Full Stack",
    "App Dev",
    "Presentation",
  ];

  const handleSaveChanges = () => {
    const profileData = {
      year,
      department,
      gender,
      skills,
      roles,
      experience,
      profilePic,
    };
    localStorage.setItem("profileData", JSON.stringify(profileData)); // Save to localStorage

    console.log("Changes Saved:");
    console.log("Year:", year);
    console.log("Department:", department);
    console.log("Skills:", skills);
    console.log("Roles:", roles);
    console.log("Experience:", experience);
    console.log("Profile Picture:", profilePic);

    navigate("/profile");
  };

  return (
    <div className="min-h-screen w-full bg-base-300 flex justify-center items-center p-6">
      <div className="card bg-base-100 w-full max-w-3xl shadow-2xl p-6 rounded-xl">
        <h1 className="text-3xl font-bold text-center mb-6">
          Complete Your Profile
        </h1>

        <ProfilePictureUpload
          profilePic={profilePic}
          setProfilePic={setProfilePic}
        />

        <form className="space-y-4">
          <SelectionButtons
            label="Year"
            options={years}
            selectedValue={year}
            setValue={setYear}
          />

          <SelectionButtons
            label="Gender"
            options={genders}
            selectedValue={gender}
            setValue={setGender}
          />

          <SelectionButtons
            label="Department"
            options={departments}
            selectedValue={department}
            setValue={setDepartment}
          />

          <SkillInput
            skills={skills}
            setSkills={setSkills}
            skillOptions={skillOptions}
          />

          <RoleInput
            roles={roles}
            setRoles={setRoles}
            roleOptions={roleOptions}
          />

          <ExperienceFields
            experience={experience}
            setExperience={setExperience}
          />

          <button
            type="button"
            className="btn btn-outline w-full"
            onClick={handleSaveChanges}
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProfileForm;
