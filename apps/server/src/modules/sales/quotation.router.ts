import { Router } from 'express';
import { quotationController } from './quotation.controller';
import { authenticate, authorize } from '../../middleware/authenticate';

export const quotationRouter: Router = Router();

quotationRouter.use(authenticate);

quotationRouter.get('/', (req, res, next) => quotationController.getAll(req as any, res, next));
quotationRouter.get('/:id', (req, res, next) => quotationController.getById(req as any, res, next));
quotationRouter.post('/', authorize('ADMIN', 'MANAGER', 'EMPLOYEE'), (req, res, next) => quotationController.create(req as any, res, next));
quotationRouter.patch('/:id/status', authorize('ADMIN', 'MANAGER'), (req, res, next) => quotationController.updateStatus(req as any, res, next));