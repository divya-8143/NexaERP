import { Response, NextFunction } from 'express';
import { departmentService } from './department.service';
import { AuthenticatedRequest } from '../../middleware/authenticate';

export class DepartmentController {
  async getAll(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const result = await departmentService.getAll(req.query as Record<string, unknown>);
      res.json({ success: true, ...result });
    } catch (error) { next(error); }
  }

  async getById(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const dept = await departmentService.getById(req.params.id);
      res.json({ success: true, data: dept });
    } catch (error) { next(error); }
  }

  async create(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const dept = await departmentService.create(req.body);
      res.status(201).json({ success: true, data: dept, message: 'Department created' });
    } catch (error) { next(error); }
  }

  async update(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const dept = await departmentService.update(req.params.id, req.body);
      res.json({ success: true, data: dept });
    } catch (error) { next(error); }
  }

  async delete(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      await departmentService.delete(req.params.id);
      res.json({ success: true, message: 'Department deleted' });
    } catch (error) { next(error); }
  }
}

export const departmentController = new DepartmentController();