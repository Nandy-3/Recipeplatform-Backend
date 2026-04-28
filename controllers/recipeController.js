import Recipe from '../models/Recipe.js';

/**
 * Helper: Convert YouTube URL → Embed URL
 */
const convertToEmbed = (url) => {
  if (!url) return url;

  const match = url.match(/(?:v=|youtu\.be\/)([^&]+)/);
  return match ? `https://www.youtube.com/embed/${match[1]}` : url;
};

/**
 * CREATE RECIPE
 */
export const createRecipe = async (req, res) => {
  try {
    const data = req.body;

    // Attach logged-in user as author
    data.author = req.user.id;

    // Convert video URL if exists
    if (data.videoUrl) {
      data.videoUrl = convertToEmbed(data.videoUrl);
    }

    const recipe = await Recipe.create(data);

    res.status(201).json(recipe);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/**
 * GET ALL RECIPES (with search)
 */
export const getRecipes = async (req, res) => {
  try {
    const { search } = req.query;

    let query = {};

    if (search) {
      query = { $text: { $search: search } };
    }

    const recipes = await Recipe.find(query)
      .populate("author", "username profilePicture")
      .sort({ createdAt: -1 });

    res.json(recipes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/**
 * GET SINGLE RECIPE
 */
export const getRecipeById = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id)
      .populate("author", "username profilePicture");

    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }

    res.json(recipe);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/**
 * UPDATE RECIPE
 */
export const updateRecipe = async (req, res) => {
  try {
    const data = req.body;

    // Convert video URL if exists
    if (data.videoUrl) {
      data.videoUrl = convertToEmbed(data.videoUrl);
    }

    const updatedRecipe = await Recipe.findByIdAndUpdate(
      req.params.id,
      data,
      { new: true }
    );

    if (!updatedRecipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }

    res.json(updatedRecipe);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/**
 * DELETE RECIPE
 */
export const deleteRecipe = async (req, res) => {
  try {
    const deleted = await Recipe.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ message: "Recipe not found" });
    }

    res.json({ message: "Recipe deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};