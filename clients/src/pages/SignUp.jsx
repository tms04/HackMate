import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import toast, { Toaster } from "react-hot-toast";

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: "", // ✅ Added Full Name
    username: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/users/register`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Registration failed");
      }

      // ✅ Store JWT Token in Cookies
      Cookies.set("token", data.token, { expires: 1 }); // Token expires in 1 day

      toast.success("User registered successfully!");
      navigate("/login"); // ✅ Redirect to /main after registration
    } catch (error) {
      toast.error(error.message || "Something went wrong!");
    }
  };

  return (
    <div className="hero bg-base-300 min-h-screen">
      <Toaster />
      <div className="hero-content flex-col lg:flex-row-reverse gap-x-32">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Find Your Perfect Team!</h1>
          <p className="py-6">
            Join a vibrant community of innovators and problem solvers. Whether
            you are looking for teammates for a hackathon, college event, or
            project collaboration, our platform helps you connect with
            like-minded individuals based on skills, experience, and
            availability. Sign up now and start building your dream team!
          </p>
        </div>
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <form className="card-body" onSubmit={handleSubmit}>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Full Name</span>{" "}
                {/* ✅ Added Full Name Field */}
              </label>
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                className="input input-bordered"
                required
                onChange={handleChange}
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Username</span>
              </label>
              <input
                type="text"
                name="username"
                placeholder="Username"
                className="input input-bordered"
                required
                onChange={handleChange}
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                name="email"
                placeholder="Email"
                className="input input-bordered"
                required
                onChange={handleChange}
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                name="password"
                placeholder="Password"
                className="input input-bordered"
                required
                onChange={handleChange}
              />
            </div>
            <div className="form-control mt-6">
              <button className="btn btn-outline" type="submit">
                Sign Up
              </button>
            </div>
            <div className="text-center mt-4">
              <p className="text-sm">
                Already have an account?
                <a
                  href="/login"
                  className="text-primary font-semibold link link-hover ml-1"
                >
                  Log in
                </a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
