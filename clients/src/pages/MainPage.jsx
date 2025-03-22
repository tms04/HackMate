import { useState, useEffect } from "react";
import axios from "axios";
import { FiMenu, FiSearch } from "react-icons/fi";
import { motion } from "framer-motion";
import DrawerSideBar from "../components/DrawerSideBar";
import ProfileCard from "../components/ProfileCard";

const MainPage = () => {
  const [users, setUsers] = useState([]); // State to store fetched users
  const [filteredUsers, setFilteredUsers] = useState([]); // State to store filtered users
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const [searchQuery, setSearchQuery] = useState(""); // State for search query
  
  // Filter states
  const [filters, setFilters] = useState({
    department: "",
    year: "",
    gender: ""
  });

  // Department, year, gender options
  const departmentOptions = ["IT", "CS", "CSDS", "AI/ML", "Civil", "Mech", "EXTC"];
  const yearOptions = [1, 2, 3, 4];
  const genderOptions = ["Male", "Female", "Prefer Not to Say"];

  // Handle filter changes
  const handleFilterChange = (filterName, value) => {
    setFilters(prevFilters => ({
      ...prevFilters,
      [filterName]: value
    }));
  };

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Reset all filters and search
  const resetFilters = () => {
    setFilters({
      department: "",
      year: "",
      gender: ""
    });
    setSearchQuery("");
  };

  // Fetch users from the backend
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

  // Apply filters whenever filters state or search query changes
  useEffect(() => {
    if (users.length > 0) {
      let result = [...users];
      
      // Apply department filter
      if (filters.department) {
        result = result.filter(user => user.department === filters.department);
      }
      
      // Apply year filter
      if (filters.year) {
        result = result.filter(user => user.year === Number(filters.year));
      }
      
      // Apply gender filter
      if (filters.gender) {
        result = result.filter(user => user.gender === filters.gender);
      }
      
      // Apply search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        result = result.filter(user => {
          // Search in name
          const nameMatch = user.name && user.name.toLowerCase().includes(query);
          
          // Search in skills
          const skillsMatch = user.skills && Array.isArray(user.skills) && 
            user.skills.some(skill => skill.toLowerCase().includes(query));
          
          // Search in roles
          const rolesMatch = user.roles && Array.isArray(user.roles) && 
            user.roles.some(role => role.toLowerCase().includes(query));
            
          // Search in department
          const deptMatch = user.department && user.department.toLowerCase().includes(query);
          
          return nameMatch || skillsMatch || rolesMatch || deptMatch;
        });
      }
      
      setFilteredUsers(result);
    }
  }, [filters, users, searchQuery]);

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
        <div className="pt-16 px-10 pb-4">
          <div className="bg-base-100 p-4 rounded-lg shadow-md">
            {/* Search bar */}
            <div className="relative mb-4">
              <div className="join w-full">
                <div className="join-item bg-base-300 flex items-center pl-3">
                  <FiSearch className="text-base-content" />
                </div>
                <input 
                  type="text" 
                  placeholder="Search by name, skills, roles..." 
                  className="input input-bordered join-item w-full" 
                  value={searchQuery}
                  onChange={handleSearchChange}
                />
                {searchQuery && (
                  <button 
                    className="btn join-item"
                    onClick={() => setSearchQuery("")}
                  >
                    Clear
                  </button>
                )}
              </div>
            </div>
            
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              <h2 className="text-lg font-semibold">Filter Profiles</h2>
              
              <div className="flex flex-wrap gap-3 items-center">
                {/* Department Filter */}
                <div className="form-control w-full max-w-xs">
                  <select 
                    className="select select-bordered w-full max-w-xs" 
                    value={filters.department}
                    onChange={(e) => handleFilterChange("department", e.target.value)}
                  >
                    <option value="">All Departments</option>
                    {departmentOptions.map(dept => (
                      <option key={dept} value={dept}>{dept}</option>
                    ))}
                  </select>
                </div>
                
                {/* Year Filter */}
                <div className="form-control w-full max-w-xs">
                  <select 
                    className="select select-bordered w-full max-w-xs" 
                    value={filters.year}
                    onChange={(e) => handleFilterChange("year", e.target.value)}
                  >
                    <option value="">All Years</option>
                    {yearOptions.map(year => (
                      <option key={year} value={year}>Year {year}</option>
                    ))}
                  </select>
                </div>
                
                {/* Gender Filter */}
                <div className="form-control w-full max-w-xs">
                  <select 
                    className="select select-bordered w-full max-w-xs" 
                    value={filters.gender}
                    onChange={(e) => handleFilterChange("gender", e.target.value)}
                  >
                    <option value="">All Genders</option>
                    {genderOptions.map(gender => (
                      <option key={gender} value={gender}>{gender}</option>
                    ))}
                  </select>
                </div>
                
                {/* Reset Filters Button */}
                <button 
                  className="btn btn-outline btn-sm"
                  onClick={resetFilters}
                >
                  Reset Filters
                </button>
              </div>
            </div>
            
            {/* Filter Results Count */}
            <div className="mt-3 text-sm opacity-80">
              Showing {filteredUsers.length} of {users.length} profiles
              {searchQuery && (
                <span> • Searching for: <span className="font-semibold">{searchQuery}</span></span>
              )}
            </div>
          </div>
        </div>

        {/* Profile Cards Grid */}
        <div className="px-10 pb-10">
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 place-items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {filteredUsers.length > 0 ? filteredUsers.map((profile) => (
              <ProfileCard
                key={profile._id} // Use _id from MongoDB
                name={profile.name}
                year={profile.year}
                gender={profile.gender}
                department={profile.department}
                profileImage={profile.profilePic} // Pass profile image if available
                roles={profile.roles} // Pass roles if available
                skills={profile.skills} // Pass skills if available
                achievements={profile.achievements} // Pass achievements if available
              />
            )) : (
              <div className="col-span-full py-10 text-center">
                <p className="text-lg">No profiles match the selected filters</p>
                <button 
                  className="btn btn-primary mt-4"
                  onClick={resetFilters}
                >
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
