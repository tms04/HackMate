/* eslint-disable no-unused-vars */
import { useState } from "react";
import { FaTimes } from "react-icons/fa";

const TeamForm = () => {
  const [teamName, setTeamName] = useState("");
  const [members, setMembers] = useState(1);
  const [hackathonName, setHackathonName] = useState("");
  const [locationType, setLocationType] = useState("Online");
  const [offlineLocation, setOfflineLocation] = useState("");
  const [date, setDate] = useState("");
  const [skills, setSkills] = useState([]);

  const skillOptions = [
    "Frontend (Web)",
    "Backend (Web)",
    "Full Stack (Web)",
    "App Developer",
    "AI/ML Developer",
    "Blockchain Developer", 
  ];

  const handleSkillSelect = (e) => {
    const selectedSkill = e.target.value;
    if (selectedSkill && !skills.includes(selectedSkill)) {
      setSkills([...skills, selectedSkill]);
    }
  };

  const removeSkill = (skillToRemove) => {
    setSkills(skills.filter((skill) => skill !== skillToRemove));
  };

  const handleSaveTeam = () => {
    console.log("Team Created:", {
      teamName,
      members,
      hackathonName,
      locationType,
      offlineLocation: locationType === "Offline" ? offlineLocation : "N/A",
      date,
      skills,
    });
  };

  return (
    <div className="min-h-screen w-full bg-base-300 flex justify-center items-center p-6">
      <div className="card bg-base-100 w-full max-w-3xl shadow-2xl p-6 rounded-xl">
        <h1 className="text-3xl font-bold text-center mb-6">Create a Team</h1>
        <form className="space-y-4">
          {/* Team Name */}
          <div className="form-control">
            <label className="label">Team Name</label>
            <input
              type="text"
              placeholder="Enter team name"
              className="input input-bordered"
              value={teamName}
              onChange={(e) => setTeamName(e.target.value)}
            />
          </div>

          {/* Number of Members */}
          <div className="form-control">
            <label className="label">Number of Members</label>
            <input
              type="number"
              min="1"
              max="10"
              className="input input-bordered"
              value={members}
              onChange={(e) => setMembers(Number(e.target.value))}
            />
          </div>

          {/* Hackathon Name */}
          <div className="form-control">
            <label className="label">Hackathon Name</label>
            <input
              type="text"
              placeholder="Enter hackathon name"
              className="input input-bordered"
              value={hackathonName}
              onChange={(e) => setHackathonName(e.target.value)}
            />
          </div>

          {/* Location Type */}
          <div className="form-control">
            <label className="label">Location</label>
            <div className="flex gap-2">
              {["Online", "Offline"].map((type) => (
                <button
                  key={type}
                  type="button"
                  className={`btn w-1/2 ${locationType === type ? "btn-accent" : "btn-outline"}`}
                  onClick={() => setLocationType(type)}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          {/* Offline Location */}
          {locationType === "Offline" && (
            <div className="form-control">
              <label className="label">Offline Location</label>
              <input
                type="text"
                placeholder="Enter location"
                className="input input-bordered"
                value={offlineLocation}
                onChange={(e) => setOfflineLocation(e.target.value)}
              />
            </div>
          )}

          {/* Date Selection */}
          <div className="form-control">
            <label className="label">Date</label>
            <input
              type="date"
              className="input input-bordered"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>

          {/* Skills Selection */}
          <div className="form-control">
            <label className="label">Skills Needed</label>
            <select className="select select-bordered" onChange={handleSkillSelect}>
              <option value="">Select a skill</option>
              {skillOptions.map((skill) => (
                <option key={skill} value={skill}>
                  {skill}
                </option>
              ))}
            </select>
          </div>

          {/* Display Selected Skills */}
          {skills.length > 0 && (
            <div className="form-control">
              <label className="label">Selected Skills</label>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <div key={skill} className="badge badge-accent flex items-center gap-1">
                    {skill}
                    <button onClick={() => removeSkill(skill)}>
                      <FaTimes className="ml-1 text-xs" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Save Team Button */}
          <button type="button" className="btn btn-outline w-full" onClick={handleSaveTeam}>
            Create Team
          </button>
        </form>
      </div>
    </div>
  );
};

export default TeamForm;
