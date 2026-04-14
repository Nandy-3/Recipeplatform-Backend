import express from 'express';
import auth from '../middleware/auth.js';
import {
  createRecipe,
  getRecipes,
  getRecipeById
} from '../controllers/recipeController.js';

const router = express.Router();

router.post('/', auth, createRecipe);
router.get('/', getRecipes);
router.get('/:id', getRecipeById);

export default router;