import fetch from "node-fetch";

export const searchRecipesAndDetails = async (req, res, next) => {
  const { ingredients } = req.query; // eg. =query=chicken,tomato,eggs
  const apiKey = process.env.SPONACULAR_API_KEY;
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": apiKey,
    },
  };

  // Convert the ingredients string to an array to check that at least 4 ingredients are entered
  const ingredientArray = ingredients?.split(",").map((item) => item.trim());

  // at least 4 ingredients needed for the search
  if (!ingredientArray || ingredientArray.length < 2)
    return res
      .status(400)
      .json({ msg: "Search is permitted with a minimum of 4 ingredients." });

  try {
    // Fetch basic recipe list based on ingredients: hard-coded salt, water, oil, sugar as something everyone has at home; parameters are set to prioritize minimising missing ingredients & limit to 5 results
    const response = await fetch(
      `https://api.spoonacular.com/recipes/findByIngredients?ingredients=salt,water,oil,sugar,${ingredients}&ranking=2&ignorePantry=true&number=4`, // TODO eg. number=5, how many recipes to fetch
      options
    );
    const recipes = await response.json();

    // Fetch detailed data for each recipe
    const detailedRecipes = await Promise.all(
      recipes.map(async (recipe) => {
        const detailResponse = await fetch(
          `https://api.spoonacular.com/recipes/${recipe.id}/information?includeNutrition=true`,
          options
        );

        const recipeDetail = await detailResponse.json();

        // extract nutrition values per portion (in order to calculate nutrition per 100g)
        const nutritionData = {
          calories:
            recipeDetail.nutrition.nutrients.find(
              (nutrient) => nutrient.name === "Calories"
            )?.amount || 0,
          fat:
            recipeDetail.nutrition.nutrients.find(
              (nutrient) => nutrient.name === "Fat"
            )?.amount || 0,
          saturatedFat:
            recipeDetail.nutrition.nutrients.find(
              (nutrient) => nutrient.name === "Saturated Fat"
            )?.amount || 0,
          carbohydrates:
            recipeDetail.nutrition.nutrients.find(
              (nutrient) => nutrient.name === "Carbohydrates"
            )?.amount || 0,
          sugar:
            recipeDetail.nutrition.nutrients.find(
              (nutrient) => nutrient.name === "Sugar"
            )?.amount || 0,
          protein:
            recipeDetail.nutrition.nutrients.find(
              (nutrient) => nutrient.name === "Protein"
            )?.amount || 0,
          sodium:
            recipeDetail.nutrition.nutrients.find(
              (nutrient) => nutrient.name === "Sodium"
            )?.amount / 1000 || 0, // convert from mg to g
        };

        // serving size needed for nutrient calculation per 100g
        const servingSize = recipeDetail.nutrition.weightPerServing.amount || 1;

        // create a shallow copy and calculate values per 100g, round it to 2 decimals, and convert back to number-type data
        const nutritionDataPer100g = { ...nutritionData };
        for (const nutrient in nutritionDataPer100g) {
          nutritionDataPer100g[nutrient] = +(
            (nutritionDataPer100g[nutrient] / servingSize) *
            100
          ).toFixed(2);
        }

        const capitalizedTitle = recipe.title
          .split(" ")
          .map(
            (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
          )
          .join(" ");

        return {
          id: recipe.id,
          title: capitalizedTitle,
          image: recipe.image,
          usedIngredientCount: recipe.usedIngredientCount,
          missedIngredientCount: recipe.missedIngredientCount,
          missedIngredients: recipe.missedIngredients.map((ingredient) => ({
            name: ingredient.name,
            amount: ingredient.amount || 0,
            unit: ingredient.unit || "",
          })),
          usedIngredients: recipe.usedIngredients.map(
            (ingredient) => ingredient.original
          ),
          preparationTime: recipeDetail.readyInMinutes,
          servingsAmount: recipeDetail.servings || 0,
          servingPortion: {
            amount: servingSize || 1,
            unit: recipeDetail.nutrition.weightPerServing.unit || "",
          },
          nutritionPerServing: nutritionData,
          nutritionPer100g: nutritionDataPer100g,
          diet: {
            vegetarian: recipeDetail.vegetarian,
            vegan: recipeDetail.vegan,
            glutenFree: recipeDetail.glutenFree,
            dairyFree: recipeDetail.dairyFree,
          },
          ingredients: recipeDetail.extendedIngredients.map((ingredient) => ({
            name: ingredient.name,
            amount: ingredient.measures.metric.amount,
            unit: ingredient.measures.metric.unitLong,
          })),
          steps: recipeDetail.analyzedInstructions.flatMap((instruction) =>
            instruction.steps.map((step) => ({
              number: step.number,
              description: step.step,
            }))
          ),
        };
      })
    );

    // send the combined data as a single response used for search results and for each recipe details
    res.status(200).json({ data: detailedRecipes });
  } catch (error) {
    next(error);
  }
};

/* // just for (spoonacular endpoints) testing purposes
export const testController = async (req, res, next) => {
  const url =
    "https://api.spoonacular.com/recipes/716429/information?includeNutrition=true";
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.SPONACULAR_API_KEY,
      },
    });
    const result = await response.json();
    console.log(result);
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    next(error);
  }
}; */
