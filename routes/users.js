import express from "express";
import auth from "../middleware/auth.js";
import upload from "../middleware/upload.js";

import {
  getCurrentUserProfile,
  getUserById,
  toggleSaveRecipe,
  updateProfile,
} from "../controllers/userController.js";

const router = express.Router();

router.get("/me", auth, getCurrentUserProfile);
router.put("/me", auth, upload.single("profilePicture"), updateProfile);
router.get("/:id", getUserById);
router.post("/save-recipe/:recipeId", auth, toggleSaveRecipe);

export default router;