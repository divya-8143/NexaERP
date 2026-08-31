import { Response, NextFunction } from 'express';
import { productService } from './product.service';
import { AuthenticatedRequest } from '../../middleware/authenticate';

export class ProductController {
  async getAll(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const result = await productService.getAll(req.query as Record<string, unknown>);
      res.json({ success: true, ...result });
    } catch (error) { next(error); }
  }

  async getById(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const product = await productService.getById(req.params.id);
      res.json({ success: true, data: product });
    } catch (error) { next(error); }
  }

  async create(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const product = await productService.create(req.body);
      res.status(201).json({ success: true, data: product, message: 'Product created' });
    } catch (error) { next(error); }
  }

  async update(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const product = await productService.update(req.params.id, req.body);
      res.json({ success: true, data: product });
    } catch (error) { next(error); }
  }

  async delete(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      await productService.delete(req.params.id);
      res.json({ success: true, message: 'Product deactivated' });
    } catch (error) { next(error); }
  }

  async getLowStock(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const products = await productService.getLowStockProducts();
      res.json({ success: true, data: products });
    } catch (error) { next(error); }
  }
}

export const productController = new ProductController();