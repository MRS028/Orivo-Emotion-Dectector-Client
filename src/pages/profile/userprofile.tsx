/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { useAuth } from "@/Hooks/useAuth";
import useScrollUp from "@/Hooks/useScrollUp";
import Swal from "sweetalert2";

const Profile: React.FC = () => {
  const { user, updateUserProfile, logOut } = useAuth();
  const [name, setName] = useState(user?.displayName || "");
  const [loading, setLoading] = useState(false);

  useScrollUp();

  const handleUpdateProfile = async () => {
    if (!name.trim()) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Name cannot be empty!",
        confirmButtonColor: "#4f46e5",
      });
      return;
    }

    try {
      setLoading(true);
      await updateUserProfile(name, user?.photoURL || "");
      Swal.fire({
        icon: "success",
        title: "Updated!",
        text: "Your profile has been updated successfully.",
        confirmButtonColor: "#4f46e5",
      });
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.message || "Failed to update profile. Try again.",
        confirmButtonColor: "#4f46e5",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await logOut();
      Swal.fire({
        icon: "success",
        title: "Logged Out",
        text: "You have been logged out successfully.",
        confirmButtonColor: "#4f46e5",
      });
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.message || "Failed to log out. Try again.",
        confirmButtonColor: "#4f46e5",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="text-center mb-6">
            <h2 className="text-3xl font-bold text-gray-900">Your Profile</h2>
            <p className="text-gray-600">Manage your account information</p>
          </div>

          {/* Profile Picture */}
          {user?.photoURL && (
            <div className="flex justify-center mb-6">
              <img
                src={user.photoURL}
                alt="Profile"
                className="w-24 h-24 rounded-full object-cover border-2 border-blue-500"
              />
            </div>
          )}

          {/* Display Name */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter your full name"
            />
          </div>

          {/* Email */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              value={user?.email || ""}
              disabled
              className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed"
            />
          </div>

          {/* Buttons */}
          <div className="space-y-3">
            <button
              onClick={handleUpdateProfile}
              disabled={loading}
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors duration-200"
            >
              {loading ? "Updating..." : "Update Profile"}
            </button>
            <button
              onClick={handleLogout}
              className="w-full bg-red-500 text-white py-2 px-4 rounded-lg font-medium hover:bg-red-600 transition-colors duration-200"
            >
              Log Out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;

