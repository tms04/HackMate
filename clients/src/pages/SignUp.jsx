const SignUp = () => {
  return (
    <div className="hero bg-base-300 min-h-screen">
      <div className="hero-content flex-col lg:flex-row-reverse gap-x-32">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Find Your Perfect Team!</h1>
          <p className="py-6">
            Join a vibrant community of innovators and problem solvers. Whether you&#39;re looking for teammates 
            for a hackathon, college event, or project collaboration, our platform helps you connect with 
            like-minded individuals based on skills, experience, and availability. Sign up now and start building your dream team!
          </p>
        </div>
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <form className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Username</span>
              </label>
              <input type="text" placeholder="Username" className="input input-bordered" required />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input type="email" placeholder="Email" className="input input-bordered" required />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input type="password" placeholder="Password" className="input input-bordered" required />
              <label className="label">
                <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
              </label>
            </div>
            <div className="form-control mt-6">
              <button className="btn btn-outline">Sign Up</button>
            </div>
            <div className="text-center mt-4">
              <p className="text-sm">
                Already have an account? 
                <a href="/login" className="text-primary font-semibold link link-hover ml-1">
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
