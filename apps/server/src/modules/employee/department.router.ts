import { Router } from 'express';
import { departmentController } from './department.controller';
import { authenticate, authorize } from '../../middleware/authenticate';

export const departmentRouter: Router = Router();

departmentRouter.use(authenticate);

departmentRouter.get('/', (req, res, next) => departmentController.getAll(req as any, res, next));
departmentRouter.get('/:id', (req, res, next) => departmentController.getById(req as any, res, next));
departmentRouter.post('/', authorize('ADMIN', 'MANAGER'), (req, res, next) => departmentController.create(req as any, res, next));
departmentRouter.put('/:id', authorize('ADMIN', 'MANAGER'), (req, res, next) => departmentController.update(req as any, res, next));
departmentRouter.delete('/:id', authorize('ADMIN'), (req, res, next) => departmentController.delete(req as any, res, next));