import jwt from 'jsonwebtoken';

export const protect = (req, res, next) => {
  try {
    const token = req.cookies?.token;
    console.log(token)
    if (!token) {
      return res.status(401).json({ message: 'Not authorized, token missing' });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'dev_secret');
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Not authorized, token invalid' });
  }
};


