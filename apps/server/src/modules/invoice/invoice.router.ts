import { Router } from 'express';
import { invoiceController } from './invoice.controller';
import { authenticate, authorize } from '../../middleware/authenticate';

export const invoiceRouter: Router = Router();

invoiceRouter.use(authenticate);

invoiceRouter.get('/', (req, res, next) => invoiceController.getAll(req as any, res, next));
invoiceRouter.get('/overdue', (req, res, next) => invoiceController.getOverdue(req as any, res, next));
invoiceRouter.get('/aging-report', authorize('ADMIN', 'MANAGER'), (req, res, next) => invoiceController.getAgingReport(req as any, res, next));
invoiceRouter.get('/:id', (req, res, next) => invoiceController.getById(req as any, res, next));
invoiceRouter.post('/', authorize('ADMIN', 'MANAGER'), (req, res, next) => invoiceController.create(req as any, res, next));
invoiceRouter.patch('/:id/status', authorize('ADMIN', 'MANAGER'), (req, res, next) => invoiceController.updateStatus(req as any, res, next));