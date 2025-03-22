import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import toast, { Toaster } from "react-hot-toast";

const Login = () => {
  const [formData, setFormData] = useState({
    emailOrUsername: "",
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
        `${import.meta.env.VITE_BACKEND_URL}/api/users/login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }

      // ✅ Store JWT Token & User ID in Cookies
      Cookies.set("token", data.token, { expires: 1 });
      Cookies.set("userId", data.userId, { expires: 1 });

      toast.success("Login successful!");
      navigate("/main");
    } catch (error) {
      toast.error(error.message || "Something went wrong!");
    }
  };

  return (
    <div className="hero bg-base-300 min-h-screen">
      {/* <Toaster /> */}
      <div className="hero-content flex-col lg:flex-row-reverse gap-x-32">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Welcome Back!</h1>
          <p className="py-6">
            Connect with your teammates and join exciting projects. Log in to
            explore opportunities, collaborate, and build amazing solutions with
            like-minded individuals. Let’s get started!
          </p>
        </div>
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <form className="card-body" onSubmit={handleSubmit}>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Username or Email</span>
              </label>
              <input
                type="text"
                name="emailOrUsername"
                placeholder="Enter username or email"
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
                placeholder="Enter password"
                className="input input-bordered"
                required
                onChange={handleChange}
              />
            </div>
            <div className="form-control mt-6">
              <button className="btn btn-outline" type="submit">
                Log In
              </button>
            </div>
            <div className="text-center mt-4">
              <p className="text-sm">
                Don’t have an account?
                <a
                  href="/signup"
                  className="text-primary font-semibold link link-hover ml-1"
                >
                  Sign Up
                </a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
