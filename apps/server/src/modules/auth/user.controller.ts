import { Response, NextFunction } from 'express';
import { userService } from './user.service';
import { AuthenticatedRequest } from '../../middleware/authenticate';

export class UserController {
  async getAll(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const result = await userService.getAll(req.query as Record<string, unknown>);
      res.json({ success: true, ...result });
    } catch (error) { next(error); }
  }

  async getById(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const user = await userService.getById(req.params.id);
      res.json({ success: true, data: user });
    } catch (error) { next(error); }
  }

  async create(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const user = await userService.create(req.body);
      res.status(201).json({ success: true, data: user, message: 'User created' });
    } catch (error) { next(error); }
  }

  async update(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const user = await userService.update(req.params.id, req.body);
      res.json({ success: true, data: user });
    } catch (error) { next(error); }
  }

  async deactivate(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      await userService.deactivate(req.params.id);
      res.json({ success: true, message: 'User deactivated' });
    } catch (error) { next(error); }
  }
}

export const userController = new UserController();