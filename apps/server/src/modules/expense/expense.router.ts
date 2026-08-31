import { Router } from 'express';
import { expenseController } from './expense.controller';
import { authenticate, authorize } from '../../middleware/authenticate';

export const expenseRouter: Router = Router();

expenseRouter.use(authenticate);

expenseRouter.get('/', (req, res, next) => expenseController.getAll(req as any, res, next));
expenseRouter.get('/:id', (req, res, next) => expenseController.getById(req as any, res, next));
expenseRouter.post('/', (req, res, next) => expenseController.create(req as any, res, next));
expenseRouter.patch('/:id/submit', (req, res, next) => expenseController.submit(req as any, res, next));
expenseRouter.patch('/:id/approve', authorize('ADMIN', 'MANAGER'), (req, res, next) => expenseController.approve(req as any, res, next));
expenseRouter.patch('/:id/reject', authorize('ADMIN', 'MANAGER'), (req, res, next) => expenseController.reject(req as any, res, next));
expenseRouter.patch('/:id/paid', authorize('ADMIN'), (req, res, next) => expenseController.markPaid(req as any, res, next));