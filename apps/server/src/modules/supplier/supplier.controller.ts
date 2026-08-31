import { Response, NextFunction } from 'express';
import { supplierService } from './supplier.service';
import { AuthenticatedRequest } from '../../middleware/authenticate';

export class SupplierController {
  async getAll(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const result = await supplierService.getAll(req.query as Record<string, unknown>);
      res.json({ success: true, ...result });
    } catch (error) { next(error); }
  }

  async getById(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const supplier = await supplierService.getById(req.params.id);
      res.json({ success: true, data: supplier });
    } catch (error) { next(error); }
  }

  async create(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const supplier = await supplierService.create(req.body);
      res.status(201).json({ success: true, data: supplier, message: 'Supplier created' });
    } catch (error) { next(error); }
  }

  async update(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const supplier = await supplierService.update(req.params.id, req.body);
      res.json({ success: true, data: supplier });
    } catch (error) { next(error); }
  }

  async delete(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      await supplierService.delete(req.params.id);
      res.json({ success: true, message: 'Supplier deleted' });
    } catch (error) { next(error); }
  }

  async addProduct(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const result = await supplierService.addProduct(req.params.id, req.body);
      res.status(201).json({ success: true, data: result });
    } catch (error) { next(error); }
  }

  async updateRating(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const result = await supplierService.updateRating(req.params.id, req.body.rating);
      res.json({ success: true, data: result });
    } catch (error) { next(error); }
  }
}

export const supplierController = new SupplierController();