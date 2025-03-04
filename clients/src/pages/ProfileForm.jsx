import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import ExperienceFields from "../components/ProfileForm/ExperienceFields";
import ProfilePictureUpload from "../components/ProfileForm/ProfilePictureUpload";
import RoleInput from "../components/ProfileForm/RoleInput";
import SelectionButtons from "../components/ProfileForm/SelectionButtons";
import SkillInput from "../components/ProfileForm/SkillInput";
import { useNavigate } from "react-router-dom";

const ProfileForm = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [year, setYear] = useState(1);
  const [department, setDepartment] = useState("IT");
  const [gender, setGender] = useState("Male");
  const [skills, setSkills] = useState([]);
  const [roles, setRoles] = useState([]);
  const [experience, setExperience] = useState([{ name: "", rank: "" }]);
  const [profilePic, setProfilePic] = useState(null);

  const years = [1, 2, 3, 4];
  const departments = ["IT", "CS", "AI/ML", "Civil", "Mech", "EXTC"];
  const genders = ["Male", "Female", "Prefer Not to Say"];
  const skillOptions = ["MongoDB", "Express", "Node", "React", "Next", "Figma"];
  const roleOptions = [
    "Frontend",
    "Backend",
    "Full Stack",
    "App Dev",
    "Presentation",
  ];

  // Fetch existing profile data if available
  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const userId = Cookies.get("userId");
        const token = Cookies.get("token");

        if (!userId || !token) {
          navigate("/login");
          return;
        }

        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/users/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        // If profile data exists, populate the form
        if (response.data) {
          const {
            year,
            department,
            gender,
            skills,
            roles,
            experience,
            profilePic,
          } = response.data;
          if (year) setYear(year);
          if (department) setDepartment(department);
          if (gender) setGender(gender);
          if (skills && skills.length) setSkills(skills);
          if (roles && roles.length) setRoles(roles);
          if (experience && experience.length) setExperience(experience);
          if (profilePic) setProfilePic(profilePic);
        }
      } catch (error) {
        console.error("Error fetching profile data:", error);
        // Don't set error for first-time users as they won't have profile data yet
        if (error.response && error.response.status !== 404) {
          setError("Failed to load profile data. Please try again.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, [navigate]);

  const handleSaveChanges = async () => {
    try {
      setSaving(true);
      setError("");

      const userId = Cookies.get("userId");
      const token = Cookies.get("token");

      if (!userId || !token) {
        navigate("/login");
        return;
      }

      const profileData = {
        year,
        department,
        gender,
        skills,
        roles,
        experience,
        profilePic,
      };

      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/users/update`,
        { ...profileData, userId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Profile pic", profilePic);
      navigate("/profile");
    } catch (error) {
      console.error("Error saving profile data:", error);
      setError("Failed to save profile data. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen w-full bg-base-300 flex justify-center items-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-base-300 flex justify-center items-center p-6">
      <div className="card bg-base-100 w-full max-w-3xl shadow-2xl p-6 rounded-xl">
        <h1 className="text-3xl font-bold text-center mb-6">
          Complete Your Profile
        </h1>

        {error && (
          <div className="alert alert-error mb-4">
            <p>{error}</p>
          </div>
        )}

        <ProfilePictureUpload
          profilePic={profilePic}
          setProfilePic={setProfilePic}
        />

        <form className="space-y-4">
          <SelectionButtons
            label="Year"
            options={years}
            selectedValue={year}
            setValue={setYear}
          />

          <SelectionButtons
            label="Gender"
            options={genders}
            selectedValue={gender}
            setValue={setGender}
          />

          <SelectionButtons
            label="Department"
            options={departments}
            selectedValue={department}
            setValue={setDepartment}
          />

          <SkillInput
            skills={skills}
            setSkills={setSkills}
            skillOptions={skillOptions}
          />

          <RoleInput
            roles={roles}
            setRoles={setRoles}
            roleOptions={roleOptions}
          />

          <ExperienceFields
            experience={experience}
            setExperience={setExperience}
          />

          <button
            type="button"
            className="btn btn-neutral w-full"
            onClick={handleSaveChanges}
            disabled={saving}
          >
            {saving ? (
              <span className="loading loading-spinner"></span>
            ) : (
              "Save Changes"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProfileForm;
