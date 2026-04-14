import express from 'express';
import auth from '../middleware/auth.js';
import { addComment, getComments } from '../controllers/commentController.js';

const router = express.Router();

router.post('/:recipeId', auth, addComment);
router.get('/:recipeId', getComments);

export default router;