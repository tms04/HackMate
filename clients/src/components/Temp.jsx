import { FiMenu } from "react-icons/fi";
import DrawerSideBar from "./DrawerSideBar";
import { Outlet } from "react-router-dom";

const MainPage = () => {
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
        <Outlet/>
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
