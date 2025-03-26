import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

const BackButton = () => {
  const navigate = useNavigate();

  return (
    <button
      className="fixed top-6 left-4 w-12 h-12 flex items-center justify-center rounded-full bg-gray-800 text-white shadow-md transition 
                 hover:bg-gray-700 hover:shadow-lg"
      onClick={() => navigate(-1)} // Goes back to the previous page
    >
      <FaArrowLeft className="w-6 h-6" />
    </button>
  );
};

export default BackButton;
