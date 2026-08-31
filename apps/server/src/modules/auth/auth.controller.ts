import { Request, Response, NextFunction } from 'express';
import { authService } from './auth.service';
import { LoginSchema, RegisterSchema, ChangePasswordSchema, RefreshTokenSchema } from '@nexaerp/shared';
import { AuthenticatedRequest } from '../../middleware/authenticate';

export class AuthController {
  async register(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const data = RegisterSchema.parse(req.body);
      const result = await authService.register(data);
      res.status(201).json({ success: true, data: result, message: 'Registration successful' });
    } catch (error) { next(error); }
  }

  async login(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const data = LoginSchema.parse(req.body);
      const result = await authService.login(data);
      res.json({ success: true, data: result, message: 'Login successful' });
    } catch (error) { next(error); }
  }

  async refreshToken(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { refreshToken } = RefreshTokenSchema.parse(req.body);
      const tokens = await authService.refreshToken(refreshToken);
      res.json({ success: true, data: tokens });
    } catch (error) { next(error); }
  }

  async logout(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      await authService.logout(req.user!.sub);
      res.json({ success: true, message: 'Logged out successfully' });
    } catch (error) { next(error); }
  }

  async getProfile(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const user = await authService.getProfile(req.user!.sub);
      res.json({ success: true, data: user });
    } catch (error) { next(error); }
  }

  async changePassword(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const { currentPassword, newPassword } = ChangePasswordSchema.parse(req.body);
      await authService.changePassword(req.user!.sub, currentPassword, newPassword);
      res.json({ success: true, message: 'Password changed successfully' });
    } catch (error) { next(error); }
  }
}

export const authController = new AuthController();