import { Response, NextFunction } from 'express';
import { inventoryService } from './inventory.service';
import { AuthenticatedRequest } from '../../middleware/authenticate';

export class InventoryController {
  async getAll(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const result = await inventoryService.getAll(req.query as Record<string, unknown>);
      res.json({ success: true, ...result });
    } catch (error) { next(error); }
  }

  async getByProduct(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const item = await inventoryService.getByProductId(req.params.productId);
      res.json({ success: true, data: item });
    } catch (error) { next(error); }
  }

  async adjustStock(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const result = await inventoryService.adjustStock(req.body, req.user!.sub);
      res.json({ success: true, data: result, message: 'Stock adjusted' });
    } catch (error) { next(error); }
  }

  async getMovements(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const result = await inventoryService.getStockMovements(req.params.productId, req.query as Record<string, unknown>);
      res.json({ success: true, ...result });
    } catch (error) { next(error); }
  }

  async updateConfig(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const result = await inventoryService.updateInventoryConfig(req.params.productId, req.body);
      res.json({ success: true, data: result });
    } catch (error) { next(error); }
  }
}

export const inventoryController = new InventoryController();