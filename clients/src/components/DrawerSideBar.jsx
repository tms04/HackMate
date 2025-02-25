import { FiEdit, FiMail, FiUsers, FiLogOut } from "react-icons/fi";

const DrawerSideBar = () => {
  return (
    <div className="drawer-side">
      <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>

      <div className="menu bg-base-100 text-base-content min-h-full w-80 flex flex-col shadow-lg p-0">
        
        {/* User Profile Section - Full Width */}
        <div className="w-full px-5 py-4 bg-neutral text-white flex items-center justify-between">
          <span className="text-lg font-semibold tracking-wide">Saurabhkumar!</span>
          <button className="flex items-center gap-2 text-white hover:text-gray-300 transition-all">
            <FiEdit size={18} />
            <span className="text-sm">Edit</span>
          </button>
        </div>

        {/* Navigation Options */}
        <div className="flex flex-col flex-grow p-5 gap-4">
          <button className="btn w-full h-32 bg-amber-500 hover:bg-amber-600 text-white text-lg font-medium flex items-center justify-center gap-3 rounded-xl shadow-md transition-all">
            <FiUsers size={26} />
            Create Team
          </button>
          <button className="btn w-full h-32 bg-sky-500 hover:bg-sky-600 text-white text-lg font-medium flex items-center justify-center gap-3 rounded-xl shadow-md transition-all">
            <FiMail size={26} />
            Requests
          </button>
        </div>

        {/* Logout Button (Sticky at Bottom) */}
        <div className="p-5 mt-auto">
          <button className="btn w-full bg-red-600 hover:bg-red-700 text-white flex items-center justify-center gap-2 text-lg font-semibold rounded-xl shadow-md transition-all">
            <FiLogOut size={22} />
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default DrawerSideBar;
