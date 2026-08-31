import { Response, NextFunction } from 'express';
import { expenseService } from './expense.service';
import { AuthenticatedRequest } from '../../middleware/authenticate';

export class ExpenseController {
  async getAll(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const result = await expenseService.getAll(req.query as Record<string, unknown>);
      res.json({ success: true, ...result });
    } catch (error) { next(error); }
  }

  async getById(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const expense = await expenseService.getById(req.params.id);
      res.json({ success: true, data: expense });
    } catch (error) { next(error); }
  }

  async create(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const expense = await expenseService.create(req.body, req.user!.sub);
      res.status(201).json({ success: true, data: expense, message: 'Expense created' });
    } catch (error) { next(error); }
  }

  async submit(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const expense = await expenseService.submit(req.params.id, req.user!.sub);
      res.json({ success: true, data: expense, message: 'Expense submitted for approval' });
    } catch (error) { next(error); }
  }

  async approve(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const expense = await expenseService.approve(req.params.id, req.user!.sub);
      res.json({ success: true, data: expense, message: 'Expense approved' });
    } catch (error) { next(error); }
  }

  async reject(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const expense = await expenseService.reject(req.params.id, req.user!.sub, req.body.rejectionReason);
      res.json({ success: true, data: expense, message: 'Expense rejected' });
    } catch (error) { next(error); }
  }

  async markPaid(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const expense = await expenseService.markPaid(req.params.id);
      res.json({ success: true, data: expense, message: 'Expense marked as paid' });
    } catch (error) { next(error); }
  }
}

export const expenseController = new ExpenseController();