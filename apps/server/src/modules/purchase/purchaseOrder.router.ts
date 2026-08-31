import { Router } from 'express';
import { purchaseOrderController } from './purchaseOrder.controller';
import { authenticate, authorize } from '../../middleware/authenticate';

export const purchaseOrderRouter: Router = Router();

purchaseOrderRouter.use(authenticate);

purchaseOrderRouter.get('/', (req, res, next) => purchaseOrderController.getAll(req as any, res, next));
purchaseOrderRouter.get('/:id', (req, res, next) => purchaseOrderController.getById(req as any, res, next));
purchaseOrderRouter.post('/', authorize('ADMIN', 'MANAGER'), (req, res, next) => purchaseOrderController.create(req as any, res, next));
purchaseOrderRouter.patch('/:id/status', authorize('ADMIN', 'MANAGER'), (req, res, next) => purchaseOrderController.updateStatus(req as any, res, next));
purchaseOrderRouter.delete('/:id', authorize('ADMIN'), (req, res, next) => purchaseOrderController.delete(req as any, res, next));