import { Link, useNavigate } from "react-router-dom";
import signupimg from "../assets/images/signup.png";
import { useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { createUser } from "../redux/features/auth/authSlice";
import ErrorElement from "../components/ui/ErrorElement";
import { useEffect } from "react";

interface SignupFormInputs {
  email: string;
  password: string;
  confirmPassword: string;
}

const Signup = () => {
  const { user, isLoading, isError, error } = useAppSelector(
    (state) => state.auth
  );
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm<SignupFormInputs>();

  useEffect(() => {
    if (isError) {
      reset();
    }
    if (!isLoading && !isError && user.email) {
      navigate("/")
    }
  }, [isError, reset, isLoading, user, navigate]);

  const onSubmit = (data: SignupFormInputs) => {
    const { confirmPassword, ...others } = data;
    dispatch(createUser(others));
  };
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 h-screen">
      <div className="flex items-center justify-center">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full max-w-sm px-6"
        >
          <h2 className="text-3xl font-bold mb-8">SignUp</h2>
          {/* Email input */}
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 font-medium mb-2"
            >
              Email
            </label>
            <input
              type="text"
              id="email"
              className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
              {...register("email", { required: "Email is required" })}
            />
            {errors.email && <p>{errors.email.message}</p>}
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
              {...register("password", { required: "Password is required" })}
            />
            {errors.password && <p>{errors.password.message}</p>}
          </div>
          {/* Confirm password input */}
          <div className="mb-6">
            <label
              htmlFor="confirmPassword"
              className="block text-gray-700 font-medium mb-2"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Re-Enter your password"
              {...register("confirmPassword", {
                required: "Confirm password is required",
                validate: (val: string) => {
                  if (watch("password") != val) {
                    return "Your passwords do no match";
                  }
                },
              })}
            />
            {errors.confirmPassword && <p>{errors.confirmPassword.message}</p>}
          </div>
          {isError && error && <ErrorElement message={error} />}
          {/* Button */}
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-blue-500 text-white rounded-md py-2 px-4 hover:bg-blue-600"
            >
              Sign Up
            </button>
            <Link to={"/"}>
              <span className="text-blue-500 cursor-pointer font-medium">
                Back to home
              </span>
            </Link>
          </div>
          <div className="mt-6">
            <Link to="/login">
              <span>Already have have an account?</span>
            </Link>
          </div>
        </form>
      </div>
      {/* Side Image */}
      <div className="hidden md:block">
        <img
          src={signupimg}
          alt="Login Image"
          className="h-full w-full object-cover"
        />
      </div>
    </div>
  );
};

export default Signup;
