import mongoose from 'mongoose';

const mealPlanSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    weekStartDate: {
      type: Date,
      required: true
    },
    // Map day name to a recipe ID
    days: {
      monday: { type: mongoose.Schema.Types.ObjectId, ref: 'Recipe' },
      tuesday: { type: mongoose.Schema.Types.ObjectId, ref: 'Recipe' },
      wednesday: { type: mongoose.Schema.Types.ObjectId, ref: 'Recipe' },
      thursday: { type: mongoose.Schema.Types.ObjectId, ref: 'Recipe' },
      friday: { type: mongoose.Schema.Types.ObjectId, ref: 'Recipe' },
      saturday: { type: mongoose.Schema.Types.ObjectId, ref: 'Recipe' },
      sunday: { type: mongoose.Schema.Types.ObjectId, ref: 'Recipe' }
    }
  },
  { timestamps: true }
);

const MealPlan = mongoose.model('MealPlan', mealPlanSchema);

export default MealPlan;