import React, { useState } from "react";

export default function ChangePassword() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleChangePassword = () => {
    if (newPassword !== confirmPassword) {
      alert("New Password and Confirm Password do not match!");
      return;
    }
    alert("Password successfully updated!");
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  return (
    <div className="flex items-center justify-center rounded-3xl py-10">
      {/* Form Card */}
      <div className="w-full max-w-lg bg-gray-950 rounded-3xl shadow-2xl p-10">
        <h2 className="text-3xl font-bold text-center text-gray-200 mb-8">
          Change Password
        </h2>
        <div className="space-y-6">
          {/* Current Password Field */}
          <div className="flex flex-col">
            <label
              htmlFor="currentPassword"
              className="text-lg font-medium text-gray-300"
            >
              Current Password
            </label>
            <input
              id="currentPassword"
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="mt-2 px-4 py-3 border border-gray-600 rounded-md bg-gray-800 text-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
            />
          </div>
          {/* New Password Field */}
          <div className="flex flex-col">
            <label
              htmlFor="newPassword"
              className="text-lg font-medium text-gray-300"
            >
              New Password
            </label>
            <input
              id="newPassword"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="mt-2 px-4 py-3 border border-gray-600 rounded-md bg-gray-800 text-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
            />
          </div>
          {/* Confirm Password Field */}
          <div className="flex flex-col">
            <label
              htmlFor="confirmPassword"
              className="text-lg font-medium text-gray-300"
            >
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="mt-2 px-4 py-3 border border-gray-600 rounded-md bg-gray-800 text-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
            />
          </div>
        </div>
        <button
          onClick={handleChangePassword}
          className="mt-8 w-full px-6 py-3 bg-green-500 text-white font-semibold rounded-md hover:bg-green-600 transition"
        >
          Update Password
        </button>
      </div>
    </div>
  );
}
