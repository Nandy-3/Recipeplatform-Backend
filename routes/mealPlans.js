import express from 'express';
import auth from '../middleware/auth.js';
import {
  getMealPlan,
  updateMealPlan
} from '../controllers/mealPlanController.js';

const router = express.Router();

router.get('/', auth, getMealPlan);
router.put('/:id', auth, updateMealPlan);

export default router;