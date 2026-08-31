import { Response, NextFunction } from 'express';
import { invoiceService } from './invoice.service';
import { AuthenticatedRequest } from '../../middleware/authenticate';

export class InvoiceController {
  async getAll(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const result = await invoiceService.getAll(req.query as Record<string, unknown>);
      res.json({ success: true, ...result });
    } catch (error) { next(error); }
  }

  async getById(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const invoice = await invoiceService.getById(req.params.id);
      res.json({ success: true, data: invoice });
    } catch (error) { next(error); }
  }

  async create(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const invoice = await invoiceService.create(req.body, req.user!.sub);
      res.status(201).json({ success: true, data: invoice, message: 'Invoice created' });
    } catch (error) { next(error); }
  }

  async updateStatus(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const invoice = await invoiceService.updateStatus(req.params.id, req.body.status);
      res.json({ success: true, data: invoice });
    } catch (error) { next(error); }
  }

  async getOverdue(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const invoices = await invoiceService.getOverdueInvoices();
      res.json({ success: true, data: invoices });
    } catch (error) { next(error); }
  }

  async getAgingReport(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const report = await invoiceService.getAgingReport();
      res.json({ success: true, data: report });
    } catch (error) { next(error); }
  }
}

export const invoiceController = new InvoiceController();