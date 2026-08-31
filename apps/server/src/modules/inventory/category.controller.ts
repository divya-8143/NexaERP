import { Request, Response, NextFunction } from 'express';
import { categoryService } from './category.service';

export class CategoryController {
  async getAll(_req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const categories = await categoryService.getAll();
      res.json({ success: true, data: categories });
    } catch (err) { next(err); }
  }
  async getById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const category = await categoryService.getById(req.params.id);
      res.json({ success: true, data: category });
    } catch (err) { next(err); }
  }
  async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const category = await categoryService.create(req.body);
      res.status(201).json({ success: true, data: category });
    } catch (err) { next(err); }
  }
  async update(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const category = await categoryService.update(req.params.id, req.body);
      res.json({ success: true, data: category });
    } catch (err) { next(err); }
  }
  async delete(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      await categoryService.delete(req.params.id);
      res.json({ success: true, message: 'Category deleted' });
    } catch (err) { next(err); }
  }
}

export const categoryController = new CategoryController();