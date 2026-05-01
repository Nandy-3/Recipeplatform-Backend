import Recipe from '../models/Recipe.js';

/**
 * CREATE RECIPE
 */
export const createRecipe = async (req, res) => {
  try {
    const data = req.body;

    data.author = req.user.id;

    const recipe = await Recipe.create(data);

    res.status(201).json(recipe);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/**
 * GET ALL RECIPES + SEARCH
 */
export const getRecipes = async (req, res) => {
  try {
    const { search } = req.query;

    let query = {};

    if (search) {
      query = {
        $or: [
          {
            title: { $regex: search, $options: 'i' }
          },
          {
            tags: { $regex: search, $options: 'i' }
          }
        ]
      };
    }

    const recipes = await Recipe.find(query)
      .populate('author', 'username profilePicture')
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
      .populate('author', 'username profilePicture');

    if (!recipe) {
      return res.status(404).json({ message: 'Recipe not found' });
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
    const updatedRecipe = await Recipe.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updatedRecipe) {
      return res.status(404).json({ message: 'Recipe not found' });
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
      return res.status(404).json({ message: 'Recipe not found' });
    }

    res.json({ message: 'Recipe deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};