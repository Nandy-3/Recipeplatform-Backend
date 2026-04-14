import Recipe from '../models/Recipe.js';

export const createRecipe = async (req, res) => {
  try {
    const newRecipe = new Recipe({
      ...req.body,
      author: req.user.id
    });

    const recipe = await newRecipe.save();
    res.json(recipe);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

export const getRecipes = async (req, res) => {
  try {
    const { search, tags, limit = 20, skip = 0 } = req.query;

    let query = {};

    if (search) {
      query.$text = { $search: search };
    }

    if (tags) {
      query.tags = { $in: tags.split(',') };
    }

    const recipes = await Recipe.find(query)
      .populate('author', 'username profilePicture')
      .sort(search ? { score: { $meta: 'textScore' } } : { createdAt: -1 })
      .skip(Number(skip))
      .limit(Number(limit));

    res.json(recipes);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

export const getRecipeById = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id)
      .populate('author', 'username profilePicture bio');

    if (!recipe)
      return res.status(404).json({ message: 'Recipe not found' });

    res.json(recipe);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};