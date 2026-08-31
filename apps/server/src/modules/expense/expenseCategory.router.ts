import { Router } from 'express';
import { expenseCategoryController } from './expenseCategory.controller';
import { authenticate, authorize } from '../../middleware/authenticate';

export const expenseCategoryRouter: Router = Router();

expenseCategoryRouter.use(authenticate);

expenseCategoryRouter.get('/', (req, res, next) => expenseCategoryController.getAll(req as any, res, next));
expenseCategoryRouter.post('/', authorize('ADMIN', 'MANAGER'), (req, res, next) => expenseCategoryController.create(req as any, res, next));
expenseCategoryRouter.put('/:id', authorize('ADMIN', 'MANAGER'), (req, res, next) => expenseCategoryController.update(req as any, res, next));
expenseCategoryRouter.delete('/:id', authorize('ADMIN'), (req, res, next) => expenseCategoryController.delete(req as any, res, next));