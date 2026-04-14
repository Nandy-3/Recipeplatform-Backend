import jwt from 'jsonwebtoken';

const authMiddleware = (req, res, next) => {
  const token = req.header('Authorization');

  if (!token)
    return res.status(401).json({ message: 'Auth error: No token' });

  try {
    const splitToken = token.split(' ')[1]; // "Bearer <token>"

    const decoded = jwt.verify(
      splitToken || token,
      process.env.JWT_SECRET
    );

    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

export default authMiddleware;