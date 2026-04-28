import express from 'express';
import auth from '../middleware/auth.js';
import {
  createRecipe,
  getRecipes,
  getRecipeById,
  updateRecipe,
  deleteRecipe
} from '../controllers/recipeController.js';

const router = express.Router();

// Create recipe
router.post('/', auth, createRecipe);

// Get all recipes
router.get('/', getRecipes);

// Get single recipe
router.get('/:id', getRecipeById);

// Update recipe
router.put('/:id', auth, updateRecipe);

// Delete recipe
router.delete('/:id', auth, deleteRecipe);

export default router;