/* eslint-disable @typescript-eslint/no-explicit-any */
import { useAuth } from "@/Hooks/useAuth";
import useScrollUp from "@/Hooks/useScrollUp";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import { FiEye, FiEyeOff } from "react-icons/fi";

interface LoginFormData {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const { logIn, googleSignIn, facebookSignIn, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [showPassword, setShowPassword] = useState(false);

  useScrollUp();

  const from = location.state?.from?.pathname || "/";

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<LoginFormData>();

  const showSuccessAlert = (message: string) => {
    Swal.fire({
      icon: "success",
      title: "Success",
      text: message,
      confirmButtonColor: "#4f46e5",
    });
  };

  const showErrorAlert = (message: string) => {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: message,
      confirmButtonColor: "#4f46e5",
    });
  };

  const onSubmit = async (data: LoginFormData) => {
    try {
      await logIn(data.email, data.password);
      showSuccessAlert("Login successful!");
      navigate(from, { replace: true });
    } catch (error: any) {
      const msg = error.message || "Failed to login. Please try again.";
      setError("root", { type: "manual", message: msg });
      showErrorAlert(msg);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await googleSignIn();
      showSuccessAlert("Logged in successfully with Google!");
      navigate(from, { replace: true });
    } catch (error: any) {
      const msg = error.message || "Google login failed. Please try again.";
      setError("root", { type: "manual", message: msg });
      showErrorAlert(msg);
    }
  };

  const handleFacebookLogin = async () => {
    try {
      await facebookSignIn();
      showSuccessAlert("Logged in successfully with Facebook!");
      navigate(from, { replace: true });
    } catch (error: any) {
      const msg = error.message || "Facebook login failed. Please try again.";
      setError("root", { type: "manual", message: msg });
      showErrorAlert(msg);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          {/* Header */}
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Welcome Back
            </h2>
            <p className="text-gray-600">Sign in to your Orivo account</p>
          </div>

          {/* Error Message */}
          {errors.root && (
            <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-600 text-sm">{errors.root.message}</p>
            </div>
          )}

          {/* Login Form */}
          <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address",
                  },
                })}
                type="email"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter your email"
              />
              {errors.email && (
                <p className="mt-1 text-red-500 text-sm">{errors.email.message}</p>
              )}
            </div>

            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                {...register("password", {
                  required: "Password is required",
                  minLength: { value: 6, message: "Password must be at least 6 characters" },
                })}
                type={showPassword ? "text" : "password"}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-10"
                placeholder="Enter your password"
              />
              <button
                type="button"
                className="absolute right-3 top-8 text-gray-500"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
              </button>
              {errors.password && (
                <p className="mt-1 text-red-500 text-sm">{errors.password.message}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-500 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors duration-200"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          {/* Divider */}
          <div className="mt-6 relative flex justify-center text-sm mb-4">
            <span className="px-2 bg-white text-gray-500">Or continue with</span>
          </div>

          {/* Social Login Buttons */}
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={handleGoogleLogin}
              disabled={loading}
              className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
            >
              Google
            </button>
            <button
              type="button"
              onClick={handleFacebookLogin}
              disabled={loading}
              className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
            >
              Facebook
            </button>
          </div>

          {/* Sign Up Link */}
          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="font-medium text-blue-500 hover:text-blue-600 transition-colors"
              >
                Sign up here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
