import DrawerSideBar from "../components/DrawerSideBar";
import Menu from "../components/Menu";
import ProfileCard from "../components/ProfileCard";
import { FiMenu } from "react-icons/fi";
import { motion } from "framer-motion";

const MainPage = () => {
  return (
    <div className="drawer">
      <input id="my-drawer" type="checkbox" className="drawer-toggle" />

      {/* Page Content */}
      <div className="drawer-content bg-base-200 min-h-screen text-white">
        <div className="h-10 bg-base-400 text-center">
          <Menu />
        </div>

        {/* Drawer Button */}
        <label 
          htmlFor="my-drawer" 
          className="btn btn-circle btn-neutral fixed top-4 left-4 z-50 transition-opacity duration-300 drawer-button"
        >
          <FiMenu size={24} />
        </label>

        {/* Profile Cards Grid */}
        <div className="p-10 pt-14">
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
