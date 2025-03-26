/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import axios from "axios";
import { FiMenu, FiSearch, FiX } from "react-icons/fi";
import { motion } from "framer-motion";
import DrawerSideBar from "../components/DrawerSideBar";
import ProfileCard from "../components/ProfileCard";
import { useLocation } from "react-router-dom";
import Cookies from "js-cookie";
import { MdFilterAltOff } from "react-icons/md";


const MainPage = () => {
  const userId = Cookies.get("userId");
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const teamId = queryParams.get("teamId");
  const [users, setUsers] = useState([]); // State to store fetched users
  const [filteredUsers, setFilteredUsers] = useState([]); // State to store filtered users
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const [searchInput, setSearchInput] = useState(""); // State for current search input
  const [searchTerms, setSearchTerms] = useState([]); // State for active search terms
  // const [currentTeamId, setCurrentTeamId] = useState(null);

  // Filter states
  const [filters, setFilters] = useState({
    department: "",
    year: "",
    gender: "",
  });

  // Department, year, gender options
  const departmentOptions = [
    "IT",
    "CS",
    "CSDS",
    "AI/ML",
    "Civil",
    "Mech",
    "EXTC",
  ];
  const yearOptions = [1, 2, 3, 4];
  const genderOptions = ["Male", "Female", "Prefer Not to Say"];

  // Handle filter changes
  const handleFilterChange = (filterName, value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterName]: value,
    }));
  };

  // Handle search input change
  const handleSearchInputChange = (e) => {
    setSearchInput(e.target.value);
  };

  // Add search term when Enter is pressed
  const handleSearchKeyDown = (e) => {
    if (e.key === "Enter" && searchInput.trim()) {
      // Add the search term if it doesn't already exist
      if (!searchTerms.includes(searchInput.trim())) {
        setSearchTerms((prev) => [...prev, searchInput.trim()]);
      }
      setSearchInput(""); // Clear the input
    }
  };

  // Add search term from the input
  const addSearchTerm = () => {
    if (searchInput.trim() && !searchTerms.includes(searchInput.trim())) {
      setSearchTerms((prev) => [...prev, searchInput.trim()]);
      setSearchInput(""); // Clear the input
    }
  };

  // Remove a specific search term
  const removeSearchTerm = (term) => {
    setSearchTerms(searchTerms.filter((t) => t !== term));
  };

  // Reset all filters and search
  const resetFilters = () => {
    setFilters({
      department: "",
      year: "",
      gender: "",
    });
    setSearchTerms([]);
    setSearchInput("");
  };

  // Fetch users from the backend using teamId

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/users/all`
        ); // Replace with your API endpoint
        setUsers(response.data.data); // Set the fetched users
        setFilteredUsers(response.data.data); // Initially set filtered users to all users
        setLoading(false); // Set loading to false
      } catch (err) {
        console.error("Error fetching users:", err);
        setError("Failed to fetch users. Please try again later.");
        setLoading(false); // Set loading to false
      }
    };

    fetchUsers();
  }, []);

  // Apply filters whenever filters state or search terms change
  useEffect(() => {
    if (users.length > 0) {
      let result = [...users];

      // Apply department filter
      if (filters.department) {
        result = result.filter(
          (user) => user.department === filters.department
        );
      }

      // Apply year filter
      if (filters.year) {
        result = result.filter((user) => user.year === Number(filters.year));
      }

      // Apply gender filter
      if (filters.gender) {
        result = result.filter((user) => user.gender === filters.gender);
      }

      // Apply search terms - each term is ANDed (all terms must match)
      if (searchTerms.length > 0) {
        result = result.filter((user) => {
          // Check if user matches ALL search terms
          return searchTerms.every((term) => {
            const query = term.toLowerCase();

            // Search in name
            const nameMatch =
              user.name && user.name.toLowerCase().includes(query);

            // Search in skills
            const skillsMatch =
              user.skills &&
              Array.isArray(user.skills) &&
              user.skills.some((skill) => skill.toLowerCase().includes(query));

            // Search in roles
            const rolesMatch =
              user.roles &&
              Array.isArray(user.roles) &&
              user.roles.some((role) => role.toLowerCase().includes(query));

            // Search in department
            const deptMatch =
              user.department && user.department.toLowerCase().includes(query);

            return nameMatch || skillsMatch || rolesMatch || deptMatch;
          });
        });
      }

      setFilteredUsers(result);
    }
  }, [filters, users, searchTerms]);

  // Display loading state
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-base-200">
        <p className="text-lg text-white">Loading...</p>
      </div>
    );
  }

  // Display error state
  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-base-200">
        <p className="text-lg text-red-500">{error}</p>
      </div>
    );
  }

  // console.log(profile.userId);
  return (
    <div className="drawer">
      <input id="my-drawer" type="checkbox" className="drawer-toggle" />

      {/* Page Content */}
      <div className="drawer-content bg-base-200 min-h-screen text-white">
        {/* Drawer Button */}
        <label
          htmlFor="my-drawer"
          className="btn btn-circle btn-neutral fixed top-4 left-4 z-50 transition-opacity duration-300 drawer-button"
        >
          <FiMenu size={24} />
        </label>
        {/* Filter Bar */}
        <div className="pt-4 px-5 pb-4 flex justify-center text-base-content">
          <div className="bg-base-100 p-4 rounded-lg shadow-md w-fit">
            {/* Search bar and filters in a single line */}
            <div className="flex flex-col lg:flex-row gap-3 items-center">
              {/* Search Input */}
              <div className="join w-full lg:w-2/5 outline-none">
                <input
                  type="text"
                  placeholder="Search"
                  className="input join-item w-full bg-base-200 focus:border-base-content focus:ring-0 focus:outline-none"
                  value={searchInput}
                  onChange={handleSearchInputChange}
                  onClick={handleSearchKeyDown}
                />

                <button
                  className="join-item btn btn-neutral"
                  onClick={addSearchTerm}
                  // disabled={!searchInput.trim()}
                >
                  {/* <span className="hidden sm:inline">Add</span> */}
                  {/* <span className="sm:hidden">+</span> */}
                  <FiSearch className="text-neutral-content " />
                </button>
              </div>

              {/* Filters Group */}
              <div className="flex flex-1 gap-2 w-full lg:w-auto">
                {/* Department Filter */}
                <select
                  className="select select-bordered flex-1 bg-base-200"
                  value={filters.department}
                  onChange={(e) =>
                    handleFilterChange("department", e.target.value)
                  }
                >
                  <option value="">Department</option>
                  {departmentOptions.map((dept) => (
                    <option key={dept} value={dept}>
                      {dept}
                    </option>
                  ))}
                </select>

                {/* Year Filter */}
                <select
                  className="select select-bordered flex-1 bg-base-200"
                  value={filters.year}
                  onChange={(e) => handleFilterChange("year", e.target.value)}
                >
                  <option value="">Year</option>
                  {yearOptions.map((year) => (
                    <option key={year} value={year}>
                      Year {year}
                    </option>
                  ))}
                </select>

                {/* Gender Filter */}
                <select
                  className="select select-bordered flex-1 bg-base-200"
                  value={filters.gender}
                  onChange={(e) => handleFilterChange("gender", e.target.value)}
                >
                  <option value="">Gender</option>
                  {genderOptions.map((gender) => (
                    <option key={gender} value={gender}>
                      {gender}
                    </option>
                  ))}
                </select>
              </div>

              {/* Reset Filters Button */}
              <button
  className="btn btn-neutral rounded-full text-2xl p-3"
  onClick={resetFilters}
>
  <MdFilterAltOff />
</button>

            </div>

            {/* Search terms display */}
            {searchTerms.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-3 pb-1">
                <span className="text-sm opacity-70 self-center">
                  Active filters:
                </span>
                {searchTerms.map((term, index) => (
                  <span key={index} className="badge badge-primary gap-1 py-3">
                    {term}
                    <button
                      onClick={() => removeSearchTerm(term)}
                      className="btn btn-xs btn-circle btn-ghost"
                      aria-label={`Remove ${term} filter`}
                    >
                      <FiX size={14} />
                    </button>
                  </span>
                ))}
                <button
                  className="badge badge-outline cursor-pointer py-3"
                  onClick={() => setSearchTerms([])}
                >
                  Clear all terms
                </button>
              </div>
            )}

            {/* Filter Results Count */}
            <div className="mt-3 text-sm opacity-80 flex items-center">
              <span className="badge badge-neutral badge-sm mr-2">
                {filteredUsers.length}
              </span>
              of {users.length} profiles shown
              {(filters.department || filters.year || filters.gender) && (
                <div className="ml-2 flex gap-1">
                  {filters.department && (
                    <span className="badge badge-sm badge-outline">
                      {filters.department}
                    </span>
                  )}
                  {filters.year && (
                    <span className="badge badge-sm badge-outline">
                      Year {filters.year}
                    </span>
                  )}
                  {filters.gender && (
                    <span className="badge badge-sm badge-outline">
                      {filters.gender}
                    </span>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Profile Cards Grid */}
        <div className="px-10 pb-10">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 place-items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {filteredUsers.length > 0 ? (
              filteredUsers
                .filter(
                  (profile) =>
                    profile._id &&
                    profile.name &&
                    profile.year &&
                    profile.gender &&
                    profile.department &&
                    profile.profilePic &&
                    profile.roles?.length > 0 &&
                    profile.skills?.length > 0
                )
                .map((profile) => (
                  <ProfileCard
                    key={profile._id}
                    id={profile._id}
                    teamId={teamId} // Use _id from MongoDB
                    name={profile.name}
                    year={profile.year}
                    gender={profile.gender}
                    department={profile.department}
                    profileImage={profile.profilePic} // Pass profile image if available
                    roles={profile.roles} // Pass roles if available
                    skills={profile.skills} // Pass skills if available
                    achievements={profile.experience}
                    // userId1={profile.userId} // Pass achievements if available
                  />
                ))
            ) : (
              <div className="col-span-full py-10 text-center">
                <p className="text-lg">
                  No profiles match the selected filters
                </p>
                <button className="btn btn-primary mt-4" onClick={resetFilters}>
                  Reset Filters
                </button>
              </div>
            )}
          </motion.div>
        </div>
      </div>

      <DrawerSideBar />

      {/* Hide Menu Icon When Drawer is Open */}
      <style>
        {`
          #my-drawer:checked ~ .drawer-content .drawer-button {
            opacity: 0;
            pointer-events: none;
          }
        `}
      </style>
    </div>
  );
};

export default MainPage;