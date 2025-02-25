import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Toggle from "./components/Toggle";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import MainPage from "./pages/MainPage";
import Demo from "./pages/Demo";
import ProfileForm from "./pages/ProfileForm";

export default function App() {
  return (
    <Router>
      <Toggle/>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/signup" element={<SignUp/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/main" element={<MainPage/>} />
        <Route path="/demo" element={<Demo/>} />
        <Route path="/userdetails" element={<ProfileForm/>} />
      </Routes>
    </Router>
  );
}
