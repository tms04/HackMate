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

export default function App() {
  return (
    <Router>
      <Toggle />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />

        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/main" element={<MainPage />} />
          <Route path="/demo" element={<Demo />} />
          <Route path="/userdetails" element={<ProfileForm />} />
          <Route path="/newteam" element={<TeamForm />} />
          <Route path="/notifications" element={<Notifications/>} />
          <Route path="/myteams" element={<MyTeams/>} />
          <Route path="/createdteam" element={<CreatedTeamPage/>} />
          <Route path="/joinedteam" element={<JoinedTeamPage/>} />


          <Route path="/profile" element={<ProfilePage />} />

          
        </Route>
      </Routes>
    </Router>
  );
}
