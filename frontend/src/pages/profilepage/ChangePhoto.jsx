import React from "react";

export default function ChangePhoto({ profilePhoto, setProfilePhoto }) {
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setProfilePhoto(reader.result); // Update profile photo
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpload = () => {
    if (!profilePhoto) {
      alert("Please select an image first!");
      return;
    }
    alert("Profile photo updated successfully!");
  };

  const handleDelete = () => {
    setProfilePhoto(null); // Reset profile photo
    alert("Profile photo deleted successfully!");
  };

  return (
    <div className="space-y-4 p-4 bg-gray-950 rounded-3xl shadow-lg">
      <h2 className="text-3xl text-center font-semibold text-white mt-5 mb-6">
        Change Profile Photo
      </h2>
      <div className="flex flex-col items-center space-y-4">
        {/* Image preview container: size remains unchanged */}
        <div className="w-52 h-52 rounded-full bg-gray-800 flex items-center justify-center">
          {profilePhoto ? (
            <img
              src={profilePhoto}
              alt="Profile Preview"
              className="w-full h-full rounded-full object-cover"
            />
          ) : (
            <span className="text-gray-400">No Image</span>
          )}
        </div>
        {/* File input styled for dark mode */}
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="text-md bg-gray-700 border border-gray-600 rounded-lg p-2 text-white"
        />
        {/* Action buttons */}
        <div className="flex space-x-4">
          <button
            onClick={handleUpload}
            className="px-4 py-2 bg-green-500 text-white rounded-full hover:bg-green-600 transition"
          >
            Upload Photo
          </button>
          <button
            onClick={handleDelete}
            className="px-4 py-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition"
          >
            Delete Photo
          </button>
        </div>
      </div>
    </div>
  );
}
