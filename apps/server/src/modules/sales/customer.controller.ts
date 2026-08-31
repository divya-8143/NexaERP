import { Response, NextFunction } from 'express';
import { customerService } from './customer.service';
import { AuthenticatedRequest } from '../../middleware/authenticate';

export class CustomerController {
  async getAll(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const result = await customerService.getAll(req.query as Record<string, unknown>);
      res.json({ success: true, ...result });
    } catch (error) { next(error); }
  }

  async getById(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const customer = await customerService.getById(req.params.id);
      res.json({ success: true, data: customer });
    } catch (error) { next(error); }
  }

  async create(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const customer = await customerService.create(req.body);
      res.status(201).json({ success: true, data: customer, message: 'Customer created' });
    } catch (error) { next(error); }
  }

  async update(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const customer = await customerService.update(req.params.id, req.body);
      res.json({ success: true, data: customer });
    } catch (error) { next(error); }
  }

  async delete(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      await customerService.delete(req.params.id);
      res.json({ success: true, message: 'Customer deleted' });
    } catch (error) { next(error); }
  }
}

export const customerController = new CustomerController();