/* eslint-disable no-unused-vars */
import { useState } from "react";
import {
  FaPlus,
  FaTrash,
  FaTimes,
  FaUpload,
  FaUser,
  FaMinus,
} from "react-icons/fa";

const ProfileForm = () => {
  const [year, setYear] = useState(1);
  const [department, setDepartment] = useState("IT");
  const [gender, setGender] = useState("Male");
  const [skills, setSkills] = useState([]);
  const [customSkill, setCustomSkill] = useState("");
  const [roles, setRoles] = useState([]);
  const [customRole, setCustomRole] = useState("");
  const [experience, setExperience] = useState([{ name: "", rank: "" }]);
  const [profilePic, setProfilePic] = useState(null);

  const years = [1, 2, 3, 4];
  const departments = ["IT", "CS", "AI/ML", "Civil", "Mech", "EXTC"];
  const genders = ["Male", "Female", "Prefer Not to Say"];
  const skillOptions = ["MongoDB", "Express", "Node", "React", "Next", "Figma"];
  const roleOptions = ["Frontend", "Backend", "Full Stack", "App Dev"];

  const handleSelection = (item, setFunction, state) => {
    setFunction(
      state.includes(item) ? state.filter((i) => i !== item) : [...state, item]
    );
  };

  const handleRemoveSkill = (skill) => {
    setSkills(skills.filter((s) => s !== skill));
  };

  const handleRemoveRole = (role) => {
    setRoles(roles.filter((r) => r !== role));
  };

  const handleAddExperience = () => {
    setExperience([...experience, { name: "", rank: "" }]);
  };

  const handleRemoveExperience = (index) => {
    setExperience(experience.filter((_, i) => i !== index));
  };

  const handleProfilePicUpload = (event) => {
    setProfilePic(URL.createObjectURL(event.target.files[0]));
  };

  const handleSaveChanges = () => {
    console.log("Changes Saved:");
    console.log("Year:", year);
    console.log("Department:", department);
    console.log("Skills:", skills);
    console.log("Roles:", roles);
    console.log("Experience:", experience);
    console.log("Profile Picture:", profilePic);
    // Implement logic to save changes to database or backend here
  };

  return (
    <div className="min-h-screen w-full bg-base-300 flex justify-center items-center p-6">
      <div className="card bg-base-100 w-full max-w-3xl shadow-2xl p-6 rounded-xl">
        <h1 className="text-3xl font-bold text-center mb-6">
          Complete Your Profile
        </h1>

        {/* Profile Picture Upload */}
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

        <form className="space-y-4">
          {/* Year Selection */}
          <div className="form-control">
            <label className="label">Year</label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {years.map((y) => (
                <button
                  key={y}
                  type="button"
                  className={`btn w-full ${
                    year === y ? "btn-accent" : "btn-outline"
                  }`}
                  onClick={() => setYear(y)}
                >
                  {y}
                </button>
              ))}
            </div>
          </div>

          {/* Department Selection */}
          <div className="form-control">
            <label className="label">Department</label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {departments.map((dept) => (
                <button
                  key={dept}
                  type="button"
                  className={`btn w-full ${
                    department === dept ? "btn-accent" : "btn-outline"
                  }`}
                  onClick={() => setDepartment(dept)}
                >
                  {dept}
                </button>
              ))}
            </div>
          </div>

          {/* Skills Selection */}
          <div className="form-control">
            <label className="label">Skills</label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {skillOptions.map((skill) => (
                <button
                  key={skill}
                  type="button"
                  className={`btn w-full ${
                    skills.includes(skill) ? "btn-accent" : "btn-outline"
                  }`}
                  onClick={() => handleSelection(skill, setSkills, skills)}
                >
                  {skill}
                </button>
              ))}
            </div>
            <div className="mt-2 flex gap-2">
              <input
                type="text"
                placeholder="Other skill"
                className="input input-bordered flex-grow"
                value={customSkill}
                onChange={(e) => setCustomSkill(e.target.value)}
              />
              <button
                type="button"
                className="btn btn-neutral"
                onClick={() => {
                  if (customSkill.trim()) {
                    setSkills([...skills, customSkill]);
                    setCustomSkill("");
                  }
                }}
              >
                Add
              </button>
            </div>

            <div className="mt-2 flex flex-wrap gap-2">
              {skills.map((skill, index) => (
                <span
                  key={index}
                  className="badge badge-neutral flex justify-between items-center gap-1 px-2 py-4 cursor-pointer"
                  onClick={() => handleRemoveSkill(skill)}
                  
                >
                  {skill}
                  {/* <button
                    type="button"
                    className="btn btn-error btn-circle btn-xs p-1"
                    onClick={() => handleRemoveSkill(skill)}
                  >
                    <FaMinus size={10} />
                  </button> */}
                </span>
              ))}
            </div>
          </div>

            {/* <div className="mt-2">
              {skills.map((skill, index) => (
                <div key={index} className="flex gap-2 mb-2">
                  <span className="badge badge-neutral">{skill}</span>
                  <button
                    type="button"
                    className="btn btn-error btn-sm"
                    onClick={() => handleRemoveSkill(skill)}
                  >
                    <FaTrash />
                  </button>
                </div>
              ))}
            </div>
          </div> */}

          {/* Role Selection */}
          <div className="form-control">
            <label className="label">Role</label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {roleOptions.map((role) => (
                <button
                  key={role}
                  type="button"
                  className={`btn w-full ${
                    roles.includes(role) ? "btn-accent" : "btn-outline"
                  }`}
                  onClick={() => handleSelection(role, setRoles, roles)}
                >
                  {role}
                </button>
              ))}
            </div>
            <div className="mt-2 flex gap-2">
              <input
                type="text"
                placeholder="Other role"
                className="input input-bordered flex-grow"
                value={customRole}
                onChange={(e) => setCustomRole(e.target.value)}
              />
              <button
                type="button"
                className="btn btn-neutral"
                onClick={() => {
                  if (customRole.trim()) {
                    setRoles([...roles, customRole]);
                    setCustomRole("");
                  }
                }}
              >
                Add
              </button>
            </div>
            <div className="mt-2 flex flex-wrap gap-2">
              {roles.map((role, index) => (
                <span
                  key={index}
                  className="badge badge-neutral flex justify-between items-center gap-1 px-2 py-4 cursor-pointer"
                  onClick={() => handleRemoveRole(role)}

                >
                  {role}
                  {/* <button
                    type="button"
                    className="btn btn-error btn-circle btn-xs"
                    onClick={() => handleRemoveRole(role)}
                  >
                    <FaMinus size={10} />
                  </button> */}
                </span>
              ))}
            </div>
          </div>

          {/* Experience Fields */}
          <div className="form-control">
            <label className="label">Experience</label>
            {experience.map((exp, index) => (
              <div key={index} className="flex gap-2 mb-2">
                <input
                  type="text"
                  placeholder="Hackathon Name"
                  className="input input-bordered flex-grow"
                  value={exp.name}
                  onChange={(e) => {
                    const newExp = [...experience];
                    newExp[index].name = e.target.value;
                    setExperience(newExp);
                  }}
                />
                <input
                  type="text"
                  placeholder="Rank"
                  className="input input-bordered w-20"
                  value={exp.rank}
                  onChange={(e) => {
                    const newExp = [...experience];
                    newExp[index].rank = e.target.value;
                    setExperience(newExp);
                  }}
                />
                <button
                  type="button"
                  className="btn btn-error"
                  onClick={() => handleRemoveExperience(index)}
                >
                  <FaTrash />
                </button>
              </div>
            ))}
            <button
              type="button"
              className="btn btn-neutral w-full mt-2"
              onClick={handleAddExperience}
            >
             Add More
            </button>
          </div>

          {/* Save Changes Button */}
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
