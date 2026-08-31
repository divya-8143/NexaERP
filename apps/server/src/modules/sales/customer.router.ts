import { Router } from 'express';
import { customerController } from './customer.controller';
import { authenticate, authorize } from '../../middleware/authenticate';

export const customerRouter: Router = Router();

customerRouter.use(authenticate);

customerRouter.get('/', (req, res, next) => customerController.getAll(req as any, res, next));
customerRouter.get('/:id', (req, res, next) => customerController.getById(req as any, res, next));
customerRouter.post('/', authorize('ADMIN', 'MANAGER', 'EMPLOYEE'), (req, res, next) => customerController.create(req as any, res, next));
customerRouter.put('/:id', authorize('ADMIN', 'MANAGER'), (req, res, next) => customerController.update(req as any, res, next));
customerRouter.delete('/:id', authorize('ADMIN'), (req, res, next) => customerController.delete(req as any, res, next));