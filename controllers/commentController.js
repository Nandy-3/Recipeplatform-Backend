import Comment from '../models/Comment.js';

export const addComment = async (req, res) => {
  try {
    const { text, rating } = req.body;

    const existing = await Comment.findOne({
      recipeId: req.params.recipeId,
      userId: req.user.id
    });

    if (existing) {
      existing.text = text || existing.text;
      existing.rating = rating || existing.rating;
      await existing.save();
      return res.json(existing);
    }

    const comment = new Comment({
      recipeId: req.params.recipeId,
      userId: req.user.id,
      text,
      rating
    });

    await comment.save();
    res.json(comment);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

export const getComments = async (req, res) => {
  try {
    const comments = await Comment.find({ recipeId: req.params.recipeId })
      .populate('userId', 'username profilePicture')
      .sort({ createdAt: -1 });

    res.json(comments);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};