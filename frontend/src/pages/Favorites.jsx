import React, { useContext, useState, useEffect } from "react";
import { RecipeContext } from "../context/RecipeContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faShoppingCart, faTint, faUtensils, faWheatAlt,} from "@fortawesome/free-solid-svg-icons";
import {faClock, faLeaf, faSeedling, faFire,} from "@fortawesome/free-solid-svg-icons";

function Favorites() {
  const { favorites, setFavorites, setShoppingList } =useContext(RecipeContext);
  const [hasInitialized, setHasInitialized] = useState(false);
  const [cookTime, setCookTime] = useState("");
  const [calories, setCalories] = useState("");
  const [nutrition, setNutrition] = useState("");
  const [filteredFavorites, setFilteredFavorites] = useState([]);
  const [selectedRecipeId, setSelectedRecipeId] = useState(null);
  const [servings, setServings] = useState(1);
  const [missingIngredients, setMissingIngredients] = useState({});
  const [pendingShoppingListUpdate, setPendingShoppingListUpdate] =useState(null);

  // Funktion zur Filterung der Favoriten basierend auf den ausgewählten Filtern
  useEffect(() => {
    let filtered = favorites;

    if (cookTime) {
      const timeRange = cookTime.split("-").map(Number);
      filtered = filtered.filter(recipe =>
        recipe.preparationTime >= timeRange[0] && recipe.preparationTime <= timeRange[1]
        );
    }
    if (calories) {
      const calorieRange = calories.split("-").map(Number);
      filtered = filtered.filter(recipe => 
        recipe.nutrition.calories >= calorieRange[0] && recipe.nutrition.calories <= calorieRange[1]
        );
    }
    if (nutrition) {
      filtered = filtered.filter(recipe => recipe.diet?.[nutrition]);
    }
    setFilteredFavorites(filtered);
  }, [cookTime, calories, nutrition, favorites]);


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

        // Löscht die Markierung & die gesamte Liste der fehlenden Zutaten
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

  console.log("Favoriten in Favorites.jsx:", favorites);

  return (
    <div className="min-h-screen bg-black py-10 z-0">
      {/* Filter Section */}
      {!selectedRecipeId && (
        <main className="bg-[#11151E] shadow-xl rounded-3xl w-full max-w-2xl mx-auto p-6 mb-10">
          <section>
            <div className="flex flex-wrap justify-around gap-4 mb-6">
              <label className="flex flex-col items-center">
                <span className="mb-2 text-gray-200">Cooking Time</span>
                <select
                  value={cookTime}
                  onChange={(e) => setCookTime(e.target.value)}
                  className="p-2 border border-gray-600 rounded-3xl hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-green-600 transition-colors bg-gray-700 text-gray-200"
                >
                  <option value="">Select...</option>
                  <option value="0-15">0 - 15 minutes</option>
                  <option value="15-30">15 - 30 minutes</option>
                  <option value="30-45">30 - 45 minutes</option>
                  <option value="45-60">45 - 60 minutes</option>
                  <option value="60+">60 or more</option>
                </select>
              </label>
              <label className="flex flex-col items-center">
                <span className="mb-2 text-gray-200">Calories</span>
                <select
                  value={calories}
                  onChange={(e) => setCalories(e.target.value)}
                  className="p-2 border border-gray-600 rounded-3xl hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-green-600 transition-colors bg-gray-700 text-gray-200"
                >
                  <option value="">Select...</option>
                  <option value="0-100">0 - 100 calories</option>
                  <option value="100-200">100 - 200 calories</option>
                  <option value="200-300">200 - 300 calories</option>
                  <option value="300-400">300 - 400 calories</option>
                  <option value="400+">400 or more calories</option>
                </select>
              </label>
              <label className="flex flex-col items-center">
                <span className="mb-2 text-gray-200">Nutrition</span>
                <select
                  value={nutrition}
                  onChange={(e) => setNutrition(e.target.value)}
                  className="p-2 border border-gray-600 rounded-3xl hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-green-600 transition-colors bg-gray-700 text-gray-200"
                >
                  <option value="">Select...</option>
                  <option value="vegetarian">Vegetarian</option>
                  <option value="vegan">Vegan</option>
                  <option value="gluten-free">Gluten-free</option>
                  <option value="dairy-free">Dairy-free</option>
                </select>
              </label>
            </div>
          </section>
        </main>
      )}

      {/* Bedingte Darstellung */}
      {/* Falls ein Rezept ausgewählt wurde, zeige die Details */}
      {selectedRecipeId ? (
        <div className="grid gap-6 p-6 bg-gray-100 rounded-lg shadow-lg max-w-3xl mx-auto">
          {/* Rezept aus Favoriten filtern */}
          {favorites
            .filter((recipe) => recipe.id === selectedRecipeId)
            .map((recipe) => (
              <div key={recipe.id} className="w-full">
                {/* Bild, Titel, Kochzeit, Ernährung und Kalorien */}
                <div className="bg-white p-4 rounded-lg shadow mb-4">
                  <div className="w-full  aspect-w-1/2 aspect-h-1/2 overflow-hidden rounded-lg shadow">
                    <img
                      src={recipe.image}
                      alt={recipe.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h2 className="text-l font-semibold  mt-4 text-center">
                      {recipe.title}
                    </h2>
                  </div>

                  {/* Kochzeit, Kalorien und Ernährungs-Icons */}
                  <div className="flex justify-between items-center mb-4 p-3">
                    {/* Kochzeit */}
                    <div className='"text-gray-700 font-light text-sm space-x-1'>
                      <FontAwesomeIcon icon={faClock} className="text-lg" />
                      <span className="text-md text-gray-500">
                        {recipe.preparationTime} min
                      </span>
                    </div>

                    {/* Ernährung */}
                    <div className='"text-gray-700 font-light text-sm space-x-6'>
                      {recipe.diet?.vegetarian && (
                        <FontAwesomeIcon
                          icon={faLeaf}
                          className="text-green-500"
                          title="vegetarian"
                        />
                      )}
                      {recipe.diet?.vegan && (
                        <FontAwesomeIcon
                          icon={faSeedling}
                          className="text-green-500"
                          title="vegan"
                        />
                      )}
                      {!recipe.diet?.glutenFree && (
                        <FontAwesomeIcon
                          icon={faWheatAlt}
                          className="text-yellow-500"
                          title="contains gluten"
                        />
                      )}
                      {!recipe.diet?.dairyFree && (
                        <FontAwesomeIcon
                          icon={faTint}
                          className="text-blue-500"
                          title="contains dairy"
                        />
                      )}
                      {!recipe.diet?.vegetarian &&
                        !recipe.diet?.vegan &&
                        recipe.diet?.glutenFree &&
                        recipe.diet?.dairyFree && (
                          <FontAwesomeIcon
                            icon={faUtensils}
                            className="text-gray-500"
                            title="no diet"
                          />
                        )}
                    </div>

                    {/* Kalorien */}
                    <div className='"text-gray-700 font-light text-sm space-x-1'>
                      <FontAwesomeIcon
                        icon={faFire}
                        className="text-lg text-red-500"
                      />
                      <span className="text-md text-gray-500">
                        {recipe.nutrition?.calories || "N/A"} kcal
                      </span>
                    </div>
                  </div>
                </div>

                {/* Servings */}
                <div className="bg-white p-4 rounded-lg shadow flex justify-between items-center mb-4">
                  <h3 className="text-md font-semibold mt-6 mb-4">Servings</h3>
                  <div className="flex gap-2">
                    <button
                      className=" w-5 h-5 sm:w-5 sm:h-5 flex items-center justify-center rounded-full  bg-gray-100 text-green-500 text-lg font-extrabold sm:text-xl   hover:bg-green-600 hover:text-white focus:outline-none"
                      onClick={handleDecreaseServings}
                    >
                      {"\u2212"} {/* Unicode Minus-zeichen */}
                    </button>
                    <p className="mx-2 sm:mx-4 text-sm sm:text-base lg:text-lg xl:text-base text-gray-600">
                      Ingredients {servingsText}
                    </p>
                    <button
                      className="w-5 h-5 sm:w-5 sm:h-5 flex items-center justify-center rounded-full  bg-gray-100 text-green-500 text-lg font-extrabold sm:text-xl   hover:bg-green-600 hover:text-white focus:outline-none"
                      onClick={handleIncreaseServings}
                    >
                      {"\uFF0B"} {/* Unicode Plus-Zeichen */}
                    </button>
                  </div>
                </div>

                {/* Ingredients */}
                <div className="bg-white p-4 rounded-lg shadow mb-4">
                  <h3 className="text-md font-semibold mt-6 mb-2">
                    Ingredients
                  </h3>
                  <h4 className="text-sm font-semibold p-1 text-green-500 mb-3">
                    Choose ingredients you are missing
                  </h4>
                  <ul>
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
                          className={`flex items-center gap-2 p-1 mb-2 cursor-pointer rounded-3xl transition-colors duration-200 ${
                            isSelected
                              ? "bg-green-500 text-white"
                              : "bg-gray-100 hover:bg-gray-200"
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

                {/* Missing Ingredients */}
                <div className="bg-white p-4 rounded-lg shadow mb-4">
                  <h3 className="text-md font-semibold mt-4 mb-4">
                    Missing Ingredients
                  </h3>
                  <ul className="list-none pl-6">
                    {favorites
                      .find((fav) => fav.id === recipe.id)
                      ?.missingIngredients?.map((ingredient, index) => (
                        <li key={index}>
                          {ingredient.amount} {ingredient.unit}{" "}
                          {ingredient.name}
                        </li>
                      ))}
                  </ul>
                  <div className="relative group">
                    <button
                      onClick={addMissingToShoppingList}
                      className="bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg focus:outline-none mt-4"
                    >
                      <FontAwesomeIcon
                        icon={faShoppingCart}
                        className="text-xl"
                      />
                    </button>
                    {/* Tooltip */}
                    <span className="absolut left-full ml-2 top-1/2 transform -translate-x-1/2  opacity-0 group-hover:opacity-100 bg-green-500 text-white text-xs rounded-md py-1 px-2 transition-opacity duration-300 whitespace-nowrap">
                      Add to Shopping List
                    </span>
                  </div>
                </div>

                {/* Preparation */}
                <div className="bg-white p-4 rounded-lg shadow mb-4 w-full max-w-xl">
                  <h3 className="text-md font-semibold mt-6">Preparation</h3>
                  <ol className="list-decimal pl-6">
                    {recipe.preparation.map((step, index) => (
                      <li key={index}>{step}</li>
                    ))}
                  </ol>
                </div>

                {/* Nutrition */}
                <div className="bg-white p-4 rounded-lg shadow">
                  <h3 className="text-md font-semibold mt-6">
                    Nutrition (pro 100g)
                  </h3>
                  <ul className="list-none pl-6">
                    {Object.entries(recipe.nutrition).map(([key, value]) => (
                      <li key={key}>
                        {key.charAt(0).toUpperCase() + key.slice(1)} : {value}
                        {key === "calories"
                          ? " kcal"
                          : key === "sodium"
                          ? " mg"
                          : " g"}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}

          {/* Back to Favorites außerhalb der Cards */}

          {/* Zurück zu Favoriten (nach dem Ansehen eines gefilterten Rezepts) */}
          <div className="flex justify-center mt-4">
            <button
              onClick={() => setSelectedRecipeId(null)}
              className="px-4 py-2 bg-green-500 text-white rounded-lg shadow hover:bg-green-600"
            >
              Back to Favorites
            </button>
          </div>

          {/* Falls ein Filter aktiv ist, zeige eine Option zum Zurücksetzen, um auf die ungefilterte Favoriten-Seite zurück zu kommen*/}
          {filteredFavorites.length > 0 && (
            <div className="flex justify-center mt-4">
              <button
              onClick={() => {
                setFilteredFavorites([]); // Setze den Filter zurück
              }}
              className="px-4 py-2 bg-green-500 text-white rounded-lg shadow hover:bg-green-600">
                Show All Favorites
              </button>
              </div>
          )}
        </div>
      ) : (
        <>
        {/* Falls Favoriten gefiltert wurden, zeige nur gefilterte Favoriten */}
        
        {filteredFavorites.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8">
            {filteredFavorites.map((recipe) => (
              <div
                key={recipe.id}
                className={`flex flex-col border rounded-lg shadow-md
                          transform hover:scale-95
                          hover:outline hover:outline-1 hover:outline-gray-300 
                          hover:shadow-md   hover:bg-green-50 
                          transition-colors bg-white
                        }`}
                onClick={() => toggleDetails(recipe.id)}
                >
                <img
                  src={recipe.image}
                  alt={recipe.title}
                  className="w-full h-48 object-cover rounded-t-lg hover:opacity-90 
                            transition-opacity"
                />
                <div
                  className="p-4 flex-1 flex flex-col justify-between bg-white hover:bg-green-50 
                              transition-colors"
                  >
                  <h2 className="text-xl font-semibold mb-2">{recipe.title}</h2>
                </div>

                {/* Kochzeit, Kalorien und Ernährungs-Icons */}
                <div className="flex justify-between items-center mb-4 p-3">
                    {/* Kochzeit */}
                    <div className='"text-gray-700 font-light text-sm space-x-1'>
                      <FontAwesomeIcon icon={faClock} className="text-lg" />
                        <span className="text-md text-gray-500">
                        {recipe.preparationTime} min
                      </span>
                    </div>

                    {/* Ernährung */}
                    <div className='"text-gray-700 font-light text-sm space-x-4'>
                      {recipe.diet?.vegetarian && (
                        <FontAwesomeIcon
                          icon={faLeaf}
                          className="text-green-500"
                          title="vegetarian"
                        />
                      )}
                      {recipe.diet?.vegan && (
                        <FontAwesomeIcon
                          icon={faSeedling}
                          className="text-green-500"
                          title="vegan"
                        />
                      )}
                      {!recipe.diet?.glutenFree && (
                        <FontAwesomeIcon
                          icon={faWheatAlt}
                          className="text-yellow-500"
                          title="contains gluten"
                        />
                      )}
                      {!recipe.diet?.dairyFree && (
                        <FontAwesomeIcon
                          icon={faTint}
                          className="text-blue-500"
                          title="contains dairy"
                        />
                      )}
                      {!recipe.diet?.vegetarian &&
                        !recipe.diet?.vegan &&
                        recipe.diet?.glutenFree &&
                        recipe.diet?.dairyFree && (
                        <FontAwesomeIcon
                          icon={faUtensils}
                          className="text-gray-500"
                          title="no diet"
                        />
                      )}
                    </div>

                      {/* Kalorien */}
                      <div className='"text-gray-700 font-light text-sm space-x-1'>
                        <FontAwesomeIcon
                          icon={faFire}
                          className="text-lg text-red-500"
                        />
                        <span className="text-md text-gray-500">
                          {recipe.nutrition?.calories || "N/A"} kcal
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
            </div>

        ) : (

        /* Falls keine Filter aktiv sind, zeige normale Favoritenliste */
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8">
          {favorites.map((recipe) => (
            <div
              key={recipe.id}
              className={`flex flex-col border rounded-lg shadow-md
                        transform hover:scale-95
                       hover:outline hover:outline-1 hover:outline-gray-300 
                       hover:shadow-md   hover:bg-green-50 
                            transition-colors bg-white
                       }`}
              onClick={() => toggleDetails(recipe.id)}
            >
              <img
                src={recipe.image}
                alt={recipe.title}
                className="w-full h-48 object-cover rounded-t-lg hover:opacity-90 
                           transition-opacity"
              />
              <div
                className="p-4 flex-1 flex flex-col justify-between bg-white hover:bg-green-50 
                              transition-colors"
              >
                <h2 className="text-xl font-semibold mb-2">{recipe.title}</h2>
              </div>

              {/* Kochzeit, Kalorien und Ernährungs-Icons */}
              <div className="flex justify-between items-center mb-4 p-3">
                {/* Kochzeit */}
                <div className='"text-gray-700 font-light text-sm space-x-1'>
                  <FontAwesomeIcon icon={faClock} className="text-lg" />
                  <span className="text-md text-gray-500">
                    {recipe.preparationTime} min
                  </span>
                </div>

                {/* Ernährung */}
                <div className='"text-gray-700 font-light text-sm space-x-4'>
                  {recipe.diet?.vegetarian && (
                    <FontAwesomeIcon
                      icon={faLeaf}
                      className="text-green-500"
                      title="vegetarian"
                    />
                  )}
                  {recipe.diet?.vegan && (
                    <FontAwesomeIcon
                      icon={faSeedling}
                      className="text-green-500"
                      title="vegan"
                    />
                  )}
                  {!recipe.diet?.glutenFree && (
                    <FontAwesomeIcon
                      icon={faWheatAlt}
                      className="text-yellow-500"
                      title="contains gluten"
                    />
                  )}
                  {!recipe.diet?.dairyFree && (
                    <FontAwesomeIcon
                      icon={faTint}
                      className="text-blue-500"
                      title="contains dairy"
                    />
                  )}
                  {!recipe.diet?.vegetarian &&
                    !recipe.diet?.vegan &&
                    recipe.diet?.glutenFree &&
                    recipe.diet?.dairyFree && (
                      <FontAwesomeIcon
                        icon={faUtensils}
                        className="text-gray-500"
                        title="no diet"
                      />
                    )}
                </div>

                {/* Kalorien */}
                <div className='"text-gray-700 font-light text-sm space-x-1'>
                  <FontAwesomeIcon
                    icon={faFire}
                    className="text-lg text-red-500"
                  />
                  <span className="text-md text-gray-500">
                    {recipe.nutrition?.calories || "N/A"} kcal
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  )}

      {/* Bedingung: wenn kein Rezept ausgewählt wurde,dann den Button anzeigen */}
      {!selectedRecipeId && (
        <div className="flex justify-center mt-6 w-full">
          <button
            onClick={() => {
              // Logic to navigate back to home
              window.location.href = "/home";
            }}
            className="px-6 py-3 bg-green-500 text-white rounded-3xl hover:bg-green-700 focus:outline-none"
          >
            Back to Home
          </button>
        </div>
      )}
    </div>
  );
}

export default Favorites;
