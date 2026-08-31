import { Response, NextFunction } from 'express';
import { employeeService } from './employee.service';
import { AuthenticatedRequest } from '../../middleware/authenticate';

export class EmployeeController {
  async getAll(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const result = await employeeService.getAll(req.query as Record<string, unknown>);
      res.json({ success: true, ...result });
    } catch (error) { next(error); }
  }

  async getById(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const employee = await employeeService.getById(req.params.id);
      res.json({ success: true, data: employee });
    } catch (error) { next(error); }
  }

  async create(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const employee = await employeeService.create(req.body);
      res.status(201).json({ success: true, data: employee, message: 'Employee created' });
    } catch (error) { next(error); }
  }

  async update(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const employee = await employeeService.update(req.params.id, req.body);
      res.json({ success: true, data: employee });
    } catch (error) { next(error); }
  }

  async terminate(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const employee = await employeeService.terminate(req.params.id, new Date(req.body.terminationDate));
      res.json({ success: true, data: employee, message: 'Employee terminated' });
    } catch (error) { next(error); }
  }
}

export const employeeController = new EmployeeController();