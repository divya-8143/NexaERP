import { Router } from 'express';
import { paymentController } from './payment.controller';
import { authenticate, authorize } from '../../middleware/authenticate';

export const paymentRouter: Router = Router();

paymentRouter.use(authenticate);

paymentRouter.get('/invoice/:invoiceId', (req, res, next) => paymentController.getByInvoice(req as any, res, next));
paymentRouter.post('/', authorize('ADMIN', 'MANAGER'), (req, res, next) => paymentController.create(req as any, res, next));