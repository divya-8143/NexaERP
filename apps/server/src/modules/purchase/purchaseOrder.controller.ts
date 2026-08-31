import { Response, NextFunction } from 'express';
import { purchaseOrderService } from './purchaseOrder.service';
import { AuthenticatedRequest } from '../../middleware/authenticate';

export class PurchaseOrderController {
  async getAll(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const result = await purchaseOrderService.getAll(req.query as Record<string, unknown>);
      res.json({ success: true, ...result });
    } catch (error) { next(error); }
  }

  async getById(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const order = await purchaseOrderService.getById(req.params.id);
      res.json({ success: true, data: order });
    } catch (error) { next(error); }
  }

  async create(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const order = await purchaseOrderService.create(req.body, req.user!.sub);
      res.status(201).json({ success: true, data: order, message: 'Purchase order created' });
    } catch (error) { next(error); }
  }

  async updateStatus(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const order = await purchaseOrderService.updateStatus(req.params.id, req.body.status, req.user!.sub);
      res.json({ success: true, data: order });
    } catch (error) { next(error); }
  }

  async delete(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      await purchaseOrderService.delete(req.params.id);
      res.json({ success: true, message: 'Purchase order deleted' });
    } catch (error) { next(error); }
  }
}

export const purchaseOrderController = new PurchaseOrderController();