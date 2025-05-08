/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Toggle from "./components/Toggle";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import MainPage from "./pages/MainPage";
import Demo from "./pages/Demo";
import ProfileForm from "./pages/ProfileForm";
import TeamForm from "./pages/TeamForm";
import ProtectedRoute from "./components/ProtectedRoutes.jsx";
import Notifications from "./pages/Notifications.jsx";
import MyTeams from "./pages/MyTeams.jsx";
import CreatedTeamPage from "./pages/CreatedTeam.jsx";
import JoinedTeamPage from "./pages/JoinedTeam.jsx";
import ProfilePage from "./pages/ProfilePage";
import { Toaster } from "react-hot-toast";
import { FiMenu } from "react-icons/fi";
import DrawerSideBar from "./components/DrawerSideBar";
import SavedProfiles from "./pages/SavedProfiles.jsx";

const AuthenticatedLayout = ({ children }) => {
  return (
    <div className="drawer">
      <input id="my-drawer" type="checkbox" className="drawer-toggle" />

      {/* Content Area */}
      <div className="drawer-content bg-base-200 min-h-screen relative">
        {/* Drawer Toggle Button */}
        <label
          htmlFor="my-drawer"
          className="btn btn-circle btn-neutral fixed top-4 left-4 z-50 transition-opacity duration-300 drawer-button"
        >
          <FiMenu size={24} />
        </label>

        {/* Toggle - Automatically hides when sidebar opens */}
        <div id="toggle-container">
          <Toggle />
        </div>

        {/* Protected Page Content */}
        {children}
      </div>

      {/* Sidebar Drawer */}
      <DrawerSideBar />

      {/* Hide Toggle When Drawer is Open */}
      <style>
        {`
          #my-drawer:checked ~ .drawer-content .drawer-button {
            opacity: 0;
            pointer-events: none;
          }

          #my-drawer:checked ~ .drawer-content #toggle-container {
            display: none; /* Hides the toggle when the sidebar opens */
          }
        `}
      </style>
    </div>
  );
};

export default function App() {
  return (
    <Router>
      <Toaster position="top-center" />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />

        <Route element={<ProtectedRoute />}>
        {/* <Toggle/> */}
          <Route path="/main" element={<AuthenticatedLayout><MainPage /></AuthenticatedLayout>} />
          <Route path="/demo" element={<AuthenticatedLayout><Demo /></AuthenticatedLayout>} />
          <Route path="/userdetails" element={<AuthenticatedLayout><ProfileForm /></AuthenticatedLayout>} />
          <Route path="/newteam" element={<AuthenticatedLayout><TeamForm /></AuthenticatedLayout>} />
          <Route path="/notifications" element={<AuthenticatedLayout><Notifications /></AuthenticatedLayout>} />
          <Route path="/myteams" element={<AuthenticatedLayout><MyTeams /></AuthenticatedLayout>} />
          <Route path="/createdteam/:teamId" element={<AuthenticatedLayout><CreatedTeamPage /></AuthenticatedLayout>} />
          <Route path="/joinedteam/:teamId" element={<AuthenticatedLayout><JoinedTeamPage /></AuthenticatedLayout>} />
          <Route path="/profile" element={<AuthenticatedLayout><ProfilePage /></AuthenticatedLayout>} />
          <Route path="/savedprofiles" element={<AuthenticatedLayout><SavedProfiles /></AuthenticatedLayout>} />
        </Route>
      </Routes>
    </Router>
  );
}