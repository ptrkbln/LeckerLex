import React, { useContext, useState, useEffect } from "react";
import { RecipeContext } from "../context/RecipeContext";
import { FaLeaf } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function LazyImage({ src, alt, delay, className, ...rest }) {
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShouldLoad(true);
    }, delay);
    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <img
      src={shouldLoad ? src : ""}
      alt={alt}
      className={className}
      loading="lazy"
      {...rest}
    />
  );
}

function ResultPage() {
  const [cookTime, setCookTime] = useState("");
  const [calories, setCalories] = useState("");
  const [nutrition, setNutrition] = useState("");

  const { recipes } = useContext(RecipeContext);


  const [visibleCount, setVisibleCount] = useState(8);

  const navigate = useNavigate();

  // Filter recipes based on the selected cooking time, calories, and nutrition
  const filteredRecipes = recipes.filter((recipe) => {
    let valid = true;

    // Filter by cooking time
    if (cookTime) {
      if (cookTime.endsWith("+")) {
        const minTime = Number(cookTime.slice(0, -1));
        if (recipe.preparationTime < minTime) valid = false;
      } else {
        const [minTime, maxTime] = cookTime.split("-").map(Number);
        if (
          recipe.preparationTime < minTime ||
          recipe.preparationTime > maxTime
        )
          valid = false;
      }
    }

    // Filter by calories
    if (calories) {
      if (calories.endsWith("+")) {
        const minCalories = Number(calories.slice(0, -1));
        if (recipe.nutritionPer100g.calories < minCalories) valid = false;
      } else {
        const [minCal, maxCal] = calories.split("-").map(Number);
        if (
          recipe.nutritionPer100g.calories < minCal ||
          recipe.nutritionPer100g.calories > maxCal
        )
          valid = false;
      }
    }

    // Filter by nutrition type
    if (nutrition) {
      // For example, if nutrition is "vegan", then recipe.diet.vegan should be true.
      if (!recipe.diet || !recipe.diet[nutrition]) valid = false;
    }

    return valid;
  });

  const showMore = () => {
    setVisibleCount(visibleCount + 8);
  };

  return (
    <div className="mx-auto max-w-screen-lg p-6 pb-12 min-h-screen">
      <h1 className="text-3xl font-bold mb-8 text-center text-orange-100">
        Discover Delicious Recipes
      </h1>

      {/* Filter Section */}
      <section className="mb-8">
        <div className="flex flex-wrap justify-center gap-6">
          {/* Cooking Time */}
          <label className="flex flex-col items-center">
            <span className="mb-1 text-center text-gray-200">Cooking Time</span>
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

          {/* Calories */}
          <label className="flex flex-col items-center">
            <span className="mb-1 text-center text-gray-200">Calories</span>
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

          {/* Diet */}
          <label className="flex flex-col items-center">
            <span className="mb-1 text-center text-gray-200">Diet</span>
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
      </section>

      {/* Recipes Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {filteredRecipes.slice(0, visibleCount).map((recipe, idx) => (
          <div
            key={recipe.id}
            onClick={() =>
              recipe.id && navigate(`/home/recipe-details/${recipe.id}`)
            }
            className="bg-gray-900 rounded-2xl overflow-hidden transform hover:scale-105 hover:shadow-2xl transition duration-300 cursor-pointer"
          >
            <LazyImage
              delay={idx * 100}
              src={recipe.image}
              alt={recipe.title}
              className="w-full h-52 object-cover"
            />
            <div className="p-4 bg-gray-800 h-auto flex flex-col justify-between">
              <h2 className="text-xl font-semibold text-gray-100 mb-2">
                {recipe.title}
              </h2>
              <div className="flex items-center justify-between">
                <p className="text-gray-300 text-sm">
                  {recipe.preparationTime} mins
                </p>
                {recipe.diet.vegan && <FaLeaf className="text-green-500" />}
                <p className="text-gray-300 text-sm">
                  {recipe.nutritionPer100g.calories} kcal
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination / Navigation Buttons */}
      <div className="flex justify-center mt-10">
        {visibleCount < filteredRecipes.length ? (
          <button
            onClick={showMore}
            className="px-6 py-3 text-white rounded-full bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-300"
          >
            Show More
          </button>
        ) : (
          <button
            onClick={() => navigate("/home")}
            className="px-6 py-3 bg-green-600 text-white rounded-full hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-300"
          >
            Back to Home
          </button>
        )}
      </div>
    </div>
  );
}

export default ResultPage;
