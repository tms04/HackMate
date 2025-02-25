import { FaReact, FaNodeJs, FaFigma } from "react-icons/fa";
import { SiExpress, SiNextdotjs } from "react-icons/si";
import { motion } from "framer-motion";

const ProfileCard = () => {
  return (
    <motion.div
      className="relative bg-gradient-to-b from-base-100 to-base-200 p-5 w-72 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300"
      whileHover={{ scale: 1.05 }}
    >
      {/* Profile Image & Name */}
      <div className="flex flex-col items-center">
        <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-neutral">
          <img
            src="https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.webp"
            alt="Profile"
            className="w-full h-full object-cover"
          />
        </div>
        <h2 className="text-lg font-bold mt-2 text-base-content">Saurabhkumar Sharma</h2>
        <p className="text-sm text-base-content/70">IT | TY | Male</p>
      </div>

      {/* Roles with '>>' Symbol */}
      <div className="mt-4 flex justify-center items-center gap-2 text-sm font-medium text-base-content">
        <span className="px-3 py-1 text-xs font-semibold bg-neutral text-neutral-content rounded-full">
          Frontend
        </span>
        <span className="text-lg text-neutral">&raquo;</span>
        <span className="px-3 py-1 text-xs font-semibold bg-neutral text-neutral-content rounded-full">
          Backend
        </span>
        <span className="text-lg text-neutral">&raquo;</span>
        <span className="px-3 py-1 text-xs font-semibold bg-neutral text-neutral-content rounded-full">
          App
        </span>
      </div>

      {/* Skills Icons with Tooltips */}
      <div className="mt-4">
        <div className="flex justify-center gap-3 text-lg text-base-content">
          <div className="relative group">
            <FaFigma />
            <span className="absolute bottom-7 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-white text-black text-xs px-2 py-1 rounded shadow">
              Figma
            </span>
          </div>
          <div className="relative group">
            <FaReact />
            <span className="absolute bottom-7 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-white text-black text-xs px-2 py-1 rounded shadow">
              React.js
            </span>
          </div>
          <div className="relative group">
            <FaNodeJs />
            <span className="absolute bottom-7 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-white text-black text-xs px-2 py-1 rounded shadow">
              Node.js
            </span>
          </div>
          <div className="relative group">
            <SiExpress />
            <span className="absolute bottom-7 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-white text-black text-xs px-2 py-1 rounded shadow">
              Express.js
            </span>
          </div>
          <div className="relative group">
            <SiNextdotjs />
            <span className="absolute bottom-7 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-white text-black text-xs px-2 py-1 rounded shadow">
              Next.js
            </span>
          </div>
        </div>
      </div>

      {/* Hackathon Achievements with Hover Tooltips */}
      <div className="mt-4">
        <div className="text-xs text-center text-base-content space-y-2">
          <div className="relative group flex justify-center items-center gap-2">
            <span className="w-6 h-6 flex items-center justify-center text-xs font-bold bg-neutral text-neutral-content rounded-full">
              I
            </span>
            HackNiche
            {/* <span className="absolute bottom-7 opacity-0 group-hover:opacity-100 transition-opacity bg-white text-black text-xs px-2 py-1 rounded shadow">
              1st Place
            </span> */}
          </div>

          <div className="relative group flex justify-center items-center gap-2">
            <span className="w-6 h-6 flex items-center justify-center text-xs font-bold bg-neutral text-neutral-content rounded-full">
              II
            </span>
            CodeShastra
            {/* <span className="absolute bottom-7 opacity-0 group-hover:opacity-100 transition-opacity bg-white text-black text-xs px-2 py-1 rounded shadow">
              2nd Place
            </span> */}
          </div>

          <div className="relative group flex justify-center items-center gap-2">
            <span className="w-6 h-6 flex items-center justify-center text-xs font-bold bg-neutral text-neutral-content rounded-full">
              X
            </span>
            Synergy
            {/* <span className="absolute bottom-7 opacity-0 group-hover:opacity-100 transition-opacity bg-white text-black text-xs px-2 py-1 rounded shadow">
              Top 10
            </span> */}
          </div>
        </div>
      </div>

      {/* Add Button */}
      <motion.button
        className="btn btn-outline w-full mt-4 rounded-lg text-sm"
        whileHover={{ scale: 1.1 }}
      >
        Connect
      </motion.button>
    </motion.div>
  );
};

export default ProfileCard;
