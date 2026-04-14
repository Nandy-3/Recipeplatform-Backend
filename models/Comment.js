import mongoose from 'mongoose';
import Recipe from './Recipe.js';

const commentSchema = new mongoose.Schema(
  {
    recipeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Recipe',
      required: true
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    text: {
      type: String,
      required: true
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
      required: true
    }
  },
  { timestamps: true }
);

// Update recipe average rating when a new comment/rating is left
commentSchema.post('save', async function () {
  const recipeId = this.recipeId;

  const comments = await mongoose
    .model('Comment')
    .find({ recipeId });

  const totalRating = comments.reduce(
    (acc, curr) => acc + curr.rating,
    0
  );

  const averageRating = totalRating / comments.length;

  await Recipe.findByIdAndUpdate(recipeId, {
    averageRating: averageRating.toFixed(1),
    ratingsCount: comments.length
  });
});

const Comment = mongoose.model('Comment', commentSchema);

export default Comment;