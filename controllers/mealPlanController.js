import MealPlan from '../models/MealPlan.js';

export const getMealPlan = async (req, res) => {
  try {
    let plan = await MealPlan.findOne({ userId: req.user.id })
      .sort({ weekStartDate: -1 })
      .populate(
        'days.monday days.tuesday days.wednesday days.thursday days.friday days.saturday days.sunday'
      );

    if (!plan) {
      plan = new MealPlan({
        userId: req.user.id,
        weekStartDate: new Date(),
        days: {}
      });
      await plan.save();
    }

    res.json(plan);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const updateMealPlan = async (req, res) => {
  try {
    const { days } = req.body;

    let plan = await MealPlan.findById(req.params.id);

    if (!plan)
      return res.status(404).json({ message: 'Plan not found' });

    if (plan.userId.toString() !== req.user.id)
      return res.status(401).json({ message: 'Not authorized' });

    plan.days = { ...plan.days, ...days };
    await plan.save();

    res.json(plan);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};