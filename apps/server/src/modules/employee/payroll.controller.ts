import { Request, Response, NextFunction } from 'express';
import { payrollService } from './payroll.service';

export class PayrollController {
  async getByPeriod(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const records = await payrollService.getByPeriod(
        parseInt(req.query.month as string || '1', 10),
        parseInt(req.query.year as string || '2026', 10)
      );
      res.json({ success: true, data: records });
    } catch (err) { next(err); }
  }

  async processMonthlyPayroll(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const records = await payrollService.processMonthlyPayroll(req.body);
      res.json({ success: true, data: records });
    } catch (err) { next(err); }
  }
}

export const payrollController = new PayrollController();