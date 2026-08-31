import { Response, NextFunction } from 'express';
import { leaveService } from './leave.service';
import { AuthenticatedRequest } from '../../middleware/authenticate';

export class LeaveController {
  async getAll(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const result = await leaveService.getAll(req.query as Record<string, unknown>);
      res.json({ success: true, ...result });
    } catch (error) { next(error); }
  }

  async getById(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const leave = await leaveService.getById(req.params.id);
      res.json({ success: true, data: leave });
    } catch (error) { next(error); }
  }

  async create(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const leave = await leaveService.create(req.body, req.body.employeeId);
      res.status(201).json({ success: true, data: leave, message: 'Leave request submitted' });
    } catch (error) { next(error); }
  }

  async approve(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const leave = await leaveService.approve(req.params.id, req.user!.sub);
      res.json({ success: true, data: leave, message: 'Leave approved' });
    } catch (error) { next(error); }
  }

  async reject(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const leave = await leaveService.reject(req.params.id, req.user!.sub, req.body.reason);
      res.json({ success: true, data: leave, message: 'Leave rejected' });
    } catch (error) { next(error); }
  }
}

export const leaveController = new LeaveController();