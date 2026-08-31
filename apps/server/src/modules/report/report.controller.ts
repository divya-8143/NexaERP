import { Response, NextFunction } from 'express';
import { reportService } from './report.service';
import { AuthenticatedRequest } from '../../middleware/authenticate';

export class ReportController {
  async getDashboard(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const kpis = await reportService.getDashboardKPIs();
      res.json({ success: true, data: kpis });
    } catch (error) { next(error); }
  }

  async getRevenueChart(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const months = Number(req.query.months) || 12;
      const data = await reportService.getRevenueChart(months);
      res.json({ success: true, data });
    } catch (error) { next(error); }
  }

  async getTopProducts(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const limit = Number(req.query.limit) || 10;
      const data = await reportService.getTopProducts(limit);
      res.json({ success: true, data });
    } catch (error) { next(error); }
  }

  async getTopCustomers(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const limit = Number(req.query.limit) || 10;
      const data = await reportService.getTopCustomers(limit);
      res.json({ success: true, data });
    } catch (error) { next(error); }
  }

  async getProfitLoss(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const startDate = req.query.startDate ? new Date(req.query.startDate as string) : new Date(new Date().getFullYear(), 0, 1);
      const endDate = req.query.endDate ? new Date(req.query.endDate as string) : new Date();
      const data = await reportService.getProfitLoss(startDate, endDate);
      res.json({ success: true, data });
    } catch (error) { next(error); }
  }

  async getInventorySummary(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const data = await reportService.getInventorySummary();
      res.json({ success: true, data });
    } catch (error) { next(error); }
  }
}

export const reportController = new ReportController();