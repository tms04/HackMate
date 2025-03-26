import { Link } from "react-router-dom";
import GooeyTextDemo from "./New";
import ColorSwitch from "../components/ColorSwitch";

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center 
                    bg-base-200 text-center p-6 sm:p-12">
      <ColorSwitch />

      {/* Heading */}
      <h1 className="text-2xl sm:text-5xl font-bold mb-4 sm:mb-6">
        Find the Perfect Team for Your Next Project!
      </h1>

      {/* Description - Hidden on small screens */}
      <p className="hidden sm:block text-lg max-w-2xl">
        Connect with like-minded individuals based on skills, interests, and
        availability. Whether it&lsquo;s a hackathon, startup, or research
        project, build your dream team today.
      </p>

      {/* Gooey Effect Component */}
      <GooeyTextDemo />

      {/* Get Started Button */}
      <Link to="/login">
        <button className="btn btn-outline mt-6 sm:mt-8 text-base sm:text-lg px-6 py-3">
          Get Started
        </button>
      </Link>
    </div>
  );
};

export default Home;
