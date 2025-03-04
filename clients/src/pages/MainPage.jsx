/* eslint-disable no-unused-vars */
import DrawerSideBar from "../components/DrawerSideBar";
// import Menu from "../components/Menu";
import Filter from "../components/Filter";
import ProfileCard from "../components/ProfileCard";
import { FiMenu } from "react-icons/fi";
import { motion } from "framer-motion";
import { useState } from 'react';

import { useNavigate } from "react-router-dom";
import { Menu } from "lucide-react";


// const profiles = [
//   { id: 1, name: "Alice", year: "First", gender: "Female" },
//   { id: 2, name: "Bob", year: "Second", gender: "Male" },
//   { id: 3, name: "Charlie", year: "Third", gender: "Male" },
//   { id: 4, name: "Diana", year: "Final", gender: "Female" },
//   { id: 5, name: "Eve", year: "Second", gender: "Female" },
//   { id: 6, name: "Frank", year: "Third", gender: "Male" },
//   { id: 7, name: "Grace", year: "First", gender: "Female" },
//   { id: 8, name: "Hank", year: "Final", gender: "Male" },
//   { id: 9, name: "Ivy", year: "Second", gender: "Female" },
//   { id: 10, name: "Jack", year: "Third", gender: "Male" },
//   { id: 11, name: "Karen", year: "Final", gender: "Female" },
//   { id: 12, name: "Leo", year: "First", gender: "Male" },
// ];

const profiles = [
  { id: 1, name: "Alice", year: "First", gender: "Female", department: "IT" },
  { id: 2, name: "Bob", year: "Second", gender: "Male", department: "CS" },
  { id: 3, name: "Charlie", year: "Third", gender: "Male", department: "EXTC" },
  { id: 4, name: "Diana", year: "Final", gender: "Female", department: "IT" },
  { id: 5, name: "Eve", year: "Second", gender: "Female", department: "CS" },
  { id: 6, name: "Frank", year: "Third", gender: "Male", department: "EXTC" },
  { id: 7, name: "Grace", year: "First", gender: "Female", department: "IT" },
  { id: 8, name: "Hank", year: "Final", gender: "Male", department: "CS" },
  { id: 9, name: "Ivy", year: "Second", gender: "Female", department: "EXTC" },
  { id: 10, name: "Jack", year: "Third", gender: "Male", department: "IT" },
  { id: 11, name: "Karen", year: "Final", gender: "Female", department: "CS" },
  { id: 12, name: "Leo", year: "First", gender: "Male", department: "EXTC" },
];


const MainPage = () => {


    const [selectedYear, setSelectedYear] = useState("All");
    const [selectedGender, setSelectedGender] = useState("All");
  
    const handleFilterChange = (event, filterType) => {
      const value = event.target.value;
      if (filterType === "year") setSelectedYear(value);
      if (filterType === "gender") setSelectedGender(value);
    };
  
    const filteredProfiles = profiles.filter(
      (profile) =>
        (selectedYear === "All" || profile.year === selectedYear) &&
        (selectedGender === "All" || profile.gender === selectedGender)
    );

    // ---------------------Profile Display Page------------------------------

    const navigate = useNavigate();

     // Handle redirect to profile details page
     const handleRedirectToProfile = () => {
      navigate("/profile"); // Navigate to the profile details page
    };

    // ------------------------------------------------------------------


  return (
    <div className="drawer">
      <input id="my-drawer" type="checkbox" className="drawer-toggle" />

      {/* Page Content */}
      <div className="drawer-content bg-base-200 min-h-screen text-white">
        
        {/* <div className="h-10 bg-base-400 text-center"> */}
          {/* <Menu /> */}
          {/* <Filter /> */}
        {/* </div> */}

        {/* <button className="btn btn-primary" onClick={handleRedirectToProfile}> */}
          {/* View Profile */}
        {/* </button> */}

        {/* Drawer Button */}
        <label
          htmlFor="my-drawer"
          className="btn btn-circle btn-neutral fixed top-4 left-4 z-50 transition-opacity duration-300 drawer-button"
        >
          <FiMenu size={24} />
        </label>

        {/* Profile Cards Grid */}
        {/* <div className="p-10 pt-14">
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 place-items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {Array.from({ length: 12 }).map((_, index) => (
              <ProfileCard key={index} />
            ))}
          </motion.div>
        </div> */}

        <div className="p-10 pt-14">
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 place-items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {filteredProfiles.map((profile) => (
              <ProfileCard
                key={profile.id}
                name={profile.name}
                year={profile.year}
                gender={profile.gender}
                department={profile.department}
              />
            ))}
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
