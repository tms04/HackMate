import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Toggle from "./components/Toggle";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import MainPage from "./pages/MainPage";
import Demo from "./pages/Demo";
import ProfileForm from "./pages/ProfileForm";
import TeamForm from "./pages/TeamForm";
import ProtectedRoute from "./components/ProtectedRoutes.jsx"; // Import ProtectedRoute
import Notifications from "./pages/Notifications.jsx";
import MyTeams from "./pages/MyTeams.jsx";
import CreatedTeamPage from "./pages/CreatedTeam.jsx";
import JoinedTeamPage from "./pages/JoinedTeam.jsx";
import ProfilePage from "./pages/ProfilePage";
import { Toaster } from "react-hot-toast";
import { ClerkLoaded, ClerkLoading } from "@clerk/clerk-react";
import OAuthCallbackHandler from "./components/OAuthCallbackHandler.jsx";
import { FiMenu } from "react-icons/fi";
import DrawerSideBar from "./components/DrawerSideBar";

// Layout for authenticated pages with drawer
const AuthenticatedLayout = ({ children }) => {
  return (
    <div className="drawer">
      <input id="my-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content bg-base-200 min-h-screen">
        <label
          htmlFor="my-drawer"
          className="btn btn-circle btn-neutral fixed top-4 left-4 z-50 transition-opacity duration-300 drawer-button"
        >
          <FiMenu size={24} />
        </label>
        {children}
      </div>
      <DrawerSideBar />
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

export default function App() {
  return (
    <Router>
      <Toaster position="top-center" />
      <Toggle />
      <ClerkLoading>
        <div className="flex justify-center items-center min-h-screen bg-base-200">
          <div className="loading loading-spinner loading-lg"></div>
        </div>
      </ClerkLoading>
      <ClerkLoaded>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          
          {/* OAuth Callback Route - outside protected routes */}
          <Route path="/oauth-callback-handler" element={<OAuthCallbackHandler />} />
          
          {/* Protected Routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/main" element={
              <AuthenticatedLayout>
                <MainPage />
              </AuthenticatedLayout>
            } />
            <Route path="/demo" element={
              <AuthenticatedLayout>
                <Demo />
              </AuthenticatedLayout>
            } />
            <Route path="/userdetails" element={
              <AuthenticatedLayout>
                <ProfileForm />
              </AuthenticatedLayout>
            } />
            <Route path="/newteam" element={
              <AuthenticatedLayout>
                <TeamForm />
              </AuthenticatedLayout>
            } />
            <Route path="/notifications" element={
              <AuthenticatedLayout>
                <Notifications />
              </AuthenticatedLayout>
            } />
            <Route path="/myteams" element={
              <AuthenticatedLayout>
                <MyTeams />
              </AuthenticatedLayout>
            } />
            <Route path="/createdteam" element={
              <AuthenticatedLayout>
                <CreatedTeamPage />
              </AuthenticatedLayout>
            } />
            <Route path="/joinedteam" element={
              <AuthenticatedLayout>
                <JoinedTeamPage />
              </AuthenticatedLayout>
            } />
            <Route path="/profile" element={
              <AuthenticatedLayout>
                <ProfilePage />
              </AuthenticatedLayout>
            } />
          </Route>
        </Routes>
      </ClerkLoaded>
    </Router>
  );
}
