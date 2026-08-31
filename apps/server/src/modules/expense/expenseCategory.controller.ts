import { Response, NextFunction } from 'express';
import { expenseCategoryService } from './expenseCategory.service';
import { AuthenticatedRequest } from '../../middleware/authenticate';

export class ExpenseCategoryController {
  async getAll(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const result = await expenseCategoryService.getAll();
      res.json({ success: true, data: result });
    } catch (error) { next(error); }
  }

  async create(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const cat = await expenseCategoryService.create(req.body);
      res.status(201).json({ success: true, data: cat });
    } catch (error) { next(error); }
  }

  async update(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const cat = await expenseCategoryService.update(req.params.id, req.body);
      res.json({ success: true, data: cat });
    } catch (error) { next(error); }
  }

  async delete(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      await expenseCategoryService.delete(req.params.id);
      res.json({ success: true, message: 'Category deleted' });
    } catch (error) { next(error); }
  }
}

export const expenseCategoryController = new ExpenseCategoryController();