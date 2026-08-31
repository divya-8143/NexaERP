import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { UnauthorizedError, ForbiddenError } from '../lib/errors';

export interface JwtPayload {
  sub: string;
  email: string;
  role: string;
}

export interface AuthenticatedRequest extends Request {
  user?: any;
}

export function authenticate(req: Request, _res: Response, next: NextFunction): void {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new UnauthorizedError('No authentication token provided');
  }

  const token = authHeader.split(' ')[1];
  try {
    const secret = process.env.JWT_SECRET || 'nexaerp_dev_secret_key_123';
    const decoded = jwt.verify(token, secret) as JwtPayload;
    (req as any).user = { id: decoded.sub, email: decoded.email, role: decoded.role };
    next();
  } catch (err) {
    throw new UnauthorizedError('Invalid or expired token');
  }
}

export function authorize(...roles: string[]) {
  return (req: Request, _res: Response, next: NextFunction): void => {
    const user = (req as any).user;
    if (!user || !roles.includes(user.role)) {
      throw new ForbiddenError('You do not have permission to perform this action');
    }
    next();
  };
}