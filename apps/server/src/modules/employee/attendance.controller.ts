import { Request, Response, NextFunction } from 'express';
import { attendanceService } from './attendance.service';

export class AttendanceController {
  async getAll(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const records = await attendanceService.getAll(req.query);
      res.json({ success: true, ...records });
    } catch (err) { next(err); }
  }

  async clockIn(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const userId = (req as any).user?.id || 'admin-user-id';
      const record = await attendanceService.clockIn(req.body, userId);
      res.json({ success: true, data: record });
    } catch (err) { next(err); }
  }

  async clockOut(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const userId = (req as any).user?.id || 'admin-user-id';
      const record = await attendanceService.clockOut(req.body, userId);
      res.json({ success: true, data: record });
    } catch (err) { next(err); }
  }

  async getSummary(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const summary = await attendanceService.getMonthlySummary(
        req.params.employeeId,
        parseInt(req.query.month as string || '1', 10),
        parseInt(req.query.year as string || '2026', 10)
      );
      res.json({ success: true, data: summary });
    } catch (err) { next(err); }
  }
}

export const attendanceController = new AttendanceController();