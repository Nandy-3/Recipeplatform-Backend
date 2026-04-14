import User from '../models/User.js';
import Recipe from '../models/Recipe.js';

export const getCurrentUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
      .select('-password')
      .populate('savedRecipes')
      .populate('following', 'username profilePicture')
      .populate('followers', 'username profilePicture');

    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');

    if (!user)
      return res.status(404).json({ message: 'User not found' });

    const userRecipes = await Recipe.find({ author: req.params.id });

    res.json({ user, recipes: userRecipes });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const toggleSaveRecipe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    const index = user.savedRecipes.indexOf(req.params.recipeId);

    if (index === -1) {
      user.savedRecipes.push(req.params.recipeId);
    } else {
      user.savedRecipes.splice(index, 1);
    }

    await user.save();
    res.json(user.savedRecipes);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};