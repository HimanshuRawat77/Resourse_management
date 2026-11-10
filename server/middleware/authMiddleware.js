import jwt from 'jsonwebtoken';
import { AppError } from '../utils/errors.js';

export function authenticate(req, _res, next) {
  try {
    const token = req.headers.authorization?.replace(/^Bearer\s+/i, '');
    if (!token) throw new AppError('Authentication required.', 401);
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch (error) { next(error instanceof AppError ? error : new AppError('Invalid or expired token.', 401)); }
}
export const requireAdmin = (req, _res, next) => req.user?.role === 'ADMIN' ? next() : next(new AppError('Admin access required.', 403));
