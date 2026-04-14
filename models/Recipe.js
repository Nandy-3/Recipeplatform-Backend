import mongoose from 'mongoose';

const recipeSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    ingredients: [
      {
        name: { type: String, required: true },
        quantity: { type: String, required: true }
      }
    ],
    steps: [{ type: String, required: true }],
    prepTime: { type: Number, required: true }, // in minutes
    cookTime: { type: Number, required: true }, // in minutes
    servings: { type: Number, required: true },
    photos: [{ type: String }], // array of URLs
    videoUrl: { type: String }, // YouTube embed URL
    tags: [{ type: String }],
    averageRating: { type: Number, default: 0 },
    ratingsCount: { type: Number, default: 0 }
  },
  { timestamps: true }
);

// Text index for search
recipeSchema.index({
  title: 'text',
  'ingredients.name': 'text',
  tags: 'text'
});

const Recipe = mongoose.model('Recipe', recipeSchema);

export default Recipe;