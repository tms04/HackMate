/* eslint-disable react/prop-types */
import  { useState } from "react";

const SkillInput = ({ skills, setSkills, skillOptions }) => {
  const [customSkill, setCustomSkill] = useState("");

  const handleSelection = (item) => {
    setSkills(
      skills.includes(item) ? skills.filter((i) => i !== item) : [...skills, item]
    );
  };

  const handleRemoveSkill = (skill) => {
    setSkills(skills.filter((s) => s !== skill));
  };

  return (
    <div className="form-control">
      <div className="flex">
   <label className="label font-semibold">
        Skills<span className="text-red-500 ms-2">*</span>{" "}
        <span className="text-sm text-gray-500">(as per your preference, highest first)</span>
      </label>
   </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
        {skillOptions.map((skill) => (
          <button
            key={skill}
            type="button"
            className={`btn w-full ${
              skills.includes(skill) ? "btn-accent" : "btn-outline"
            }`}
            onClick={() => handleSelection(skill)}
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
          </span>
        ))}
      </div>
    </div>
  );
};

export default SkillInput;
