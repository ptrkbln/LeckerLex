import React, { useContext, useState, useEffect } from "react";
import { RecipeContext } from "../context/RecipeContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faShoppingCart,
  faTint,
  faUtensils,
  faWheatAlt,
} from "@fortawesome/free-solid-svg-icons";
import {
  faClock,
  faLeaf,
  faSeedling,
  faFire,
} from "@fortawesome/free-solid-svg-icons";

import CulinaryJournalForm from "../components/CulinaryJournalForm";

function Favorites() {
  const { favorites, setFavorites, setShoppingList } =
    useContext(RecipeContext);
  const [hasInitialized, setHasInitialized] = useState(false);
  const [cookTime, setCookTime] = useState("");
  const [calories, setCalories] = useState("");
  const [nutrition, setNutrition] = useState("");
  const [selectedRecipeId, setSelectedRecipeId] = useState(null);
  const [servings, setServings] = useState(1);
  const [missingIngredients, setMissingIngredients] = useState({});
  const [pendingShoppingListUpdate, setPendingShoppingListUpdate] =
    useState(null);

  const toggleDetails = (id) => {
    setSelectedRecipeId((prevId) => (prevId === id ? null : id));
  };

  const handleIncreaseServings = () => {
    setServings((prev) => Math.round((prev + 0.5) * 10) / 10);
  };

  const handleDecreaseServings = () => {
    setServings((prev) => Math.max(0.5, Math.round((prev - 0.5) * 10) / 10));
  };

  // Diese Funktion verwaltet das Hinzufügen / Entfernen von Zutaten zur missingIngredients-Liste, basierend auf dem recipeId. Sie aktualisiert auch die Menge der fehlenden Zutaten abhängig von servings.
  const toggleMissingIngredient = (recipeId, ingredient) => {
    setMissingIngredients((prev) => {
      const updated = { ...prev };
      if (!updated[recipeId]) {
        updated[recipeId] = [];
      }
      const existingIndex = updated[recipeId].findIndex(
        (item) => item.name === ingredient.name
      );
      if (existingIndex > -1) {
        updated[recipeId].splice(existingIndex, 1);
      } else {
        updated[recipeId].push({
          name: ingredient.name,
          amount: Number.isInteger(ingredient.amount * servings)
            ? ingredient.amount * servings // Ganze Zahl ohne Dezimalstellen
            : (ingredient.amount * servings).toFixed(1), // Eine Nachkommastelle bei Dezimalzahlen
          unit: ingredient.unit,
        });
      }
      setFavorites((prevFavorites) =>
        prevFavorites.map((fav) =>
          fav.id === recipeId
            ? { ...fav, missingIngredients: updated[recipeId] }
            : fav
        )
      );
      return updated;
    });
  };

  useEffect(() => {
    setMissingIngredients((prev) => {
      const updatedMissing = { ...prev };
      Object.keys(updatedMissing).forEach((recipeId) => {
        updatedMissing[recipeId] = updatedMissing[recipeId].map(
          (ingredient) => {
            const originalIngredient = favorites
              .find((r) => r.id === parseInt(recipeId))
              ?.ingredients.find((ing) => ing.name === ingredient.name);
            return originalIngredient
              ? {
                  ...ingredient,

                  /* amount: (originalIngredient.amount * servings).toFixed(1) */
                  amount: Number.isInteger(ingredient.amount * servings)
                    ? ingredient.amount * servings // Ganze Zahl ohne Dezimalstellen
                    : (ingredient.amount * servings).toFixed(1), // Eine Nachkommastelle bei Dezimalzahlen
                }
              : ingredient;
          }
        );
      });
      return updatedMissing;
    });
  }, [servings]);

  useEffect(() => {
    if (selectedRecipeId) {
      const storedMissing =
        favorites.find((fav) => fav.id === selectedRecipeId)
          ?.missingIngredients || [];
      setMissingIngredients((prev) => ({
        ...prev,
        [selectedRecipeId]: storedMissing,
      }));
    }
  }, [selectedRecipeId, favorites]);

  const addMissingToShoppingList = async () => {
    if (!selectedRecipeId || !missingIngredients[selectedRecipeId]) return;
    const missingNames = missingIngredients[selectedRecipeId]

      .filter((ingredient) => ingredient.name.trim()) // Sicherstellen, dass nur gültige Zutaten enthalten sind
      .map((ingredient) => ingredient.name.trim().toLowerCase());

    if (missingNames.length === 0) return; // Falls keine Zutaten fehlen, nichts tun (abbrechen)

    try {
      const response = await fetch(
        "http://localhost:3000/users/update-shoppinglist",
        {
          method: "PATCH",
          body: JSON.stringify({
            shoppingList: missingNames,
            action: "add",
          }),
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        }
      );
      if (response.ok) {
        console.log("Shopping list updated successfully");

        setMissingIngredients((prev) => {
          const updated = { ...prev };

          delete updated[selectedRecipeId]; // Löscht die Zutaten für das aktuelle Rezept
          return updated;
        });

        // Speichert die Änderungen auch in Favoriten
        setFavorites((prevFavorites) =>
          prevFavorites.map((fav) =>
            fav.id === selectedRecipeId
              ? { ...fav, missingIngredients: [] }
              : fav
          )
        );
      } else {
        console.log("Failed to update shopping list.");
      }
    } catch (error) {
      console.log("Error while updating shopping list:", error);
    }
  };

  useEffect(() => {
    if (!hasInitialized) {
      setHasInitialized(true);
      return;
    }
    if (pendingShoppingListUpdate) {
      setShoppingList((prevList) => {
        const updatedList = new Set([
          ...prevList,
          ...pendingShoppingListUpdate,
        ]);
        return [...updatedList];
      });
      setPendingShoppingListUpdate(null);
    }
  }, [pendingShoppingListUpdate, setShoppingList]);

  const servingsText = `for ${servings} ${
    servings === 1 || servings === 0.5 ? "serving" : "servings"
  }`;

  // --- Filtering Logic ---
  const filterRecipe = (recipe) => {
    // Filter by Cooking Time (using recipe.preparationTime)
    if (cookTime) {
      if (cookTime.includes("-")) {
        const [min, max] = cookTime.split("-").map(Number);
        if (recipe.preparationTime < min || recipe.preparationTime > max)
          return false;
      } else if (cookTime.endsWith("+")) {
        const min = Number(cookTime.replace("+", ""));
        if (recipe.preparationTime < min) return false;
      }
    }
    // Filter by Calories (using recipe.nutrition.calories)
    if (calories) {
      if (calories.includes("-")) {
        const [min, max] = calories.split("-").map(Number);
        if (
          !recipe.nutrition ||
          recipe.nutrition.calories < min ||
          recipe.nutrition.calories > max
        )
          return false;
      } else if (calories.endsWith("+")) {
        const min = Number(calories.replace("+", ""));
        if (!recipe.nutrition || recipe.nutrition.calories < min) return false;
      }
    }
    // Filter by Nutrition preferences (diet)
    if (nutrition) {
      if (nutrition === "vegetarian" && !recipe.diet?.vegetarian) return false;
      if (nutrition === "vegan" && !recipe.diet?.vegan) return false;
      if (nutrition === "gluten-free" && !recipe.diet?.glutenFree) return false;
      if (nutrition === "dairy-free" && !recipe.diet?.dairyFree) return false;
    }
    return true;
  };

  // Only show filtered recipes in the grid view.
  const filteredFavorites = favorites.filter(filterRecipe);

  if (favorites.length < 1) {
    return (
      <div className="flex flex-col justify-center items-center p-10 m-2 text-gray-50">
        <p className="text-2xl pb-10 ">No recipes added yet... 😔</p>
        <button
          onClick={() => (window.location.href = "/home")}
          className="px-4 py-2 bg-green-500 hover:bg-green-600 transition-colors rounded-full shadow text-md"
        >
          Back to Home
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-full bg-black text-gray-100 py-10">

      <h1 className="text-3xl font-bold mb-8 text-center text-orange-100">
        My Recipe Highlights
      </h1>

      {/* Filter Section */}
      {!selectedRecipeId && (
        <div className="flex flex-wrap justify-center gap-6 mb-8">
          {/** Cooking Time */}
          <label className="flex flex-col items-center">
            <span className="mb-2">Cooking Time</span>
            <select
              value={cookTime}
              onChange={(e) => setCookTime(e.target.value)}
              className="p-3 bg-gray-800 border border-gray-700 rounded-full text-gray-200 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-green-600 transition-colors"
            >
              <option value="">Select...</option>
              <option value="0-15">0 - 15 min</option>
              <option value="15-30">15 - 30 min</option>
              <option value="30-45">30 - 45 min</option>
              <option value="45-60">45 - 60 min</option>
              <option value="60+">60+ min</option>
            </select>
          </label>
          {/** Calories */}
          <label className="flex flex-col items-center">
            <span className="mb-2">Calories</span>
            <select
              value={calories}
              onChange={(e) => setCalories(e.target.value)}
              className="p-3 bg-gray-800 border border-gray-700 rounded-full text-gray-200 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-green-600 transition-colors"
            >
              <option value="">Select...</option>
              <option value="0-100">0 - 100 kcal</option>
              <option value="100-200">100 - 200 kcal</option>
              <option value="200-300">200 - 300 kcal</option>
              <option value="300-400">300 - 400 kcal</option>
              <option value="400+">400+ kcal</option>
            </select>
          </label>
          {/** Diet */}
          <label className="flex flex-col items-center">
            <span className="mb-2">Diet</span>
            <select
              value={nutrition}
              onChange={(e) => setNutrition(e.target.value)}
              className="p-3 bg-gray-800 border border-gray-700 rounded-full text-gray-200 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-green-600 transition-colors"
            >
              <option value="">Select...</option>
              <option value="vegetarian">Vegetarian</option>
              <option value="vegan">Vegan</option>
              <option value="gluten-free">Gluten-free</option>
              <option value="dairy-free">Dairy-free</option>
            </select>
          </label>
        </div>
      )}

      {/* Recipe Details Section */}
      {selectedRecipeId ? (
        <div className="max-w-4xl mx-auto bg-gray-800 p-6 rounded-2xl shadow-lg">
          {favorites
            .filter((recipe) => recipe.id === selectedRecipeId)
            .map((recipe) => (
              <div key={recipe.id}>
                {/** Recipe Header */}
                <div className="bg-gray-900 rounded-3xl overflow-hidden shadow-md mb-6">
                  <img
                    src={recipe.image}
                    alt={recipe.title}
                    className="w-full h-64 object-contain"
                  />
                  <div className="p-4 text-center">
                    <h2 className="text-2xl font-bold">{recipe.title}</h2>
                  </div>
                  <div className="flex justify-around items-center p-4 border-t border-gray-600">
                    <div className="flex items-center gap-2">
                      <FontAwesomeIcon
                        icon={faClock}
                        className="text-lg text-green-400"
                      />
                      <span>{recipe.preparationTime} min</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {recipe.diet?.vegetarian && (
                        <FontAwesomeIcon
                          icon={faLeaf}
                          className="text-green-500"
                          title="Vegetarian"
                        />
                      )}
                      {recipe.diet?.vegan && (
                        <FontAwesomeIcon
                          icon={faSeedling}
                          className="text-green-500"
                          title="Vegan"
                        />
                      )}
                      {!recipe.diet?.glutenFree && (
                        <FontAwesomeIcon
                          icon={faWheatAlt}
                          className="text-yellow-500"
                          title="Contains Gluten"
                        />
                      )}
                      {!recipe.diet?.dairyFree && (
                        <FontAwesomeIcon
                          icon={faTint}
                          className="text-blue-500"
                          title="Contains Dairy"
                        />
                      )}
                      {!recipe.diet?.vegetarian &&
                        !recipe.diet?.vegan &&
                        recipe.diet?.glutenFree &&
                        recipe.diet?.dairyFree && (
                          <FontAwesomeIcon
                            icon={faUtensils}
                            className="text-gray-400"
                            title="No special diet"
                          />
                        )}
                    </div>
                    <div className="flex items-center gap-2">
                      <FontAwesomeIcon
                        icon={faFire}
                        className="text-lg text-red-500"
                      />
                      <span>{recipe.nutrition?.calories || "N/A"} kcal</span>
                    </div>
                  </div>
                </div>

                {/** Servings Adjuster */}
                <div className="bg-gray-900 rounded-3xl p-6 flex items-center justify-between mb-6">
                  <h3 className="text-md font-semibold">Servings</h3>
                  <div className="flex items-center gap-4">
                    <button
                      onClick={handleDecreaseServings}
                      className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-600 hover:bg-green-500 transition-colors"
                    >
                      &minus;
                    </button>
                    <span className="text-lg">{servingsText}</span>

                    <button
                      onClick={handleIncreaseServings}
                      className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-600 hover:bg-green-500 transition-colors"
                    >
                      &#xff0b;
                    </button>
                  </div>
                </div>

                {/** Ingredients List */}
                <div className="bg-gray-900 rounded-3xl p-6 shadow-md mb-6">
                  <h3 className="text-lg text-cen font-semibold mb-6">
                    Ingredients
                  </h3>
                  <p className="text-md text-green-400 mb-4">
                    Select the ingredients you are missing
                  </p>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {recipe.ingredients.map((ingredient, index) => {
                      const isSelected = (
                        missingIngredients[recipe.id] || []
                      ).some((item) => item.name === ingredient.name);
                      return (
                        <li
                          key={index}
                          onClick={() =>
                            toggleMissingIngredient(recipe.id, ingredient)
                          }
                          className={`cursor-pointer rounded-full p-2 text-center transition-colors ${
                            isSelected
                              ? "bg-green-600 text-gray-100"
                              : "bg-gray-700 hover:bg-gray-800"
                          }`}
                        >
                          {Number.isInteger(ingredient.amount * servings)
                            ? ingredient.amount * servings
                            : (ingredient.amount * servings).toFixed(1)}{" "}
                          {ingredient.unit} {ingredient.name}
                        </li>
                      );
                    })}
                  </ul>
                </div>

                {/** Missing Ingredients & Shopping List */}
                <div className="bg-gray-900 rounded-3xl p-6 shadow-md mb-6">
                  <h3 className="text-xl font-semibold mb-3">
                    Missing Ingredients
                  </h3>
                  <ul className="mb-4">
                    {(recipe.missingIngredients || []).map(
                      (ingredient, index) => (
                        <li key={index} className="mb-1">
                          {ingredient.amount} {ingredient.unit}{" "}
                          {ingredient.name}
                        </li>
                      )
                    )}
                  </ul>
                  <button
                    onClick={addMissingToShoppingList}
                    className="flex items-center gap-2 bg-green-500 hover:bg-green-600 transition-colors px-4 py-2 rounded-full shadow"
                  >
                    <FontAwesomeIcon
                      icon={faShoppingCart}
                      className="text-xl"
                    />
                    <span>Add to Shopping List</span>
                  </button>
                </div>

                {/** Preparation */}
                <div className="bg-gray-900 rounded-3xl p-6 shadow-md mb-6">

                  <h3 className="text-xl font-semibold mb-6">Preparation</h3>
                  <div className="relative pl-10">
                    <div className="absolute left-5 top-0 bottom-0 w-px bg-gray-600"></div>

                    <ol className="list-decimal ml-6 space-y-2">
                      {recipe.preparation.map((step, index) => (
                        <div key={index} className="mb-6 flex items-start">
                          {/* Number Badge */}
                          <div className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-full bg-green-600 text-white font-bold text-lg text-center">
                            {index + 1}
                          </div>
                          {/* Step Description */}
                          <div className="ml-4">
                            <p className="text-gray-300 text-lg">{step}</p>
                          </div>
                        </div>
                      ))}
                    </ol>
                  </div>

                </div>

                {/** Nutrition */}
                <div className="bg-gray-900 rounded-3xl p-6 shadow-md">
                  <h3 className="text-xl font-semibold mb-3">
                    Nutrition (per 100g)
                  </h3>
                  <ul className="ml-6 space-y-1">
                    {Object.entries(recipe.nutrition).map(([key, value]) => (
                      <li key={key} className="list-disc">
                        <span className="capitalize">{key}</span>: {value}
                        {key === "calories"
                          ? " kcal"
                          : key === "sodium"
                          ? " mg"
                          : " g"}
                      </li>
                    ))}
                  </ul>
                </div>
                <CulinaryJournalForm
                  recipeName={recipe.title}
                  recipeId={recipe.id}
                />
              </div>
            ))}
          <div className="flex justify-center mt-8">
            <button
              onClick={() => setSelectedRecipeId(null)}
              className="px-6 py-3 bg-green-500 hover:bg-green-600 transition-colors rounded-full shadow"
            >
              Back to Favorites
            </button>
          </div>
        </div>
      ) : (
        /** Favorites Grid (using filteredFavorites) */
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4">
          {filteredFavorites.map((recipe) => (
            <div
              key={recipe.id}
              onClick={() => toggleDetails(recipe.id)}
              className="bg-gray-800 rounded-2xl overflow-hidden shadow-lg transform hover:scale-105 transition duration-300 cursor-pointer"
            >
              <img
                src={recipe.image}
                alt={recipe.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-2">{recipe.title}</h2>

                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <FontAwesomeIcon
                      icon={faClock}
                      className="text-green-400 text-lg"
                    />
                    <span>{recipe.preparationTime} min</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {recipe.diet?.vegetarian && (
                      <FontAwesomeIcon
                        icon={faLeaf}
                        className="text-green-500"
                        title="Vegetarian"
                      />
                    )}
                    {recipe.diet?.vegan && (
                      <FontAwesomeIcon
                        icon={faSeedling}
                        className="text-green-500"
                        title="Vegan"
                      />
                    )}
                    {!recipe.diet?.glutenFree && (
                      <FontAwesomeIcon
                        icon={faWheatAlt}
                        className="text-yellow-500"
                        title="Contains Gluten"
                      />
                    )}
                    {!recipe.diet?.dairyFree && (
                      <FontAwesomeIcon
                        icon={faTint}
                        className="text-blue-500"
                        title="Contains Dairy"
                      />
                    )}
                  </div>
                </div>
                <div className="mt-2 flex items-center gap-2">
                  <FontAwesomeIcon
                    icon={faFire}
                    className="text-red-500 text-lg"
                  />
                  <span>{recipe.nutrition?.calories || "N/A"} kcal</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/** Back to Home Button */}

      {!selectedRecipeId && (
        <div className="flex justify-center mt-12">
          <button
            onClick={() => (window.location.href = "/home")}
            className="px-4 py-2 bg-green-500 hover:bg-green-600 transition-colors rounded-full shadow text-md"
          >
            Back to Home
          </button>
        </div>
      )}
    </div>
  );
}

export default Favorites;
