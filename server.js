import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import recipeRoutes from "./routes/recipes.js";
import commentRoutes from "./routes/comments.js";
import mealPlanRoutes from "./routes/mealPlans.js";

dotenv.config();

const app = express();

/* CORS */
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://recipeplatform-frontend.netlify.app",
    ],
    credentials: true,
  })
);

/* Body parser */
app.use(express.json());

/* Static folder for uploaded images */
app.use("/uploads", express.static("uploads"));

/* Routes */
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/recipes", recipeRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/meal-plans", mealPlanRoutes);

/* Test route */
app.get("/", (req, res) => {
  res.send("Recipe Sharing Platform API");
});

const PORT = process.env.PORT || 5000;

/* MongoDB connection */
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB");

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Database connection error:", err);
  });