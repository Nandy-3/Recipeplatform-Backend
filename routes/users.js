import express from 'express';
import auth from '../middleware/auth.js';
import {
  getCurrentUserProfile,
  getUserById,
  toggleSaveRecipe
} from '../controllers/userController.js';

const router = express.Router();

router.get('/me', auth, getCurrentUserProfile);
router.get('/:id', getUserById);
router.post('/save-recipe/:recipeId', auth, toggleSaveRecipe);

export default router;