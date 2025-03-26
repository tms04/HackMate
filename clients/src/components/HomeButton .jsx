import { Home } from "lucide-react";
import { motion } from "framer-motion";

const HomeButton = () => {
  return (
    <motion.button
      className="relative flex items-center gap-2 px-6 py-3 rounded-lg bg-gray-900 text-green-400 font-semibold text-lg border border-green-400 shadow-lg transition-all duration-300
        hover:text-black hover:bg-green-400 hover:shadow-green-500/50 hover:scale-105"
      whileHover={{ scale: 1.1 }}
    >
      <Home className="w-6 h-6" />
      Home
      <span className="absolute inset-0 bg-green-400 opacity-20 blur-md -z-10"></span>
    </motion.button>
  );
};

export default HomeButton;
