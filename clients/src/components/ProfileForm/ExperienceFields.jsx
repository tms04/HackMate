/* eslint-disable react/prop-types */
import { FaTrash, FaPlus } from "react-icons/fa";

const ExperienceFields = ({ experience, setExperience }) => {
  const handleAddExperience = () => {
    setExperience([...experience, { name: "", rank: "" }]);
  };

  const handleRemoveExperience = (index) => {
    setExperience(experience.filter((_, i) => i !== index));
  };

  return (
    <div className="form-control">
      <label className="label flex items-center justify-between">
        Experience
        <button type="button" className="btn btn-neutral btn-sm" onClick={handleAddExperience}>
          <FaPlus />
        </button>
      </label>
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
    </div>
  );
};

export default ExperienceFields;
