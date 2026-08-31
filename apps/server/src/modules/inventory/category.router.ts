import { Router } from 'express';
import { categoryController } from './category.controller';
import { authenticate, authorize } from '../../middleware/authenticate';

export const categoryRouter: Router = Router();

categoryRouter.use(authenticate);

categoryRouter.get('/', (req, res, next) => categoryController.getAll(req as any, res, next));
categoryRouter.get('/:id', (req, res, next) => categoryController.getById(req as any, res, next));
categoryRouter.post('/', authorize('ADMIN', 'MANAGER'), (req, res, next) => categoryController.create(req as any, res, next));
categoryRouter.put('/:id', authorize('ADMIN', 'MANAGER'), (req, res, next) => categoryController.update(req as any, res, next));
categoryRouter.delete('/:id', authorize('ADMIN'), (req, res, next) => categoryController.delete(req as any, res, next));