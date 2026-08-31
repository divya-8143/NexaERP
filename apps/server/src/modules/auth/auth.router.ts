import { Router } from 'express';
import { authController } from './auth.controller';
import { authenticate } from '../../middleware/authenticate';

export const authRouter: Router = Router();

authRouter.post('/register', (req, res, next) => authController.register(req, res, next));
authRouter.post('/login', (req, res, next) => authController.login(req, res, next));
authRouter.post('/refresh', (req, res, next) => authController.refreshToken(req, res, next));
authRouter.post('/logout', authenticate, (req, res, next) => authController.logout(req as any, res, next));
authRouter.get('/profile', authenticate, (req, res, next) => authController.getProfile(req as any, res, next));
authRouter.put('/change-password', authenticate, (req, res, next) => authController.changePassword(req as any, res, next));