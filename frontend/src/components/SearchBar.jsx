import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";

function SearchBar({
  searchText,
  setSearchText,
  handleSearch,
  handleAddIngredient,
}) {
  const [placeholder, setPlaceholder] = useState(
    "Enter ingredients, separated by comma..."
  );

  // Handle input changes
  const handleInputChange = (e) => {
    const newSearchText = e.target.value;
    setSearchText(newSearchText);

    // If a comma is detected, split and add ingredients
    if (newSearchText.includes(",")) {
      const ingredientsToAdd = searchText
        .split(",")
        .map((ingredient) =>
          ingredient
            .trim()
            .toLowerCase()
            .replace(/^\w/, (c) => c.toUpperCase())
        )
        .filter((ingredient) => ingredient); // Remove empty strings

      handleAddIngredient(ingredientsToAdd);
      setSearchText("");
    }
  };

  return (
    <div className="text-center mb-4 px-4 mt-6">
      <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-3xl text-orange-50 font-medium sm:m-4">
        Cook with <span className="text-green-600">What You've Got 🥗</span>
      </h2>
      <div className="mt-8 flex justify-center items-center sticky top-0">
        <div className="relative w-full max-w-sm sm:mb-6">
          <input
            id="ingredient-search"
            type="text"
            className="w-full p-2 rounded-full transition font-medium "
            placeholder={placeholder}
            value={searchText}
            onChange={handleInputChange}
            onFocus={() => setPlaceholder("")}
            onBlur={() =>
              setPlaceholder("Enter ingredients, separated by comma...")
            }
            aria-label="Search for recipes by ingredients"
          />
          <button
            onClick={handleSearch}
            aria-label="Search"
            className="absolute right-0 top-0 h-full px-3 bg-green-500 font-medium text-white rounded-full hover:bg-green-600 hover:scale-105 transition duration-300 group"
          >
            <span className="group-hover:hidden">
              <FaSearch />
            </span>
            <span className="hidden group-hover:inline">Search</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default SearchBar;
