import { Response, NextFunction } from 'express';
import { quotationService } from './quotation.service';
import { AuthenticatedRequest } from '../../middleware/authenticate';

export class QuotationController {
  async getAll(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const result = await quotationService.getAll(req.query as Record<string, unknown>);
      res.json({ success: true, ...result });
    } catch (error) { next(error); }
  }

  async getById(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const q = await quotationService.getById(req.params.id);
      res.json({ success: true, data: q });
    } catch (error) { next(error); }
  }

  async create(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const q = await quotationService.create(req.body, req.user!.sub);
      res.status(201).json({ success: true, data: q, message: 'Quotation created' });
    } catch (error) { next(error); }
  }

  async updateStatus(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const q = await quotationService.updateStatus(req.params.id, req.body.status);
      res.json({ success: true, data: q });
    } catch (error) { next(error); }
  }
}

export const quotationController = new QuotationController();