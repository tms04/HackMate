import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import ExperienceFields from "../components/ProfileForm/ExperienceFields";
import ProfilePictureUpload from "../components/ProfileForm/ProfilePictureUpload";
import RoleInput from "../components/ProfileForm/RoleInput";
import SelectionButtons from "../components/ProfileForm/SelectionButtons";
import SkillInput from "../components/ProfileForm/SkillInput";
import ResumeLink from "../components/ProfileForm/ResumeLink";
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
  const [experience, setExperience] = useState([]);
  const [profilePic, setProfilePic] = useState(null);
  const [name, setName] = useState("");
  const [resumeLink, setResumeLink] = useState("");

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

        if (response.data) {
          const {
            name,
            year,
            department,
            gender,
            skills,
            roles,
            experience,
            profilePic,
            resumeLink,
          } = response.data;
          if (name) setName(name);
          if (year) setYear(year);
          if (department) setDepartment(department);
          if (gender) setGender(gender);
          if (skills?.length) setSkills(skills);
          if (roles?.length) setRoles(roles);
          if (experience?.length) setExperience(experience);
          if (profilePic) setProfilePic(profilePic);
          if (resumeLink) setResumeLink(resumeLink);
        }
      } catch (error) {
        console.error("Error fetching profile data:", error);
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
        name,
        year,
        department,
        gender,
        skills,
        roles,
        experience,
        profilePic,
        resumeLink,
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

      navigate("/main");
    } catch (error) {
      console.error("Error saving profile data:", error);
      setError("Failed to save profile data. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteProfile = async () => {
    try {
      console.log("Delete button clicked");

      const userId = Cookies.get("userId");
      const token = Cookies.get("token");

      if (!userId || !token) {
        console.log("No userId or token found, redirecting to login");
        navigate("/login");
        return;
      }

      console.log("Deleting profile for user:", userId);
      console.log("Deleting profile for user:", token);

      await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/api/users/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Profile deleted successfully");

      Cookies.remove("userId");
      Cookies.remove("token");

      navigate("/signup");
    } catch (error) {
      console.error("Error deleting profile:", error.response || error);
      setError("Failed to delete profile. Please try again.");
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
          name={name}
          setName={setName}
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

          <ResumeLink
            resumeLink={resumeLink}
            setResumeLink={setResumeLink}
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

          {/* Delete Profile Button */}
          <button
            type="button"
            className="btn btn-error w-full mt-2"
            onClick={() =>
              document.getElementById("delete_profile_modal").showModal()
            }
          >
            Delete My Profile
          </button>
        </form>

        {/* Delete Confirmation Modal */}
        <dialog id="delete_profile_modal" className="modal">
          <div className="modal-box bg-base-100 dark:bg-neutral-800">
            <h3 className="font-bold text-lg text-base-content">
              Confirm Deletion
            </h3>
            <p className="py-4 text-base-content">
              Are you sure you want to <b>delete your profile</b>? This action
              cannot be undone.
            </p>
            <div className="modal-action">
              <button
                className="btn btn-outline"
                onClick={() =>
                  document.getElementById("delete_profile_modal").close()
                }
              >
                Cancel
              </button>
              <button
                className="btn btn-error"
                onClick={async () => {
                  await handleDeleteProfile();
                }}
              >
                Confirm
              </button>
            </div>
          </div>
        </dialog>
      </div>
    </div>
  );
};

export default ProfileForm;
