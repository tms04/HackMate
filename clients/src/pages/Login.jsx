
const Login = () => {
    return (
      <div className="hero bg-base-300 min-h-screen">
        <div className="hero-content flex-col lg:flex-row-reverse gap-x-32">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold">Welcome Back!</h1>
            <p className="py-6">
              Connect with your teammates and join exciting projects. Log in to explore opportunities, collaborate, and build 
              amazing solutions with like-minded individuals. Let&lsquo;s get started!
            </p>
          </div>
          <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
            <form className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Username or Email</span>
                </label>
                <input type="text" placeholder="Enter username or email" className="input input-bordered" required />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input type="password" placeholder="Enter password" className="input input-bordered" required />
                <label className="label">
                  <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                </label>
              </div>
              <div className="form-control mt-6">
                <button className="btn btn-outline">Log In</button>
              </div>
              <div className="text-center mt-4">
                <p className="text-sm">
                  Don&lsquo;t have an account? 
                  <a href="/signup" className="text-primary font-semibold link link-hover ml-1">
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
  