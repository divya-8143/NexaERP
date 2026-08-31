import { Router } from 'express';
import { salesOrderController } from './salesOrder.controller';
import { authenticate, authorize } from '../../middleware/authenticate';

export const salesOrderRouter: Router = Router();

salesOrderRouter.use(authenticate);

salesOrderRouter.get('/', (req, res, next) => salesOrderController.getAll(req as any, res, next));
salesOrderRouter.get('/:id', (req, res, next) => salesOrderController.getById(req as any, res, next));
salesOrderRouter.post('/', authorize('ADMIN', 'MANAGER', 'EMPLOYEE'), (req, res, next) => salesOrderController.create(req as any, res, next));
salesOrderRouter.patch('/:id/status', authorize('ADMIN', 'MANAGER'), (req, res, next) => salesOrderController.updateStatus(req as any, res, next));