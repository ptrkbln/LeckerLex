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
  const { id } = useParams();
  const navigate = useNavigate();
  // const {recipes} = useContext(RecipeContext);
  const { isLoggedIn } = useContext(AuthContext);
  const {
    isFavorite,
    favorites: favs,
    setIsFavorite,
    setFavorites,
  } = useContext(RecipeContext);

  const recipes = [
    {
    id: 648983,
    title: "Knishes - Potato Filling",
    image: "https://img.spoonacular.com/recipes/648983-312x231.jpg",
    usedIngredientCount: 3,
    missedIngredientCount: 1,
    missedIngredients: [
    {
    name: "chicken fat",
    amount: 6,
    unit: "tablespoons",
    },
    ],
    usedIngredients: [
    "1 Egg",
    "1 cup Chopped onions",
    "2 cups Mashed potatoes",
    ],
    preparationTime: 45,
    servingsAmount: 1,
    servingPortion: {
    amount: 809,
    unit: "g",
    },
    nutritionPerServing: {
    calories: 1142.78,
    fat: 81.39,
    saturatedFat: 24.45,
    carbohydrates: 88.95,
    sugar: 10.23,
    protein: 15.84,
    sodium: 41.95282,
    },
    nutritionPer100g: {
    calories: 141.26,
    fat: 10.06,
    saturatedFat: 3.02,
    carbohydrates: 11,
    sugar: 1.26,
    protein: 1.96,
    sodium: 5.19,
    },
    diet: {
    vegetarian: false,
    vegan: false,
    glutenFree: true,
    dairyFree: true,
    },
    ingredients: [
    {
    name: "chicken fat",
    amount: 6,
    unit: "Tbsps",
    },
    {
    name: "egg",
    amount: 1,
    unit: "",
    },
    {
    name: "onions",
    amount: 160,
    unit: "grams",
    },
    {
    name: "pepper",
    amount: 0.25,
    unit: "teaspoons",
    },
    {
    name: "potatoes",
    amount: 420,
    unit: "milliliters",
    },
    {
    name: "salt",
    amount: 6,
    unit: "Tbsps",
    },
    ],
    steps: [
    {
    number: 1,
    description:
    "Brown the onions in the fat or butter. Beat in the potatoes, egg, salt and pepper until fluffy.",
    },
    {
    number: 2,
    description: "Place on dough.",
    },
    ],
    },
    {
    id: 650132,
    title: "Linguine With Chick Peas and Bacon",
    image: "https://img.spoonacular.com/recipes/650132-312x231.jpg",
    usedIngredientCount: 3,
    missedIngredientCount: 1,
    missedIngredients: [
    {
    name: "bacon",
    amount: 1,
    unit: "slice",
    },
    ],
    usedIngredients: [
    "as desired parmesan or asiago cheese",
    "1/2 cup cooked chick peas",
    "4 ounces linguini (dry)",
    ],
    preparationTime: 45,
    servingsAmount: 2,
    servingPortion: {
    amount: 175,
    unit: "g",
    },
    nutritionPerServing: {
    calories: 759.3,
    fat: 50.03,
    saturatedFat: 11.62,
    carbohydrates: 54.69,
    sugar: 3.72,
    protein: 23.14,
    sodium: 0.56041,
    },
    nutritionPer100g: {
    calories: 433.89,
    fat: 28.59,
    saturatedFat: 6.64,
    carbohydrates: 31.25,
    sugar: 2.13,
    protein: 13.22,
    sodium: 0.32,
    },
    diet: {
    vegetarian: false,
    vegan: false,
    glutenFree: false,
    dairyFree: false,
    },
    ingredients: [
    {
    name: "asiago cheese",
    amount: 2,
    unit: "servings",
    },
    {
    name: "bacon",
    amount: 1,
    unit: "slice",
    },
    {
    name: "chick peas",
    amount: 82,
    unit: "grams",
    },
    {
    name: "linguini",
    amount: 113.398,
    unit: "grams",
    },
    {
    name: "olive oil",
    amount: 72,
    unit: "milliliters",
    },
    ],
    steps: [
    {
    number: 1,
    description:
    "If not done prior, soak and boil the Chick Peas according to instructions on package.Boil water for linguini and cook according to package directions.",
    },
    {
    number: 2,
    description: "Drain linguini.In small skillet, brown bacon.",
    },
    {
    number: 3,
    description:
    "Remove bacon to paper towel to dry and drain bacon fat.In skillet, add 1/3 cup olive oil.",
    },
    {
    number: 4,
    description:
    "Heat until warm, add chick peas and heat until warm.Crumble bacon and optional red pepper and add to olive oil and chickpea mixture and toss with cooked drained linguini. Top with dry parmesan or asaigo chese",
    },
    ],
    },
    {
    id: 642712,
    title: "Fettuccine Alla Carbonara, With No Cream Necessary",
    image: "https://img.spoonacular.com/recipes/642712-312x231.jpg",
    usedIngredientCount: 3,
    missedIngredientCount: 1,
    missedIngredients: [
    {
    name: "pancetta",
    amount: 0.25,
    unit: "pound",
    },
    ],
    usedIngredients: [
    "2/3 pound of fettuccine, pericatelli or bucatini (dried, not fresh)",
    "2 very fresh eggs",
    "1 cup Parmigiano Reggiano, grated (plus more for topping, though that's optional)",
    ],
    preparationTime: 45,
    servingsAmount: 2,
    servingPortion: {
    amount: 302,
    unit: "g",
    },
    nutritionPerServing: {
    calories: 1076.2,
    fat: 46.32,
    saturatedFat: 18.91,
    carbohydrates: 110.47,
    sugar: 3.41,
    protein: 51.99,
    sodium: 1.46439,
    },
    nutritionPer100g: {
    calories: 356.36,
    fat: 15.34,
    saturatedFat: 6.26,
    carbohydrates: 36.58,
    sugar: 1.13,
    protein: 17.22,
    sodium: 0.48,
    },
    diet: {
    vegetarian: false,
    vegan: false,
    glutenFree: false,
    dairyFree: false,
    },
    ingredients: [
    {
    name: "fettuccine",
    amount: 302.395,
    unit: "grams",
    },
    {
    name: "very eggs",
    amount: 2,
    unit: "",
    },
    {
    name: "pancetta",
    amount: 113.398,
    unit: "grams",
    },
    {
    name: "parmigiano reggiano",
    amount: 100,
    unit: "grams",
    },
    {
    name: "kosher salt",
    amount: 2,
    unit: "servings",
    },
    {
    name: "pepper",
    amount: 2,
    unit: "servings",
    },
    ],
    steps: [
    {
    number: 1,
    description:
    'Whisk the eggs, season with salt and a generous amount of black pepper, as the latter will provide the "carbon" look so classic to this dish, and set aside.',
    },
    {
    number: 2,
    description:
    "Meanwhile, cook the pasta in salted water until a minute shy of al dente, reserving a ladle or two of the salted, starchy water.",
    },
    {
    number: 3,
    description:
    "Then get to browning some pancetta and garlic, then adding a bit of pasta water and then the cooked pasta.",
    },
    {
    number: 4,
    description:
    "Remove from the heat and crack in some eggs, stirring to cook them, and season with salt and pepper.",
    },
    {
    number: 5,
    description:
    "Finish with the Parmigiano Reggiano, stir to combine, and serve immediately",
    },
    ],
    },
    {
    id: 661447,
    title: "Square Deviled Eggs",
    image: "https://img.spoonacular.com/recipes/661447-312x231.jpg",
    usedIngredientCount: 2,
    missedIngredientCount: 1,
    missedIngredients: [
    {
    name: "ham",
    amount: 6,
    unit: "servings",
    },
    ],
    usedIngredients: ["Hard boiled eggs", "Cream cheese"],
    preparationTime: 45,
    servingsAmount: 6,
    servingPortion: {
    amount: 87,
    unit: "g",
    },
    nutritionPerServing: {
    calories: 211.6,
    fat: 14.7,
    saturatedFat: 5.32,
    carbohydrates: 0.07,
    sugar: 0.05,
    protein: 18.52,
    sodium: 1.01333,
    },
    nutritionPer100g: {
    calories: 243.22,
    fat: 16.9,
    saturatedFat: 6.11,
    carbohydrates: 0.08,
    sugar: 0.06,
    protein: 21.29,
    sodium: 1.16,
    },
    diet: {
    vegetarian: false,
    vegan: false,
    glutenFree: true,
    dairyFree: false,
    },
    ingredients: [
    {
    name: "eggs",
    amount: 6,
    unit: "servings",
    },
    {
    name: "cream cheese",
    amount: 6,
    unit: "servings",
    },
    {
    name: "ham",
    amount: 6,
    unit: "servings",
    },
    ],
    steps: [
    {
    number: 1,
    description:
    "To make square hard boiled eggs, you'll need an Egg cuber or Square Egg Press. (See note in About section on where to purchase)",
    },
    {
    number: 2,
    description:
    "First boil your eggs, then slide the egg inside the press and screw the top down so it pushes the egg into the corners.",
    },
    {
    number: 3,
    description:
    "Let the egg cool and remove it from the mold. For better results use medium size eggs.",
    },
    {
    number: 4,
    description:
    "If you intend to prepare this for a party, I suggest you buy several cubers, this way you can boil and chill several eggs at a time, or it will take you a lot of time.",
    },
    {
    number: 5,
    description:
    "To prepare hard boiled eggs, place eggs in a saucepan, cover with cold water and bring to a boil over medium heat. As soon as the water comes to a full boil, let the eggs boil for 5 minutes, and then remove from heat and let stand covered in hot water 10 minutes .",
    },
    {
    number: 6,
    description:
    "Filling is made with cream cheese, ham and egg yolk, it tastes very soft, it is ideal for kids.",
    },
    ],
    },
    {
    id: 631807,
    title: 'Toasted" Agnolotti (or Ravioli)',
    image: "https://img.spoonacular.com/recipes/631807-312x231.jpg",
    usedIngredientCount: 2,
    missedIngredientCount: 1,
    missedIngredients: [
    {
    name: "breadcrumbs",
    amount: 1.5,
    unit: "cup",
    },
    ],
    usedIngredients: [
    "1/3 packet of 375g (13 oz) pre-made fresh agnolotti/ravioli",
    "1 egg",
    ],
    preparationTime: 45,
    servingsAmount: 2,
    servingPortion: {
    amount: 287,
    unit: "g",
    },
    nutritionPerServing: {
    calories: 965.04,
    fat: 28.15,
    saturatedFat: 8.87,
    carbohydrates: 134.46,
    sugar: 8.79,
    protein: 40.62,
    sodium: 1.7611199999999998,
    },
    nutritionPer100g: {
    calories: 336.25,
    fat: 9.81,
    saturatedFat: 3.09,
    carbohydrates: 46.85,
    sugar: 3.06,
    protein: 14.15,
    sodium: 0.61,
    },
    diet: {
    vegetarian: false,
    vegan: false,
    glutenFree: false,
    dairyFree: true,
    },
    ingredients: [
    {
    name: "g pre-made agnolotti/ravioli",
    amount: 368.544,
    unit: "grams",
    },
    {
    name: "egg",
    amount: 1,
    unit: "",
    },
    {
    name: "breadcrumbs",
    amount: 162,
    unit: "milliliters",
    },
    ],
    steps: [
    {
    number: 1,
    description:
    "Preheat oven to 180 degrees Celsius (350 F) for a fan-forced oven or 200 degrees Celsius (392 F) for a convection oven.",
    },
    {
    number: 2,
    description: "Line a baking tray with baking paper.",
    },
    {
    number: 3,
    description:
    "Spray a thin layer of olive oil (any oil of your choice will do) on the baking paper. Set aside.",
    },
    {
    number: 4,
    description:
    "Crack and beat an egg on a plate. On a separate plate add breadcrumbs.",
    },
    {
    number: 5,
    description: "Dip agnolotti in the beaten egg first.",
    },
    {
    number: 6,
    description:
    "Then coat it with breadcrumbs. Repeat step 5 and 6 with the remaining agnolotti until egg and breadcrumbs are finished.",
    },
    {
    number: 7,
    description:
    "Place the crumbed agnolotti onto a baking tray. Once youve completed step 5 and 6, spray another thin layer of oil over the crumbed aganolotti.",
    },
    {
    number: 8,
    description:
    "Bake the crumbed agnolotti for 25 minutes or until golden brown.",
    },
    {
    number: 9,
    description: "Serve immediately with pasta sauce or ketchup.",
    },
    ],
    },
    {
    id: 1099404,
    title: "Pan Fried Potato Wedges",
    image: "https://img.spoonacular.com/recipes/1099404-312x231.jpg",
    usedIngredientCount: 2,
    missedIngredientCount: 1,
    missedIngredients: [
    {
    name: "garlic powder",
    amount: 1,
    unit: "tsp",
    },
    ],
    usedIngredients: [
    "4 large red potatoes washed and cut into wedges",
    "1 tsp onion powder",
    ],
    preparationTime: 20,
    servingsAmount: 4,
    servingPortion: {
    amount: 387,
    unit: "g",
    },
    nutritionPerServing: {
    calories: 287.91,
    fat: 3.33,
    saturatedFat: 0.34,
    carbohydrates: 59.77,
    sugar: 4.82,
    protein: 7.18,
    sodium: 1.2300799999999998,
    },
    nutritionPer100g: {
    calories: 74.4,
    fat: 0.86,
    saturatedFat: 0.09,
    carbohydrates: 15.44,
    sugar: 1.25,
    protein: 1.86,
    sodium: 0.32,
    },
    diet: {
    vegetarian: true,
    vegan: true,
    glutenFree: true,
    dairyFree: true,
    },
    ingredients: [
    {
    name: "potatoes",
    amount: 4,
    unit: "larges",
    },
    {
    name: "seasoning salt",
    amount: 2,
    unit: "teaspoons",
    },
    {
    name: "garlic powder",
    amount: 1,
    unit: "teaspoon",
    },
    {
    name: "onion powder",
    amount: 1,
    unit: "teaspoon",
    },
    {
    name: "pepper",
    amount: 4,
    unit: "servings",
    },
    {
    name: "canola oil",
    amount: 56,
    unit: "milliliters",
    },
    ],
    steps: [
    {
    number: 1,
    description:
    "Preheat oil over medium heat in a good-quality nonstick pan.Season potatoes well, and the place in a single layer in pan. Cook on one side without turning until it is golden brown and crispy. Flip potatoes and repeat on the other side.",
    },
    {
    number: 2,
    description: "Remove from pan and serve hot.",
    },
    ],
    },
    {
    id: 655589,
    title: "Penne with Goat Cheese and Basil",
    image: "https://img.spoonacular.com/recipes/655589-312x231.jpg",
    usedIngredientCount: 2,
    missedIngredientCount: 1,
    missedIngredients: [
    {
    name: "basil leaves",
    amount: 1,
    unit: "cup",
    },
    ],
    usedIngredients: ["12 ounces penne pasta", "4 ounces Goat Cheese"],
    preparationTime: 45,
    servingsAmount: 12,
    servingPortion: {
    amount: 43,
    unit: "g",
    },
    nutritionPerServing: {
    calories: 151.21,
    fat: 4.77,
    saturatedFat: 1.78,
    carbohydrates: 21.22,
    sugar: 0.85,
    protein: 5.51,
    sodium: 0.23038999999999998,
    },
    nutritionPer100g: {
    calories: 351.65,
    fat: 11.09,
    saturatedFat: 4.14,
    carbohydrates: 49.35,
    sugar: 1.98,
    protein: 12.81,
    sodium: 0.54,
    },
    diet: {
    vegetarian: true,
    vegan: false,
    glutenFree: false,
    dairyFree: false,
    },
    ingredients: [
    {
    name: "penne pasta",
    amount: 340.194,
    unit: "grams",
    },
    {
    name: "basil leaves",
    amount: 24,
    unit: "grams",
    },
    {
    name: "goat cheese",
    amount: 113.398,
    unit: "grams",
    },
    {
    name: "olive oil",
    amount: 2,
    unit: "Tbsps",
    },
    {
    name: "salt and pepper",
    amount: 12,
    unit: "servings",
    },
    ],
    steps: [
    {
    number: 1,
    description: "Cook pasta according to package directions",
    },
    {
    number: 2,
    description:
    "Arrange basil leaves in a stack, roll like a cigar and proceed to cut crosswise. This technique is called chiffonade.",
    },
    {
    number: 3,
    description:
    "Toss pasta with olive oil and goat cheese and let cool for a few minutes.",
    },
    {
    number: 4,
    description: "Add basil, salt, and pepper, and then serve",
    },
    ],
    },
    {
    id: 643809,
    title: "Fried String Cheese Sticks",
    image: "https://img.spoonacular.com/recipes/643809-312x231.jpg",
    usedIngredientCount: 2,
    missedIngredientCount: 1,
    missedIngredients: [
    {
    name: "seasoned bread crumbs",
    amount: 0.5,
    unit: "cup",
    },
    ],
    usedIngredients: [
    "4 individual string cheese sticks",
    "1 tablespoon egg +2 water (egg wash)",
    ],
    preparationTime: 45,
    servingsAmount: 1,
    servingPortion: {
    amount: 232,
    unit: "g",
    },
    nutritionPerServing: {
    calories: 709.77,
    fat: 31.77,
    saturatedFat: 15.77,
    carbohydrates: 69.05,
    sugar: 3.58,
    protein: 37.54,
    sodium: 1.70354,
    },
    nutritionPer100g: {
    calories: 305.94,
    fat: 13.69,
    saturatedFat: 6.8,
    carbohydrates: 29.76,
    sugar: 1.54,
    protein: 16.18,
    sodium: 0.73,
    },
    diet: {
    vegetarian: true,
    vegan: false,
    glutenFree: false,
    dairyFree: false,
    },
    ingredients: [
    {
    name: "individual string cheese sticks",
    amount: 4,
    unit: "",
    },
    {
    name: "flour",
    amount: 31.25,
    unit: "grams",
    },
    {
    name: "egg +2 water",
    amount: 1,
    unit: "Tbsp",
    },
    {
    name: "seasoned bread crumbs",
    amount: 60,
    unit: "grams",
    },
    {
    name: "vegetable oil",
    amount: 1,
    unit: "serving",
    },
    ],
    steps: [
    {
    number: 1,
    description:
    "Dredge individual cheese sticks in flour. shake off excess.",
    },
    {
    number: 2,
    description: "Roll sticks in egg wash,",
    },
    {
    number: 3,
    description: "Then coat with bread crumbs.",
    },
    {
    number: 4,
    description:
    "Fry in hot oil for 20 seconds, then flip and fry another 20 seconds.",
    },
    {
    number: 5,
    description: "Serve with Pizza sauce or marinara!!",
    },
    ],
    },
    {
    id: 640457,
    title: "Crash Hot Potatoes",
    image: "https://img.spoonacular.com/recipes/640457-312x231.jpg",
    usedIngredientCount: 2,
    missedIngredientCount: 1,
    missedIngredients: [
    {
    name: "rosemary",
    amount: 1,
    unit: "Sprigs",
    },
    ],
    usedIngredients: [
    "new potatoes (red or russet)",
    "Grated Cheese (Parmesan, Locatelli-Romano, etc)",
    ],
    preparationTime: 45,
    servingsAmount: 4,
    servingPortion: {
    amount: 46,
    unit: "g",
    },
    nutritionPerServing: {
    calories: 242.46,
    fat: 21.76,
    saturatedFat: 6.86,
    carbohydrates: 1.22,
    sugar: 0.25,
    protein: 10.76,
    sodium: 0.67476,
    },
    nutritionPer100g: {
    calories: 527.09,
    fat: 47.3,
    saturatedFat: 14.91,
    carbohydrates: 2.65,
    sugar: 0.54,
    protein: 23.39,
    sodium: 1.47,
    },
    diet: {
    vegetarian: false,
    vegan: false,
    glutenFree: true,
    dairyFree: false,
    },
    ingredients: [
    {
    name: "new potatoes",
    amount: 4,
    unit: "servings",
    },
    {
    name: "rosemary",
    amount: 1,
    unit: "Sprig",
    },
    {
    name: "kosher salt",
    amount: 4,
    unit: "servings",
    },
    {
    name: "ground pepper",
    amount: 4,
    unit: "servings",
    },
    {
    name: "olive oil",
    amount: 4,
    unit: "servings",
    },
    {
    name: "cheese",
    amount: 4,
    unit: "servings",
    },
    ],
    steps: [
    {
    number: 1,
    description: "Preheat oven to 450 F.",
    },
    {
    number: 2,
    description:
    "Place a sheet of parchment paper on a cookie sheet. Wash the potatoes until they are clean.",
    },
    {
    number: 3,
    description: "Put the potatoes in a pot and fill with water.",
    },
    {
    number: 4,
    description: "Add about 2 tablespoons of salt to the water.",
    },
    {
    number: 5,
    description:
    "Place the water on a medium high flame and bring to a boil. Boil them until they are tender all the way through. Make sure a fork pierces them easily.",
    },
    {
    number: 6,
    description: "Drain the potatoes.",
    },
    {
    number: 7,
    description: "Let the potatoes cool a little.",
    },
    {
    number: 8,
    description: "Drizzle the cookie sheet with olive oil.",
    },
    {
    number: 9,
    description: "Place the cooked potatoes on cookie sheet.",
    },
    {
    number: 10,
    description:
    "Using a small paring knife, make an X cut on the top of each potato so it's easier to crush them. Use a potato masher and gently press on each potato until squashed but not disintegrated. You want them to stay together. If they fall apart, don't worry! Just pick up the bits into piles and keep going.",
    },
    {
    number: 11,
    description:
    "Once smashed, generously sprinkle kosher salt over each potato. Follow with pepper, and then, drizzle them with more olive oil. If desired, sprinkle each potato with freshly chopped rosemary or chives if desired.",
    },
    {
    number: 12,
    description:
    "Sprinkle with smoked paprika to finish them off if desired.",
    },
    {
    number: 13,
    description:
    "Bake the potatoes at 450 F for 20-25 minutes, longer is better, you want them very crisp, just don't let them burn.",
    },
    {
    number: 14,
    description: "Serve hot!",
    },
    ],
    },
    {
    id: 654213,
    title: "Oven Potatoes",
    image: "https://img.spoonacular.com/recipes/654213-312x231.jpg",
    usedIngredientCount: 2,
    missedIngredientCount: 1,
    missedIngredients: [
    {
    name: "garlic",
    amount: 2,
    unit: "cloves",
    },
    ],
    usedIngredients: [
    "1/2 Onion – Minced",
    "6 Medium Size Potatoes (washed and cut into cubes)",
    ],
    preparationTime: 45,
    servingsAmount: 1,
    servingPortion: {
    amount: 1575,
    unit: "g",
    },
    nutritionPerServing: {
    calories: 1401.91,
    fat: 44.5,
    saturatedFat: 6.35,
    carbohydrates: 231.67,
    sugar: 12.37,
    protein: 27.01,
    sodium: 7.057600000000001,
    },
    nutritionPer100g: {
    calories: 89.01,
    fat: 2.83,
    saturatedFat: 0.4,
    carbohydrates: 14.71,
    sugar: 0.79,
    protein: 1.71,
    sodium: 0.45,
    },
    diet: {
    vegetarian: true,
    vegan: true,
    glutenFree: true,
    dairyFree: true,
    },
    ingredients: [
    {
    name: "garlic",
    amount: 2,
    unit: "cloves",
    },
    {
    name: "olive oil",
    amount: 216,
    unit: "milliliters",
    },
    {
    name: "onion",
    amount: 0.5,
    unit: "",
    },
    {
    name: "pepper",
    amount: 1,
    unit: "teaspoon",
    },
    {
    name: "potatoes",
    amount: 6,
    unit: "",
    },
    {
    name: "sea salt",
    amount: 1,
    unit: "Tbsp",
    },
    ],
    steps: [
    {
    number: 1,
    description:
    "In a 13 x 9 Baking Pan add all the ingredients and mix well. Put in the oven at 425 degrees for 40 minutes with aluminum foil on top of baking pan.",
    },
    {
    number: 2,
    description:
    "Mix a few times while cooking. Take off foil and cook for another 15 minutes until the potatoes get a bit crispy.You can garnish with scallions.",
    },
    {
    number: 3,
    description: "Serve and Enjoy!Use Organic Ingredients if Available",
    },
    ],
    },
    {
    id: 665180,
    title: "White Chocolate Goat Cheese Frosting",
    image: "https://img.spoonacular.com/recipes/665180-312x231.jpg",
    usedIngredientCount: 2,
    missedIngredientCount: 1,
    missedIngredients: [
    {
    name: "chocolate morsels",
    amount: 4,
    unit: "oz",
    },
    ],
    usedIngredients: [
    "1 (5.3 oz.) Fresh Goat Cheese, Chavrie Pyramid",
    "8 ounces cream cheese (any brand)",
    ],
    preparationTime: 45,
    servingsAmount: 2,
    servingPortion: {
    amount: 305,
    unit: "g",
    },
    nutritionPerServing: {
    calories: 1134.23,
    fat: 73.05,
    saturatedFat: 44.86,
    carbohydrates: 99.71,
    sugar: 97.06,
    protein: 24.22,
    sodium: 0.68476,
    },
    nutritionPer100g: {
    calories: 371.88,
    fat: 23.95,
    saturatedFat: 14.71,
    carbohydrates: 32.69,
    sugar: 31.82,
    protein: 7.94,
    sodium: 0.22,
    },
    diet: {
    vegetarian: false,
    vegan: false,
    glutenFree: true,
    dairyFree: false,
    },
    ingredients: [
    {
    name: "goat cheese",
    amount: 150.252,
    unit: "grams",
    },
    {
    name: "cream cheese",
    amount: 226.796,
    unit: "grams",
    },
    {
    name: "confectioners sugar",
    amount: 120,
    unit: "grams",
    },
    {
    name: "chocolate morsels",
    amount: 113.398,
    unit: "grams",
    },
    ],
    steps: [
    {
    number: 1,
    description:
    "In a stainless steel electric mixer bowl mix Goat Cheese Pyramid, white cream cheese and sugar.",
    },
    {
    number: 2,
    description:
    "Whip at medium speed for 1 minute then increase speed to high for 5 more minutes.",
    },
    {
    number: 3,
    description:
    "While cheese and sugar is mixing melt white chocolate in the microwave until it reaches a pourable consistency.",
    },
    {
    number: 4,
    description:
    "Reduce mixer speed and add melted white chocolate mix on high speed for 1 minute.",
    },
    {
    number: 5,
    description: "Use to decorate cupcakes or carrot cake.",
    },
    ],
    },
    {
    id: 665691,
    title: "Zucchini & Basil Frittata",
    image: "https://img.spoonacular.com/recipes/665691-312x231.jpg",
    usedIngredientCount: 3,
    missedIngredientCount: 2,
    missedIngredients: [
    {
    name: "basil",
    amount: 12,
    unit: "leaves",
    },
    {
    name: "zucchini",
    amount: 400,
    unit: "g",
    },
    ],
    usedIngredients: ["1/2 cup cheddar cheese", "3 eggs", "4 green onions"],
    preparationTime: 45,
    servingsAmount: 3,
    servingPortion: {
    amount: 220,
    unit: "g",
    },
    nutritionPerServing: {
    calories: 209.26,
    fat: 15.72,
    saturatedFat: 5.56,
    carbohydrates: 6.15,
    sugar: 3.94,
    protein: 11.9,
    sodium: 0.7803300000000001,
    },
    nutritionPer100g: {
    calories: 95.12,
    fat: 7.15,
    saturatedFat: 2.53,
    carbohydrates: 2.8,
    sugar: 1.79,
    protein: 5.41,
    sodium: 0.35,
    },
    diet: {
    vegetarian: true,
    vegan: false,
    glutenFree: true,
    dairyFree: false,
    },
    ingredients: [
    {
    name: "basil",
    amount: 12,
    unit: "leaves",
    },
    {
    name: "cheddar cheese",
    amount: 56.5,
    unit: "grams",
    },
    {
    name: "eggs",
    amount: 3,
    unit: "",
    },
    {
    name: "grapeseed oil",
    amount: 1,
    unit: "Tbsp",
    },
    {
    name: "green onions",
    amount: 4,
    unit: "",
    },
    {
    name: "salt",
    amount: 0.75,
    unit: "teaspoons",
    },
    {
    name: "zucchini",
    amount: 400,
    unit: "grams",
    },
    ],
    steps: [
    {
    number: 1,
    description:
    "Shred the zucchini with a box grater or a food processor.",
    },
    {
    number: 2,
    description:
    "Place shredded zucchini in a colander with a large bowl underneath.",
    },
    {
    number: 3,
    description:
    "Sprinkle with a little salt and allow some water to seep out of the zucchini, about 20 minutes. You can squeeze some of the water out with your hands if you're in a hurry. This part can be completed ahead of time and the shredded zucchini can stay in your refrigerator overnight if you would like to do this recipe in stages.In a large mixing bowl, add shredded zucchini, green onion, basil, cheddar cheese, and salt. Stir to combine. Crack the eggs in a separate bowl and beat them.",
    },
    {
    number: 4,
    description:
    "Pour the egg mixture into the bowl with the veggies and stir to combine all ingredients. Preheat your oven to 350 degrees F. In a 10 inch cast iron skillet, heat 1 to 2 tablespoons grape seed oil (or olive oil).",
    },
    {
    number: 5,
    description:
    "Spread the oil around, making sure the sides are nicely oiled as well.",
    },
    {
    number: 6,
    description:
    "Heat to medium then add the egg/zucchini mixture, and make sure the mixture is evenly distributed. Cook until the egg begins to cook to the sides of the skillet, about 3 to 5 minutes. Use a pot holder to place skillet in the oven.",
    },
    {
    number: 7,
    description: "Bake 12 to 15 minutes until the center tests clean.",
    },
    ],
    },
    {
    id: 649335,
    title: "Layered Avocado Dip",
    image: "https://img.spoonacular.com/recipes/649335-312x231.jpg",
    usedIngredientCount: 3,
    missedIngredientCount: 2,
    missedIngredients: [
    {
    name: "picante sauce",
    amount: 4,
    unit: "servings",
    },
    {
    name: "cream",
    amount: 1,
    unit: "pt",
    },
    ],
    usedIngredients: [
    "4 avocados, finely chopped and sprinkled with lemon juic",
    "Monterey Jack cheese, shredded",
    "Onion, finely chopped",
    ],
    preparationTime: 45,
    servingsAmount: 4,
    servingPortion: {
    amount: 407,
    unit: "g",
    },
    nutritionPerServing: {
    calories: 590.83,
    fat: 52.91,
    saturatedFat: 16.45,
    carbohydrates: 29.92,
    sugar: 8.92,
    protein: 8.22,
    sodium: 0.26886,
    },
    nutritionPer100g: {
    calories: 145.17,
    fat: 13,
    saturatedFat: 4.04,
    carbohydrates: 7.35,
    sugar: 2.19,
    protein: 2.02,
    sodium: 0.07,
    },
    diet: {
    vegetarian: true,
    vegan: false,
    glutenFree: true,
    dairyFree: false,
    },
    ingredients: [
    {
    name: "avocados",
    amount: 4,
    unit: "",
    },
    {
    name: "monterey jack cheese",
    amount: 4,
    unit: "servings",
    },
    {
    name: "onion",
    amount: 4,
    unit: "servings",
    },
    {
    name: "picante sauce",
    amount: 4,
    unit: "servings",
    },
    {
    name: "cream",
    amount: 1,
    unit: "pint",
    },
    ],
    steps: [
    {
    number: 1,
    description: "Cover the bottom of an oblong dish with avocados.",
    },
    {
    number: 2,
    description: "Spread sour cream over the avocados.",
    },
    {
    number: 3,
    description: "Sprinkle with chopped onions.",
    },
    {
    number: 4,
    description:
    "Add picante sauce. Top with cheese. Refrigerate until chilled.",
    },
    {
    number: 5,
    description: "Serve with tortilla chips.",
    },
    ],
    },
    {
    id: 654887,
    title: "Pasta Shells With Ricotta Cheese Stuffing",
    image: "https://img.spoonacular.com/recipes/654887-312x231.jpg",
    usedIngredientCount: 3,
    missedIngredientCount: 2,
    missedIngredients: [
    {
    name: "prosciutto",
    amount: 0.25,
    unit: "cup",
    },
    {
    name: "tomato sauce",
    amount: 2,
    unit: "cups",
    },
    ],
    usedIngredients: [
    "1 (16 oz.) box large shells, cooked",
    "1 pound Ricotta cheese",
    "1 egg, lightly beaten",
    ],
    preparationTime: 45,
    servingsAmount: 12,
    servingPortion: {
    amount: 125,
    unit: "g",
    },
    nutritionPerServing: {
    calories: 161.09,
    fat: 7.69,
    saturatedFat: 3.99,
    carbohydrates: 15.07,
    sugar: 1.78,
    protein: 8.02,
    sodium: 0.26352,
    },
    nutritionPer100g: {
    calories: 128.87,
    fat: 6.15,
    saturatedFat: 3.19,
    carbohydrates: 12.06,
    sugar: 1.42,
    protein: 6.42,
    sodium: 0.21,
    },
    diet: {
    vegetarian: false,
    vegan: false,
    glutenFree: false,
    dairyFree: false,
    },
    ingredients: [
    {
    name: "shells",
    amount: 453.592,
    unit: "grams",
    },
    {
    name: "ricotta cheese",
    amount: 453.592,
    unit: "grams",
    },
    {
    name: "prosciutto",
    amount: 59.147,
    unit: "milliliters",
    },
    {
    name: "egg",
    amount: 1,
    unit: "",
    },
    {
    name: "tomato sauce",
    amount: 490,
    unit: "milliliters",
    },
    ],
    steps: [
    {
    number: 1,
    description:
    "Preheat oven to 350 degrees. Beat Ricotta, Prosciutto and egg together in a large bowl. Stuff approximately 2 tablespoons of the cheese mixture into each shell and place in a baking pan. Cover with aluminum foil and bake 15 to 20 minutes. Arrange shells on serving plates and pour hot sauce over.",
    },
    ],
    },
    {
    id: 651992,
    title: "Miniature Cheesecakes",
    image: "https://img.spoonacular.com/recipes/651992-312x231.jpg",
    usedIngredientCount: 2,
    missedIngredientCount: 2,
    missedIngredients: [
    {
    name: "vanilla",
    amount: 1,
    unit: "teaspoon",
    },
    {
    name: "vanilla wafers",
    amount: 1,
    unit: "serving",
    },
    ],
    usedIngredients: ["16 ounces Cream cheese", "2 Eggs"],
    preparationTime: 45,
    servingsAmount: 1,
    servingPortion: {
    amount: 697,
    unit: "g",
    },
    nutritionPerServing: {
    calories: 2307.05,
    fat: 165.06,
    saturatedFat: 94.44,
    carbohydrates: 176.31,
    sugar: 167.9,
    protein: 39.03,
    sodium: 1.5551199999999998,
    },
    nutritionPer100g: {
    calories: 331,
    fat: 23.68,
    saturatedFat: 13.55,
    carbohydrates: 25.3,
    sugar: 24.09,
    protein: 5.6,
    sodium: 0.22,
    },
    diet: {
    vegetarian: true,
    vegan: false,
    glutenFree: false,
    dairyFree: false,
    },
    ingredients: [
    {
    name: "cream cheese",
    amount: 453.592,
    unit: "grams",
    },
    {
    name: "eggs",
    amount: 2,
    unit: "",
    },
    {
    name: "sugar",
    amount: 150,
    unit: "grams",
    },
    {
    name: "vanilla",
    amount: 1,
    unit: "teaspoon",
    },
    {
    name: "vanilla wafers",
    amount: 1,
    unit: "serving",
    },
    ],
    steps: [
    {
    number: 1,
    description:
    "Cream cheese, sugar, eggs and vanilla together. Fill muffin pan with bake cups; place vanilla wafer at bottom of each. Fill half full of batter and bake 10 minutes or until set. Top with pie filling.",
    },
    ],
    },
    {
    id: 655609,
    title: "Pennsylvania Dutch Pickled Eggs",
    image: "https://img.spoonacular.com/recipes/655609-312x231.jpg",
    usedIngredientCount: 2,
    missedIngredientCount: 2,
    missedIngredients: [
    {
    name: "beets",
    amount: 1,
    unit: "quart",
    },
    {
    name: "cider vinegar",
    amount: 1.5,
    unit: "cups",
    },
    ],
    usedIngredients: ["12 eggs, hard boiled and peeled", "1 onion, sliced"],
    preparationTime: 45,
    servingsAmount: 12,
    servingPortion: {
    amount: 187,
    unit: "g",
    },
    nutritionPerServing: {
    calories: 203.02,
    fat: 4.41,
    saturatedFat: 1.4,
    carbohydrates: 33.89,
    sugar: 30.95,
    protein: 6.91,
    sodium: 0.31989,
    },
    nutritionPer100g: {
    calories: 108.57,
    fat: 2.36,
    saturatedFat: 0.75,
    carbohydrates: 18.12,
    sugar: 16.55,
    protein: 3.7,
    sodium: 0.17,
    },
    diet: {
    vegetarian: true,
    vegan: false,
    glutenFree: true,
    dairyFree: true,
    },
    ingredients: [
    {
    name: "beets",
    amount: 946.353,
    unit: "grams",
    },
    {
    name: "cider vinegar",
    amount: 358.5,
    unit: "milliliters",
    },
    {
    name: "eggs",
    amount: 12,
    unit: "",
    },
    {
    name: "granulated sugar",
    amount: 300,
    unit: "grams",
    },
    {
    name: "onion",
    amount: 1,
    unit: "",
    },
    {
    name: "table salt",
    amount: 1,
    unit: "teaspoon",
    },
    ],
    steps: [
    {
    number: 1,
    description: "Drain liquid from the beets into saucepan.",
    },
    {
    number: 2,
    description:
    "Place beets, onions, and eggs into a large bowl or jar.",
    },
    {
    number: 3,
    description:
    "Pour sugar and vinegar into the saucepan with the beet liquid and bring the mixture to a boil. Reduce the heat to low, and let the mixture simmer 15 minutes.",
    },
    {
    number: 4,
    description:
    "Pour the beet juice mixture over the beets, eggs, and onions. Seal the bowl or jar and refrigerate. Refrigerate for at least one day; the longer they are allowed to sit the better they will taste.",
    },
    ],
    },
    {
    id: 651225,
    title: "Mashed Potatoes with Garlic, Sage & Goat Cheese",
    image: "https://img.spoonacular.com/recipes/651225-312x231.jpg",
    usedIngredientCount: 2,
    missedIngredientCount: 2,
    missedIngredients: [
    {
    name: "garlic",
    amount: 1,
    unit: "tsp",
    },
    {
    name: "sage",
    amount: 1,
    unit: "tsp",
    },
    ],
    usedIngredients: [
    "3 ea. medium size baking potatoes (peeled and cut in 1 inch pieces)",
    "1 (5.3 oz.) Chavrie Goat Cheese Pyramid, Original",
    ],
    preparationTime: 45,
    servingsAmount: 8,
    servingPortion: {
    amount: 107,
    unit: "g",
    },
    nutritionPerServing: {
    calories: 175.45,
    fat: 11.04,
    saturatedFat: 3.73,
    carbohydrates: 14.59,
    sugar: 0.67,
    protein: 5.22,
    sodium: 0.07332,
    },
    nutritionPer100g: {
    calories: 163.97,
    fat: 10.32,
    saturatedFat: 3.49,
    carbohydrates: 13.64,
    sugar: 0.63,
    protein: 4.88,
    sodium: 0.07,
    },
    diet: {
    vegetarian: true,
    vegan: false,
    glutenFree: true,
    dairyFree: false,
    },
    ingredients: [
    {
    name: "ea. baking potatoes",
    amount: 3,
    unit: "medium sizes",
    },
    {
    name: "garlic",
    amount: 1,
    unit: "teaspoon",
    },
    {
    name: "chavrie goat cheese pyramid",
    amount: 150.252,
    unit: "grams",
    },
    {
    name: "olive oil",
    amount: 4,
    unit: "Tbsps",
    },
    {
    name: "sage",
    amount: 1,
    unit: "teaspoon",
    },
    ],
    steps: [
    {
    number: 1,
    description:
    "In a medium saucepan cook the potatoes in salted water until tender, about 15 minutes.",
    },
    {
    number: 2,
    description:
    "Drain the potatoes and return them to the saucepan.While still warm, add the olive oil, garlic and Chavrie Goat Cheese.Whip the potatoes with hand held mixers until the ingredients are blended and the desired consistency is obtained.Season with salt and black pepper.",
    },
    ],
    },
    {
    id: 645020,
    title: "Golden Potato and Caramelized Onion Flat Bread Pizza",
    image: "https://img.spoonacular.com/recipes/645020-312x231.jpg",
    usedIngredientCount: 2,
    missedIngredientCount: 2,
    missedIngredients: [
    {
    name: "flat bread rounds",
    amount: 3,
    unit: "",
    },
    {
    name: "rosemary",
    amount: 3,
    unit: "sprigs",
    },
    ],
    usedIngredients: ["1/2 Spanish Onion", "2 Yukon Gold Potatoes"],
    preparationTime: 60,
    servingsAmount: 3,
    servingPortion: {
    amount: 188,
    unit: "g",
    },
    nutritionPerServing: {
    calories: 328.49,
    fat: 14.61,
    saturatedFat: 2.04,
    carbohydrates: 43.81,
    sugar: 1.66,
    protein: 6.13,
    sodium: 0.9974,
    },
    nutritionPer100g: {
    calories: 174.73,
    fat: 7.77,
    saturatedFat: 1.09,
    carbohydrates: 23.3,
    sugar: 0.88,
    protein: 3.26,
    sodium: 0.53,
    },
    diet: {
    vegetarian: true,
    vegan: true,
    glutenFree: false,
    dairyFree: true,
    },
    ingredients: [
    {
    name: "extra virgin olive oil",
    amount: 3,
    unit: "servings",
    },
    {
    name: "flat bread rounds",
    amount: 3,
    unit: "",
    },
    {
    name: "rosemary",
    amount: 3,
    unit: "sprigs",
    },
    {
    name: "onion",
    amount: 0.5,
    unit: "",
    },
    {
    name: "salt",
    amount: 1,
    unit: "teaspoon",
    },
    {
    name: "yukon gold potatoes",
    amount: 2,
    unit: "",
    },
    ],
    steps: [
    {
    number: 1,
    description: "Slice onions into half circles, shoe string style.",
    },
    {
    number: 2,
    description: "Heat skillet and add 1 TBL olive",
    },
    {
    number: 3,
    description:
    "While skillet heats, strip Rosemary sprigs, unless using dried",
    },
    {
    number: 4,
    description:
    "When skillet is hot, add onion, pinch of salt and half of Rosemary",
    },
    {
    number: 5,
    description:
    "Lower heat and continue to stir occasionally until onions are soft and develop a golden color. You are not trying to caramelize them completely. When done, remove from heat.While onions are cooking, preheat oven to 375 degrees and place flat breads on cookie sheet.",
    },
    {
    number: 6,
    description: "Lay potatoes out on paper dowel to drain and pat dry.",
    },
    {
    number: 7,
    description:
    "Drizzle flat breads with Olive OilBegin to assemble pizza. I like to put onions on first, then layer the potatoes, hit it with one more dash of the unused rosemary and another pinch of salt.",
    },
    {
    number: 8,
    description: "Drizzle a bit more oil over layers.",
    },
    {
    number: 9,
    description:
    "Bake in oven for 35-40 min or until potatoes are tender.NOTE: Really Great. I would add dollops of goat cheese next time for even more flavor. try it and let me know what you guys think.Enjoy.",
    },
    ],
    },
    {
    id: 651991,
    title: "Miniature Cheese Cakes",
    image: "https://img.spoonacular.com/recipes/651991-312x231.jpg",
    usedIngredientCount: 2,
    missedIngredientCount: 2,
    missedIngredients: [
    {
    name: "vanilla",
    amount: 1,
    unit: "teaspoon",
    },
    {
    name: "vanilla wafers",
    amount: 8,
    unit: "servings",
    },
    ],
    usedIngredients: ["1 pkt (8-oz) cream cheese", "2 Eggs"],
    preparationTime: 45,
    servingsAmount: 8,
    servingPortion: {
    amount: 60,
    unit: "g",
    },
    nutritionPerServing: {
    calories: 193.2,
    fat: 11.03,
    saturatedFat: 6.13,
    carbohydrates: 21.11,
    sugar: 20.2,
    protein: 3.17,
    sodium: 0.10889,
    },
    nutritionPer100g: {
    calories: 322,
    fat: 18.38,
    saturatedFat: 10.22,
    carbohydrates: 35.18,
    sugar: 33.67,
    protein: 5.28,
    sodium: 0.18,
    },
    diet: {
    vegetarian: true,
    vegan: false,
    glutenFree: false,
    dairyFree: false,
    },
    ingredients: [
    {
    name: "pkt cream cheese",
    amount: 226.796,
    unit: "grams",
    },
    {
    name: "eggs",
    amount: 2,
    unit: "",
    },
    {
    name: "sugar",
    amount: 150,
    unit: "grams",
    },
    {
    name: "vanilla",
    amount: 1,
    unit: "teaspoon",
    },
    {
    name: "vanilla wafers",
    amount: 8,
    unit: "servings",
    },
    ],
    steps: [
    {
    number: 1,
    description:
    "Use miniature cupcake papers found at party decorations counters.",
    },
    {
    number: 2,
    description:
    "Mix all ingredients except wafers. Put 1/4 tsp wafer crumbs into paper cups & put cake ingredients on top (about 1 teaspoon).",
    },
    {
    number: 3,
    description:
    "Bake at 350 for 15 minutes. You can place cupcake papers directly on a cookie sheet. Cool & top with a drop of pie filling, either strawberry, blueberry or cherry.",
    },
    ],
    },
    {
    id: 984198,
    title: "BBQ Gochujang Cauliflower Fried Rice",
    image: "https://img.spoonacular.com/recipes/984198-312x231.png",
    usedIngredientCount: 2,
    missedIngredientCount: 2,
    missedIngredients: [
    {
    name: "cauliflower rice",
    amount: 1,
    unit: "cup",
    },
    {
    name: "bibigo go-chu-jang barbecue sauce",
    amount: 1,
    unit: "serving",
    },
    ],
    usedIngredients: [
    "1 large scallion, chopped, whites and greens divided",
    "1 egg",
    ],
    preparationTime: 45,
    servingsAmount: 1,
    servingPortion: {
    amount: 238,
    unit: "g",
    },
    nutritionPerServing: {
    calories: 179.28,
    fat: 12.61,
    saturatedFat: 8.19,
    carbohydrates: 10.58,
    sugar: 4.13,
    protein: 9.08,
    sodium: 0.12478,
    },
    nutritionPer100g: {
    calories: 75.33,
    fat: 5.3,
    saturatedFat: 3.44,
    carbohydrates: 4.45,
    sugar: 1.74,
    protein: 3.82,
    sodium: 0.05,
    },
    diet: {
    vegetarian: true,
    vegan: false,
    glutenFree: true,
    dairyFree: true,
    },
    ingredients: [
    {
    name: "cauliflower rice",
    amount: 160,
    unit: "grams",
    },
    {
    name: "scallion",
    amount: 1,
    unit: "large",
    },
    {
    name: "coconut oil",
    amount: 2,
    unit: "teaspoons",
    },
    {
    name: "egg",
    amount: 1,
    unit: "",
    },
    {
    name: "bibigo go-chu-jang barbecue sauce",
    amount: 1,
    unit: "serving",
    },
    ],
    steps: [],
    },
    ];

  // Find the recipe with the matching id.
  const recipe = recipes.find((x) => x.id === Number(id));

  // State declarations.
  const [showMissingIngredients, setShowMissingIngredients] = useState(true);
  const [visibleSection, setVisibleSection] = useState(null);
  const [showShoppingListModal, setShowShoppingListModal] = useState(false);
  const [servings, setServings] = useState(recipe?.servingsAmount || 1);
  const [showFavoriteModal, setShowFavoriteModal] = useState(false);

  useEffect(() => {
    console.log(isFavorite);
    
  }, [isFavorite])

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
      console.log("arrived here:", recipe.id);
      const filtered = (isFavorite.filter((favId) => favId !== recipe.id));
      console.log("filtered:", filtered);
      
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

      {/* Missing Ingredients Modal */}
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
