import { RecipeContext } from "../context/RecipeContext";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import shoppingCartImage from "../assets/images/shoppingcart.webp";

function MyShoppingList() {
  const [showSaveButton, setShowSaveButton] = useState(false);
  const [showAddIngredient, setShowAddIngredient] = useState(false);
  const [shoppingList, setShoppingList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [purchasedItems, setPurchasedItems] = useState([]);
  const [newIngredient, setNewIngredient] = useState("");
  const [notification, setNotification] = useState("");

  // Fetch shopping list on mount
  useEffect(() => {
    const getShoppingList = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          "http://localhost:3000/users/shoppinglist",
          {
            credentials: "include",
          }
        );
        if (!response.ok) {
          setError("Failed to fetch shopping list.");
        }
        const result = await response.json();
        console.log(result);
        setShoppingList(result);
      } catch (error) {
        console.log("Error while updating shopping list:", error);
        setError(error.msg);
      } finally {
        setLoading(false);
      }
    };

    getShoppingList();
  }, []);

  // Save the updated shopping list to the backend
  const saveShoppingList = async (updatedList) => {
    try {
      const response = await fetch(
        "http://localhost:3000/users/update-shoppinglist",
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            shoppingList: updatedList,
            action: "replace",
          }),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to update shopping list.");
      }
      const result = await response.json();
      console.log("Shopping list saved:", result);
      setShowSaveButton(false);
    } catch (error) {
      console.error("Error saving shopping list:", error);
      setError("Failed to save shopping list. Please try again.");
    }
  };

  // Loading state UI
  if (loading) {
    return (
      <p className="min-h-screen flex items-center justify-center text-md font-semibold text-gray-200">
        Loading shopping list...
      </p>
    );
  }

  // Error state UI
  if (error) {
    return (
      <p className="min-h-screen flex items-center justify-center text-md font-semibold text-gray-200">
        Error: {error}
      </p>
    );
  }

  // Toggle purchased status on item click
  const handleIngredientChoise = (name) => {
    setPurchasedItems((prev) =>
      prev.includes(name)
        ? prev.filter((item) => item !== name)
        : [...prev, name]
    );
    setShowSaveButton(true);
  };

  // Mark all items as purchased
  const markAllAsPurchased = () => {
    setPurchasedItems(shoppingList.map((item) => item));
    setShowSaveButton(true);
  };

  // Save and remove all items
  const handleSaveAndRemoveAll = () => {
    saveShoppingList([]); // Save an empty shopping list
    setShoppingList([]);
    setPurchasedItems([]);
    setShowSaveButton(false);
  };

  const handleAddIngredientClick = () => {
    setShowAddIngredient(true);
  };

  // Save new ingredient if not empty or already added
  const handleSaveNewIngredient = () => {
    const formattedIngredient = newIngredient.trim().toLowerCase();
    if (formattedIngredient === "") {
      setNotification("Ingredient field cannot be empty!");
      setTimeout(() => {
        setNotification("");
      }, 3000);
      return;
    }
    if (shoppingList.includes(formattedIngredient)) {
      setNotification(
        "This ingredient has already been added to the shopping list"
      );
      setTimeout(() => {
        setNotification("");
      }, 3000);
      return;
    }
    const updatedList = [...shoppingList, formattedIngredient];
    setShoppingList(updatedList);
    saveShoppingList(updatedList);
    setNewIngredient("");
    setShowAddIngredient(false);
    setNotification("");
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-fit lg:pr-5">
      {/* Image Section (visible on large screens) */}
      <div className="hidden lg:flex w-auto mt-4 flex-col items-center justify-center p-4">
        <img
          src={shoppingCartImage}
          alt="Shopping Cart"
          className="w-1/2 h-auto rounded-lg object-cover shadow-lg"
        />
      </div>

      {/* Shopping List Section */}
      <div
        className="p-8 m-auto w-full lg:w-2/3 border border-gray-800 rounded-3xl shadow-lg"
        style={{ background: "#11151E" }}
      >
        {/* Title */}
        <h1 className="text-3xl font-medium mb-12 text-center text-orange-50">
          Shop Smart, Stay Organized
        </h1>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-between mb-8 relative">
          <button
            className="bg-green-500 text-gray-50 px-6 py-2 rounded-full hover:bg-green-600 hover:shadow-xl transition duration-300 mb-4 sm:mb-0"
            onClick={markAllAsPurchased}
          >
            Mark All as Purchased
          </button>
          <button
            className="bg-blue-500 text-gray-50 px-6 py-2 rounded-full hover:bg-blue-600 hover:shadow-xl transition duration-300"
            onClick={handleAddIngredientClick}
          >
            Add an Ingredient
          </button>

          {/* Add Ingredient Modal */}
          {showAddIngredient && (
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10">
              <div className="bg-orange-50 p-6 rounded-3xl shadow-lg w-80">
                <input
                  type="text"
                  value={newIngredient}
                  placeholder="Add an Ingredient..."
                  onChange={(e) => setNewIngredient(e.target.value)}
                  className="border border-gray-300 p-2 rounded mb-4 w-full focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                <div className="flex justify-end space-x-2">
                  <button
                    className="bg-green-500 text-white px-4 py-2 rounded-full hover:bg-green-600 transition"
                    onClick={handleSaveNewIngredient}
                  >
                    Save
                  </button>
                  <button
                    className="bg-gray-500 text-white px-4 py-2 rounded-full hover:bg-gray-600 transition"
                    onClick={() => setShowAddIngredient(false)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Notification Message */}
        {notification && (
          <div className="bg-red-500 text-white p-3 rounded-full mb-4 text-center">
            {notification}
          </div>
        )}

        {/* Shopping List Items */}
        {shoppingList.length > 0 ? (
          <ul className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {shoppingList.map((item, index) => (
              <li
                key={index}
                onClick={() => handleIngredientChoise(item)}
                className={`flex flex-col sm:flex-row justify-between items-center p-4 border rounded-3xl transition-transform transform hover:scale-105 hover:shadow-md cursor-pointer ${
                  purchasedItems.includes(item)
                    ? "line-through text-gray-500 bg-gray-200"
                    : "bg-white hover:bg-gray-50"
                }`}
              >
                <div className="flex items-center mb-2 sm:mb-0">
                  <span className="font-semibold capitalize">{item}</span>
                </div>
                <span className="text-sm text-gray-700">
                  {/* If available, display amount and unit */}
                  {item.amount ? `${item.amount} ${item.unit}` : ""}
                </span>
              </li>
            ))}
            {showSaveButton && (
              <button
                onClick={handleSaveAndRemoveAll}
                className="bg-green-600 text-white px-6 py-3 rounded-full hover:bg-green-700 shadow-md transition inline-block mt-4"
              >
                Save and Remove All
              </button>
            )}
          </ul>
        ) : (
          <p className="text-gray-300 text-center mt-6">
            Your shopping list is empty.
          </p>
        )}
      </div>
    </div>
  );
}

export default MyShoppingList;
