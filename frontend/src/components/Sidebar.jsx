import React, { useEffect } from "react";
import {
  FaChevronRight,
  FaChevronLeft,
  FaChevronDown,
  FaChevronUp,
} from "react-icons/fa";

function Sidebar({
  isSidebarOpen,
  setIsSidebarOpen,
  selectedIngredients,
  handleRemoveIngredient,
  handleRemoveAll,
}) {
  // Automatically open the sidebar when an ingredient is selected
  useEffect(() => {
    if (selectedIngredients.length > 0) {
      setIsSidebarOpen(true);
    }
  }, [selectedIngredients, setIsSidebarOpen]);

  // Close the sidebar once "Remove All" is clicked
  const handleRemoveAllClick = () => {
    handleRemoveAll();
    setIsSidebarOpen(false);
  };

  // Optional logging
  useEffect(() => {
    console.log("Sidebar mounted");
    return () => console.log("Sidebar unmounted");
  }, []);

  useEffect(() => {
    console.log("Selected ingredients in Sidebar:", selectedIngredients);
  }, [selectedIngredients]);

  const handleRemoveIngredientClick = (ingredientIndex) => () => {
    handleRemoveIngredient(ingredientIndex);
  };

  return (
    <div className="relative">
      {/* Sidebar Container */}
      <div
        className={`
          fixed bottom-0 left-0 w-full h-64 md:h-full md:w-64 
          bg-gray-900 text-white border-t md:border-t-0 md:border-r border-blue-700 z-20
          overflow-y-auto md:overflow-x-hidden transition-transform duration-500
          ${
            isSidebarOpen
              ? "translate-y-0 md:translate-x-0"
              : "translate-y-full md:-translate-x-full"
          }
        `}
      >
        <h2 className="p-4 text-xl font-semibold border-b border-gray-700">
          Chosen Ingredients ({selectedIngredients.length})
        </h2>
        <ul>
          {selectedIngredients.map((ingredient, index) => (
            <li
              key={index}
              className="flex justify-between items-center p-3 border-b border-gray-800 hover:bg-gray-800 transition-colors"
            >
              <span>{ingredient}</span>
              <button
                onClick={handleRemoveIngredientClick(index)}
                className="text-red-400 hover:text-red-500 transition-colors"
              >
                X
              </button>
            </li>
          ))}
        </ul>
        {selectedIngredients.length > 0 && (
          <button
            className="bg-red-600 hover:bg-red-500 text-white w-full m-4 py-2 px-4 rounded-lg transition-transform hover:scale-105"
            onClick={handleRemoveAllClick}
          >
            Remove All
          </button>
        )}
      </div>

      {/* Desktop Toggle Button */}
      <div className="hidden md:block fixed left-4 bottom-16 transition-all duration-500 z-20">
        <button
          className="bg-green-500 hover:bg-green-600 text-white rounded-full p-3 shadow-xl transition-all duration-300"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          {isSidebarOpen ? <FaChevronLeft /> : <FaChevronRight />}
        </button>
      </div>

      {/* Mobile Toggle Button */}
      <div
        className={`
          block md:hidden fixed left-1/2 transform -translate-x-1/2 transition-all duration-500 z-20
          ${isSidebarOpen ? "bottom-64" : "bottom-10"}
        `}
      >
        <button
          className="bg-green-500 hover:bg-green-600 text-white rounded-full p-3 shadow-xl transition-all duration-300"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          {isSidebarOpen ? <FaChevronDown /> : <FaChevronUp />}
        </button>
      </div>
    </div>
  );
}

export default Sidebar;
