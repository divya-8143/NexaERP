import { Response, NextFunction } from 'express';
import { paymentService } from './payment.service';
import { AuthenticatedRequest } from '../../middleware/authenticate';

export class PaymentController {
  async getByInvoice(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const payments = await paymentService.getByInvoice(req.params.invoiceId);
      res.json({ success: true, data: payments });
    } catch (error) { next(error); }
  }

  async create(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const payment = await paymentService.create(req.body, req.user!.sub);
      res.status(201).json({ success: true, data: payment, message: 'Payment recorded' });
    } catch (error) { next(error); }
  }
}

export const paymentController = new PaymentController();