import React, { useState, useContext, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { RecipeContext } from "../context/RecipeContext";
import { AuthContext } from "../context/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClock,
  faHeart,
  faLeaf,
  faSeedling,
  faWheatAlt,
  faTint,
  faUtensils,
  faFire,
} from "@fortawesome/free-solid-svg-icons";

function RecipeDetails() {
  const { id } = useParams(); // Rezept-ID aus der URL
  const { recipes } = useContext(RecipeContext); // Rezepte aus dem Context
  const { isLoggedIn } = useContext(AuthContext);
  const {
    isFavorite,
    setIsFavorite,
    favorites: favs,
    setFavorites,
  } = useContext(RecipeContext);

  const navigate = useNavigate();

  // Finde das Rezept mit der passenden ID

  const recipe = recipes.find((x) => x.id === Number(id));

  // State declarations.
  const [showMissingIngredients, setShowMissingIngredients] = useState(true);
  const [visibleSection, setVisibleSection] = useState(null);
  const [showShoppingListModal, setShowShoppingListModal] = useState(false);
  const [servings, setServings] = useState(recipe?.servingsAmount || 1);
  const [showFavoriteModal, setShowFavoriteModal] = useState(false);

  // Toggle between sections.
  const toggleSection = (section) => {
    setVisibleSection((prev) => (prev === section ? null : section));
  };

  // Toggle recipe as favorite.
  const toggleFavorite = () => {
    const currentRecipe = {
      id: recipe.id,
      title: recipe.title,
      image: recipe.image,
      ingredients: recipe.ingredients.map((ingredient) => ({
        name: ingredient.name,
        amount: (ingredient.amount * servings).toFixed(1),
        unit: ingredient.unit,
      })),
      nutrition: recipe.nutritionPer100g,
      preparation: recipe.steps.map((step) => step.description),
      preparationTime: recipe.preparationTime,
      diet: {
        vegetarian: recipe.diet?.vegetarian || false,
        vegan: recipe.diet?.vegan || false,
        glutenFree: recipe.diet?.glutenFree || false,
        dairyFree: recipe.diet?.dairyFree || false,
      },
      calories: recipe.nutritionPer100g?.calories,
    };

    // If recipe already in favorites, remove it.
    if (isFavorite.includes(recipe.id)) {
      setIsFavorite(isFavorite.filter((favId) => favId !== recipe.id));
      setFavorites(favs.filter((fav) => fav.id !== recipe.id));
    } else {
      setIsFavorite([...isFavorite, recipe.id]);
      setFavorites([...favs, currentRecipe]);
      // Show the "Added to Favorites!" modal
      setShowFavoriteModal(true);
      setTimeout(() => setShowFavoriteModal(false), 3000);
    }
  };

  // Add missing ingredients to the shopping list.
  const handleAddToShoppingList = async () => {
    try {
      if (!isLoggedIn) {
        navigate(`/home/login?redirectTo=/home/recipe-details/${id}`);
      } else {
        setShowShoppingListModal(true);
        let shoppingListItems = recipe.missedIngredients.map((item) =>
          item.name.trim().toLowerCase()
        );
        const response = await fetch(
          "http://localhost:3000/users/update-shoppinglist",
          {
            method: "PATCH",
            body: JSON.stringify({
              shoppingList: shoppingListItems,
              action: "add",
            }),
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          }
        );
        if (!response.ok) {
          console.log("Failed to update shopping list.");
        }
      }
    } catch (error) {
      console.log("Error while updating shopping list:", error);
    }
  };

  // Close shopping list modal.
  const handleCloseShoppingListModal = () => {
    setShowShoppingListModal(false);
    setShowMissingIngredients(false);
  };

  // Adjust servings.
  const handleIncreaseServings = () => {
    setServings((prev) => Math.round((prev + 0.5) * 10) / 10);
  };
  const handleDecreaseServings = () => {
    setServings((prev) => Math.max(0.5, Math.round((prev - 0.5) * 10) / 10));
  };

  // Dynamic text for servings

  const servingsText = `for ${servings} ${
    servings === 1 || servings === 0.5 ? "serving" : "servings"
  }`;

  if (!recipe) {
    return (
      <div className="bg-gray-900 min-h-screen flex items-center justify-center">
        <p className="text-center text-2xl font-semibold text-orange-200">
          Recipe not found 😔
        </p>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-6xl mx-auto relative bg-[#11151E] min-h-screen font-medium rounded-2xl text-gray-200">
      {/* Recipe Image Section */}
      <div className="relative mx-auto w-full sm:w-8/12 lg:w-6/12 h-72 sm:h-80 lg:h-96 mt-16 rounded-2xl">
        <img
          src={recipe.image}
          alt={recipe.title}
          className="w-full h-full object-cover rounded-xl"
        />
        <button
          onClick={toggleFavorite}
          className="absolute top-4 right-4 bg-black bg-opacity-30 p-2 rounded-full hover:bg-opacity-50 transition"
        >
          <FontAwesomeIcon
            icon={faHeart}
            size="2x"
            color={isFavorite.includes(recipe.id) ? "#EF4444" : "#fff"}
          />
        </button>
        {/* "Added to Favorites!" Modal */}
        {showFavoriteModal && (
          <div className="absolute top-[-2rem] right-4 z-50 bg-green-600 text-white px-4 py-2 rounded-full shadow-md animate-fadeIn">
            Added to Favorites!
          </div>
        )}
        {/* Title Overlay with pointer-events disabled */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="bg-black bg-opacity-40 px-4 py-2 rounded">
            <h2 className="text-center text-xl sm:text-2xl md:text-3xl font-semibold">
              {recipe.title}
            </h2>
          </div>
        </div>
        {/* Info Section */}
        <div className="flex justify-between items-center mt-4 text-gray-300 px-2">
          <div className="flex items-center gap-2">
            <FontAwesomeIcon icon={faClock} className="text-lg" />
            <span className="text-md">{recipe.preparationTime} min</span>
          </div>
          <div className="flex items-center gap-4">
            {recipe.diet?.vegetarian && (
              <FontAwesomeIcon
                icon={faLeaf}
                className="text-green-400"
                title="Vegetarian"
              />
            )}
            {recipe.diet?.vegan && (
              <FontAwesomeIcon
                icon={faSeedling}
                className="text-green-400"
                title="Vegan"
              />
            )}
            {!recipe.diet?.glutenFree && (
              <FontAwesomeIcon
                icon={faWheatAlt}
                className="text-yellow-400"
                title="Contains gluten"
              />
            )}
            {!recipe.diet?.dairyFree && (
              <FontAwesomeIcon
                icon={faTint}
                className="text-blue-400"
                title="Contains dairy"
              />
            )}
            {!recipe.diet?.vegetarian &&
              !recipe.diet?.vegan &&
              recipe.diet?.glutenFree &&
              recipe.diet?.dairyFree && (
                <FontAwesomeIcon
                  icon={faUtensils}
                  className="text-gray-400"
                  title="No specific diet"
                />
              )}
          </div>
          <div className="flex items-center gap-2">
            <FontAwesomeIcon icon={faFire} className="text-lg text-red-400" />
            <span className="text-md">
              {recipe.nutritionPer100g?.calories || "N/A"} kcal
            </span>
          </div>
        </div>
      </div>

      {/* Section Buttons */}
      <div className="mt-24 flex flex-wrap justify-center gap-10">
        {["ingredients", "nutrition", "preparation"].map((section) => (
          <button
            key={section}
            onClick={() => toggleSection(section)}
            className={`px-6 py-3 bg-green-600 hover:bg-green-700 rounded-full shadow-lg transition-colors ${
              visibleSection === section ? "ring-2 ring-green-300" : ""
            }`}
          >
            {section.charAt(0).toUpperCase() + section.slice(1)}
          </button>
        ))}
      </div>

      {/* Section Content */}
      {/* Ingredients */}
      <div className="mt-10 space-y-8">
        {visibleSection === "ingredients" && (
          <div className="bg-gray-800 border border-gray-700 p-6 rounded-2xl shadow-xl">
            <h3 className="text-2xl text-center font-bold mb-8">
              Ingredients {servingsText}
            </h3>
            <div className="flex items-center justify-center space-x-4 mb-10">
              <div className="inline-flex items-center border border-gray-300 rounded-full overflow-hidden shadow-sm">
                <button
                  onClick={handleDecreaseServings}
                  className="px-4 py-2 text-gray-300 hover:bg-gray-100 hover:text-gray-800 transition-colors focus:outline-none"
                  aria-label="Decrease servings"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M20 12H4"
                    />
                  </svg>
                </button>
                <span className="px-4 py-2 font-semibold text-gray-300">
                  {servings}
                </span>

                <button
                  onClick={handleIncreaseServings}
                  className="px-4 py-2 text-gray-300 hover:bg-gray-100 hover:text-gray-800 transition-colors focus:outline-none"
                  aria-label="Increase servings"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                </button>
              </div>
              {/* <p className="text-xl text-white">Ingredients {servingsText}</p> */}
            </div>

            <ul className="w-full divide-y divide-gray-500">
              {recipe.ingredients.map((ingredient, index) => {
                const totalAmount = ingredient.amount * servings;
                const displayAmount = Number.isInteger(totalAmount)
                  ? totalAmount
                  : totalAmount.toFixed(0);

                return (
                  <li
                    key={index}
                    className="py-2 flex justify-between items-center"
                  >
                    <span className="font-semibold text-gray-200">
                      {displayAmount} {ingredient.unit}
                    </span>
                    <span className="text-gray-200">{ingredient.name}</span>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
        {visibleSection === "nutrition" && (
          <div className="bg-gray-800 border border-gray-700 p-6 rounded-2xl shadow-xl">
            <h3 className="text-2xl font-bold mb-4">
              Nutritional Values (per 100g)
            </h3>
            <ul className="list-disc pl-6 space-y-2 text-gray-300">
              <li>Calories: {recipe.nutritionPer100g.calories} kcal</li>
              <li>Fat: {recipe.nutritionPer100g.fat} g</li>
              <li>Saturated Fat: {recipe.nutritionPer100g.saturatedFat} g</li>
              <li>Carbohydrates: {recipe.nutritionPer100g.carbohydrates} g</li>
              <li>Sugar: {recipe.nutritionPer100g.sugar} g</li>
              <li>Protein: {recipe.nutritionPer100g.protein} g</li>
              <li>Sodium: {recipe.nutritionPer100g.sodium} g</li>
            </ul>
          </div>
        )}
        {visibleSection === "preparation" && (
          <div className="bg-gray-800 border border-gray-700 p-6 rounded-2xl shadow-xl">
            <h3 className="text-2xl font-bold mb-6">Preparation Steps</h3>
            <div className="relative pl-10">
              {/* Vertical Line */}
              <div className="absolute left-5 top-0 bottom-0 w-px bg-gray-600"></div>
              {recipe.steps.map((step, index) => (
                <div key={index} className="mb-6 flex items-start">
                  {/* Number Badge */}
                  <div className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-full bg-green-600 text-white font-bold text-lg text-center">
                    {index + 1}
                  </div>
                  {/* Step Description */}
                  <div className="ml-4">
                    <p className="text-gray-300 text-lg">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Fenster für fehlende Zutaten mit Animation*/}
      {showMissingIngredients &&
        recipe.missedIngredients &&
        recipe.missedIngredients.length > 0 && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="relative bg-gray-800 rounded-lg shadow-2xl p-6 w-11/12 sm:w-1/2 lg:w-1/3 animate-popIn">
              <button
                onClick={() => setShowMissingIngredients(false)}
                className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
              >
                &times;
              </button>
              <h3 className="text-2xl font-semibold mb-4 text-center">
                Missing Ingredients
              </h3>
              <ul className="space-y-2 text-lg">
                {recipe.missedIngredients.map((ingredient, index) => (
                  <li
                    key={index}
                    className="flex justify-between text-gray-300"
                  >
                    {Number.isInteger(ingredient.amount * servings)
                      ? ingredient.amount * servings
                      : (ingredient.amount * servings).toFixed(1)}{" "}
                    {ingredient.unit} {ingredient.name}
                  </li>
                ))}
              </ul>
              <button
                onClick={handleAddToShoppingList}
                className="mt-4 w-full bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600"
              >
                Add to Shopping List
              </button>
              {showShoppingListModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                  <div className="bg-gray-800 rounded-lg shadow-2xl p-6 w-11/12 sm:w-1/2 lg:w-1/3">
                    <h2 className="text-2xl font-semibold mb-4 text-center">
                      Item Added! 🎉
                    </h2>
                    <p className="text-gray-300 text-center mb-6">
                      Missing ingredients have been added to your shopping list.
                    </p>
                    <button
                      onClick={handleCloseShoppingListModal}
                      className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
                    >
                      Close
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
    </div>
  );
}
export default RecipeDetails;
