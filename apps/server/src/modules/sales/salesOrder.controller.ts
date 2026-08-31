import { Response, NextFunction } from 'express';
import { salesOrderService } from './salesOrder.service';
import { AuthenticatedRequest } from '../../middleware/authenticate';

export class SalesOrderController {
  async getAll(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const result = await salesOrderService.getAll(req.query as Record<string, unknown>);
      res.json({ success: true, ...result });
    } catch (error) { next(error); }
  }

  async getById(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const order = await salesOrderService.getById(req.params.id);
      res.json({ success: true, data: order });
    } catch (error) { next(error); }
  }

  async create(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const order = await salesOrderService.create(req.body, req.user!.sub);
      res.status(201).json({ success: true, data: order, message: 'Sales order created' });
    } catch (error) { next(error); }
  }

  async updateStatus(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const order = await salesOrderService.updateStatus(req.params.id, req.body.status, req.user!.sub);
      res.json({ success: true, data: order });
    } catch (error) { next(error); }
  }
}

export const salesOrderController = new SalesOrderController();