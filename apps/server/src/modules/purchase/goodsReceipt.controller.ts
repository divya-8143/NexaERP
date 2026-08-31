import { Response, NextFunction } from 'express';
import { goodsReceiptService } from './goodsReceipt.service';
import { AuthenticatedRequest } from '../../middleware/authenticate';

export class GoodsReceiptController {
  async getAll(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const result = await goodsReceiptService.getAll(req.query.purchaseOrderId as string);
      res.json({ success: true, data: result });
    } catch (error) { next(error); }
  }

  async getById(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const grn = await goodsReceiptService.getById(req.params.id);
      res.json({ success: true, data: grn });
    } catch (error) { next(error); }
  }

  async create(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const grn = await goodsReceiptService.create(req.body, req.user!.sub);
      res.status(201).json({ success: true, data: grn, message: 'Goods receipt created' });
    } catch (error) { next(error); }
  }
}

export const goodsReceiptController = new GoodsReceiptController();