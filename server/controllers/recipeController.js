const Recipe = require('../models/recipeModel');
const User = require('../models/userModel');
const HttpError = require('../models/errorModel');
const { v4: uuidv4 } = require('uuid'); // Correctly import uuid

// Create Recipe
const createRecipe = async (req, res, next) => {
  try {
    const { title, description, Ingredients, directions } = req.body;

    if (!title || !description || !Ingredients || !directions) {
      return next(new HttpError("Fill in all the fields and choose a thumbnail.", 422));
    }

    if (!req.file) {
      return next(new HttpError("Thumbnail is required.", 422));
    }

    const thumbnailUrl = req.file.path; // Cloudinary URL
    console.log(`Image URL: ${thumbnailUrl}`); // Log the image URL

    const newRecipe = await Recipe.create({
      title,
      description,
      Ingredients,
      directions,
      thumbnail: thumbnailUrl,
      creator: req.user.id
    });

    if (!newRecipe) {
      return next(new HttpError("Recipe couldn't be created", 422));
    }

    const currentUser = await User.findById(req.user.id);
    const userRecipeCount = currentUser.recipes + 1;
    await User.findByIdAndUpdate(req.user.id, { recipes: userRecipeCount });

    res.status(201).json({
      status_code: 201,
      message: "Recipe created successfully",
      recipe: {
        ...newRecipe.toObject(),
        thumbnail: thumbnailUrl // Ensure thumbnail URL is included in the response
      }
    });

  } catch (error) {
    return next(new HttpError("An error occurred while creating the recipe", 500));
  }
};

// Get All Recipes
const getRecipes = async (req, res, next) => {
  try {
    const recipes = await Recipe.find();
    if (!recipes || recipes.length === 0) {
      return next(new HttpError("No recipes found.", 404));
    }
    res.status(200).json({
      status_code: 200,
      message: "Recipes fetched successfully",
      recipes
    });
  } catch (error) {
    return next(new HttpError("Fetching recipes failed, please try again later.", 500));
  }
};

// Get Single Recipe
const getRecipe = async (req, res, next) => {
  const recipeId = req.params.id;
  try {
    const recipe = await Recipe.findById(recipeId);
    if (!recipe) {
      return next(new HttpError("Recipe not found.", 404));
    }
    res.status(200).json({
      status_code: 200,
      message: "Recipe fetched successfully",
      recipe
    });
  } catch (error) {
    return next(new HttpError("Fetching recipe failed, please try again later.", 500));
  }
};

module.exports = {
  createRecipe,
  getRecipes,
  getRecipe
};
