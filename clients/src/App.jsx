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
            <Route path="/main" element={<MainPage />} />
            <Route path="/demo" element={<Demo />} />
            <Route path="/userdetails" element={<ProfileForm />} />
            <Route path="/newteam" element={<TeamForm />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/myteams" element={<MyTeams />} />
            <Route path="/createdteam" element={<CreatedTeamPage />} />
            <Route path="/joinedteam" element={<JoinedTeamPage />} />
            <Route path="/profile" element={<ProfilePage />} />
          </Route>
        </Routes>
      </ClerkLoaded>
    </Router>
  );
}
