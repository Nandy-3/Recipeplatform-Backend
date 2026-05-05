import User from "../models/User.js";
import Recipe from "../models/Recipe.js";

/* GET CURRENT USER PROFILE */
export const getCurrentUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
      .select("-password")
      .populate("savedRecipes")
      .populate("following", "username profilePicture")
      .populate("followers", "username profilePicture");

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.json(user);
  } catch (err) {
    console.error("GET CURRENT USER ERROR:", err);

    res.status(500).json({
      message: "Server error",
    });
  }
};

/* GET USER BY ID */
export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const userRecipes = await Recipe.find({
      author: req.params.id,
    });

    res.json({
      user,
      recipes: userRecipes,
    });
  } catch (err) {
    console.error("GET USER BY ID ERROR:", err);

    res.status(500).json({
      message: "Server error",
    });
  }
};

/* SAVE / UNSAVE RECIPE */
export const toggleSaveRecipe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const recipeId = req.params.recipeId;

    const index = user.savedRecipes.findIndex(
      (id) => id.toString() === recipeId
    );

    if (index === -1) {
      user.savedRecipes.push(recipeId);
    } else {
      user.savedRecipes.splice(index, 1);
    }

    await user.save();

    res.json(user.savedRecipes);
  } catch (err) {
    console.error("SAVE RECIPE ERROR:", err);

    res.status(500).json({
      message: "Server error",
    });
  }
};

/* UPDATE PROFILE */
export const updateProfile = async (req, res) => {
  try {
    const { bio } = req.body;

    const updateData = {};

    if (bio !== undefined) {
      updateData.bio = bio;
    }

    /* CLOUDINARY IMAGE URL */
    if (req.file) {
      updateData.profilePicture = req.file.path;
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      updateData,
      {
        new: true,
        runValidators: true,
      }
    ).select("-password");

    if (!updatedUser) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.json(updatedUser);
  } catch (err) {
    console.error("UPDATE PROFILE ERROR:", err);

    res.status(500).json({
      message: "Server error",
      error: err.message,
    });
  }
};