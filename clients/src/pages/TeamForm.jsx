/* eslint-disable no-unused-vars */
import { useState } from "react";
import { FaTimes, FaPlus, FaMinus } from "react-icons/fa";
import toast from "react-hot-toast";
import Cookies from "js-cookie";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const TeamForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    teamName: "",
    maxSize: 1,
    hackathonName: "",
    mode: "Online",
    location: "",
    startDate: "",
    endDate: "",
    domains: [],
  });

  const domainOptions = [
    "Frontend (Web)",
    "Backend (Web)",
    "Full Stack (Web)",
    "App Developer",
    "AI/ML Developer",
    "Blockchain Developer",
  ];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleDomainSelect = (e) => {
    const selectedDomain = e.target.value;
    if (selectedDomain && !formData.domains.includes(selectedDomain)) {
      setFormData({
        ...formData,
        domains: [...formData.domains, selectedDomain],
      });
    }
  };

  const removeDomain = (domainToRemove) => {
    setFormData({
      ...formData,
      domains: formData.domains.filter((domain) => domain !== domainToRemove),
    });
  };

  const handleMemberChange = (change) => {
    setFormData((prev) => ({
      ...prev,
      maxSize: Math.max(1, Math.min(prev.maxSize + change, 10)),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const {
      teamName,
      maxSize,
      hackathonName,
      mode,
      location,
      startDate,
      endDate,
      domains,
    } = formData;

    if (
      !teamName ||
      !hackathonName ||
      !startDate ||
      !endDate ||
      (mode === "Offline" && !location) ||
      domains.length === 0
    ) {
      toast.error("Please fill in all required fields.");
      return;
    }
    try {
      const userId = Cookies.get("userId");
      const token = Cookies.get("token");
      if (!userId || !token) {
        toast.error("You need to be logged in to create a team.");
        return;
      }

      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/team/createTeam`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      toast.success("Team created successfully!");
      navigate("/myteams");
      console.log("Team Created:", response.data);
    } catch (error) {
      console.error("Error creating team", error);
      if (error.response) {
        console.error("Server Response:", error.response.data); // 🔍 Logs server error details
      }
    }
  };

  return (
    <div className="min-h-screen w-full bg-base-300 flex justify-center items-center p-6 sm:ps-20 sm:pt-6 pt-20 ">
      <div className="card bg-base-100 w-full max-w-3xl shadow-2xl p-6 rounded-xl">
        <h1 className="text-3xl font-bold text-center mb-6">Create a Team</h1>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="form-control">
            <label className="label">Team Name</label>
            <input
              type="text"
              name="teamName"
              className="input input-bordered"
              value={formData.teamName}
              onChange={handleChange}
              required
              placeholder="Enter your team name"
            />
          </div>
          <div className="form-control">
            <label className="label">Number of Members</label>
            <div className="flex items-center gap-4">
              <button
                type="button"
                className="btn btn-circle btn-sm btn-outline"
                onClick={() => handleMemberChange(-1)}
              >
                <FaMinus />
              </button>
              <span className="text-xl font-bold w-12 text-center">
                {formData.maxSize}
              </span>
              <button
                type="button"
                className="btn btn-circle btn-sm btn-outline"
                onClick={() => handleMemberChange(1)}
              >
                <FaPlus />
              </button>
            </div>
          </div>
          <div className="form-control">
            <label className="label">Hackathon Name</label>
            <input
              type="text"
              name="hackathonName"
              className="input input-bordered"
              value={formData.hackathonName}
              onChange={handleChange}
              required
              placeholder="Enter hackathon name"
            />
          </div>
          <div className="form-control">
            <label className="label">Location</label>
            <div className="flex gap-2">
              {["Online", "Offline"].map((type) => (
                <button
                  key={type}
                  type="button"
                  className={`btn w-1/2 ${formData.mode === type ? "btn-accent" : "btn-outline"
                    }`}
                  onClick={() => setFormData({ ...formData, mode: type })}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>
          {formData.mode === "Offline" && (
            <div className="form-control">
              <label className="label">Offline Location</label>
              <input
                type="text"
                name="location"
                className="input input-bordered"
                value={formData.location}
                onChange={handleChange}
                required
              />
            </div>
          )}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="form-control w-full">
              <label className="label">Start Date</label>
              <input
                type="date"
                name="startDate"
                className="input input-bordered"
                value={formData.startDate}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-control w-full">
              <label className="label">End Date</label>
              <input
                type="date"
                name="endDate"
                className="input input-bordered"
                value={formData.endDate}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="form-control">
            <label className="label">Domains Needed</label>
            <select
              className="select select-bordered"
              onChange={handleDomainSelect}
            >
              <option value="">Select a domain</option>
              {domainOptions.map((domain) => (
                <option key={domain} value={domain}>
                  {domain}
                </option>
              ))}
            </select>
          </div>
          {formData.domains.length > 0 && (
            <div className="form-control">
              <label className="label">Selected Domains</label>
              <div className="flex flex-wrap gap-2">
                {formData.domains.map((domain) => (
                  <div
                    key={domain}
                    className="badge badge-neutral p-4 flex items-center gap-1"
                  >
                    {domain}
                    <button type="button" onClick={() => removeDomain(domain)}>
                      <FaTimes className="ml-1 text-xs" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
          <button type="submit" className="btn btn-neutral w-full">
            Create Team
          </button>
        </form>
      </div>
    </div>
  );
};

export default TeamForm;
