import { Link } from "react-router-dom";
import loginImg from "../assets/images/login.png";
const Login = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 h-screen">
      <div className="flex items-center justify-center">
        <form className="w-full max-w-sm px-6">
          <h2 className="text-3xl font-bold mb-8">Login</h2>
          {/* Email input */}
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 font-medium mb-2"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
            />
          </div>
          {/* Password input */}
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-gray-700 font-medium mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
            />
          </div>
          {/* Button */}
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-blue-500 text-white rounded-md py-2 px-4 hover:bg-blue-600"
            >
              Login
            </button>
            <Link to={"/"}>
              <span className="text-blue-500 cursor-pointer font-medium">
                Back to home
              </span>
            </Link>
          </div>
          <div className="mt-6">
            <Link to="/signup">
              <span className="mt-6">Dont have an account?</span>
            </Link>
          </div>
        </form>
      </div>
      {/* side image */}
      <div className="hidden md:block">
        <img
          src={loginImg}
          alt="Login Image"
          className="h-full w-full object-cover"
        />
      </div>
    </div>
  );
};

export default Login;
