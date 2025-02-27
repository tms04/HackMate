import { useState } from "react";
import { FaFilter } from "react-icons/fa";

const Filter = ({ onFilterChange }) => {
  const [filters, setFilters] = useState({
    gender: "",
    year: "",
    department: "",
    techStack: ""
  });

  const handleFilterChange = (key, value) => {
    setFilters((prev) => {
      const newFilters = { ...prev, [key]: value };
      onFilterChange(newFilters);
      return newFilters;
    });
  };

  return (
    <div className="flex justify-center mt-6">
      <div className="bg-neutral rounded-box p-4 flex space-x-4">
        <FaFilter className="h-5 w-5 self-center" />
        
        <select 
          className="select select-bordered" 
          value={filters.gender} 
          onChange={(e) => handleFilterChange("gender", e.target.value)}
        >
          <option value="">Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>

        <select 
          className="select select-bordered" 
          value={filters.year} 
          onChange={(e) => handleFilterChange("year", e.target.value)}
        >
          <option value="">Year</option>
          <option value="1st">1st</option>
          <option value="2nd">2nd</option>
          <option value="3rd">3rd</option>
          <option value="4th">4th</option>
        </select>

        <select 
          className="select select-bordered" 
          value={filters.department} 
          onChange={(e) => handleFilterChange("department", e.target.value)}
        >
          <option value="">Department</option>
          <option value="CSE">CSE</option>
          <option value="IT">IT</option>
          <option value="ECE">ECE</option>
          <option value="Mechanical">Mechanical</option>
        </select>

        <select 
          className="select select-bordered" 
          value={filters.techStack} 
          onChange={(e) => handleFilterChange("techStack", e.target.value)}
        >
          <option value="">Tech Stack</option>
          <option value="Frontend">Frontend</option>
          <option value="Backend">Backend</option>
          <option value="App">App</option>
          <option value="UI/UX">UI/UX</option>
          <option value="Blockchain">Blockchain</option>
          <option value="AI/ML">AI/ML</option>
        </select>
      </div>
    </div>
  );
};

export default Filter;










