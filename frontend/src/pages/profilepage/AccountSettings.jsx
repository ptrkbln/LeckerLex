import React, { useState } from "react";

export default function AccountSettings() {
  const [username, setUsername] = useState("Sarah Miller");
  const [email, setEmail] = useState("sarah.miller@example.com");
  const [country, setCountry] = useState("Germany");

  const handleSaveChanges = () => {
    alert("Changes have been saved.");
    // Insert API call or other logic to persist changes here.
  };

  return (
    <div className="bg-gray-950 flex items-center rounded-3xl justify-center py-10 px-4">
      {/* Form Card */}
      <div className="w-full max-w-lg rounded-3xl p-10">
        <h2 className="text-3xl font-bold text-center text-gray-200 mb-8">
          Account Settings
        </h2>
        <div className="space-y-6">
          {/* Username Field */}
          <div className="flex flex-col">
            <label className="text-lg font-medium text-gray-300">
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="mt-2 px-4 py-3 border border-gray-600 rounded-md bg-gray-800 text-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
            />
          </div>
          {/* Email Field */}
          <div className="flex flex-col">
            <label className="text-lg font-medium text-gray-300">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-2 px-4 py-3 border border-gray-600 rounded-md bg-gray-800 text-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
            />
          </div>
        </div>
        <button
          onClick={handleSaveChanges}
          className="mt-8 w-full px-6 py-3 bg-green-500 text-white font-semibold rounded-md hover:bg-green-600 transition"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
}
