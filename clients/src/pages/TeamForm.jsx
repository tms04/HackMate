import { useState } from "react";
import { FaTimes, FaPlus, FaMinus } from "react-icons/fa";
import toast from "react-hot-toast";

const TeamForm = () => {
  const [teamName, setTeamName] = useState("");
  const [members, setMembers] = useState(1);
  const [hackathonName, setHackathonName] = useState("");
  const [locationType, setLocationType] = useState("Online");
  const [offlineLocation, setOfflineLocation] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [domains, setDomains] = useState([]);

  const domainOptions = [
    "Frontend (Web)",
    "Backend (Web)",
    "Full Stack (Web)",
    "App Developer",
    "AI/ML Developer",
    "Blockchain Developer",
  ];

  const handleDomainSelect = (e) => {
    const selectedDomain = e.target.value;
    if (selectedDomain && !domains.includes(selectedDomain)) {
      setDomains([...domains, selectedDomain]);
    }
  };

  const removeDomain = (domainToRemove) => {
    setDomains(domains.filter((domain) => domain !== domainToRemove));
  };

  const handleMemberChange = (change) => {
    setMembers((prevMembers) => {
      const newMembers = prevMembers + change;
      return Math.max(1, Math.min(newMembers, 10));
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!teamName || !hackathonName || !startDate || !endDate || (locationType === "Offline" && !offlineLocation) || domains.length === 0) {
      toast.error("Please fill in all required fields.");
      return;
    }

    console.log("Team Created:", {
      teamName,
      members,
      hackathonName,
      locationType,
      offlineLocation: locationType === "Offline" ? offlineLocation : "N/A",
      startDate,
      endDate,
      domains,
    });
  };

  return (
    <div className="min-h-screen w-full bg-base-300 flex justify-center items-center p-6">
      <div className="card bg-base-100 w-full max-w-3xl shadow-2xl p-6 rounded-xl">
        <h1 className="text-3xl font-bold text-center mb-6">Create a Team</h1>
        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Team Name */}
          <div className="form-control">
            <label className="label">Team Name</label>
            <input
              type="text"
              placeholder="Enter team name"
              className="input input-bordered"
              value={teamName}
              onChange={(e) => setTeamName(e.target.value)}
              required
            />
          </div>

          {/* Number of Members */}
          <div className="form-control">
            <label className="label">Number of Members</label>
            <div className="flex items-center gap-4">
              <button type="button" className="btn btn-circle btn-sm btn-outline hover:btn-accent" onClick={() => handleMemberChange(-1)}>
                <FaMinus />
              </button>
              <span className="text-xl font-bold w-12 text-center">{members}</span>
              <button type="button" className="btn btn-circle btn-sm btn-outline hover:btn-accent" onClick={() => handleMemberChange(1)}>
                <FaPlus />
              </button>
            </div>
            <p className="text-sm text-base-content/70 mt-1">Min: 1, Max: 10 team members</p>
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
              required
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
                required={locationType === "Offline"}
              />
            </div>
          )}

          {/* Start Date */}
          <div className="form-control">
            <label className="label">Start Date</label>
            <input type="date" className="input input-bordered" value={startDate} onChange={(e) => setStartDate(e.target.value)} required />
          </div>

          {/* End Date */}
          <div className="form-control">
            <label className="label">End Date</label>
            <input type="date" className="input input-bordered" value={endDate} onChange={(e) => setEndDate(e.target.value)} required />
          </div>

          {/* Domains Selection */}
          <div className="form-control">
            <label className="label">Domains Needed</label>
            <select className="select select-bordered" onChange={handleDomainSelect}>
              <option value="">Select a domain</option>
              {domainOptions.map((domain) => (
                <option key={domain} value={domain}>
                  {domain}
                </option>
              ))}
            </select>
          </div>

          {/* Display Selected Domains */}
          {domains.length > 0 && (
            <div className="form-control">
              <label className="label">Selected Domains</label>
              <div className="flex flex-wrap gap-2">
                {domains.map((domain) => (
                  <div key={domain} className="badge badge-accent flex items-center gap-1">
                    {domain}
                    <button type="button" onClick={() => removeDomain(domain)}>
                      <FaTimes className="ml-1 text-xs" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Submit Button */}
          <button type="submit" className="btn btn-accent w-full">
            Create Team
          </button>
        </form>
      </div>
    </div>
  );
};

export default TeamForm;
