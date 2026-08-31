import { Router } from 'express';
import { leaveController } from './leave.controller';
import { authenticate, authorize } from '../../middleware/authenticate';

export const leaveRouter: Router = Router();

leaveRouter.use(authenticate);

leaveRouter.get('/', authorize('ADMIN', 'MANAGER'), (req, res, next) => leaveController.getAll(req as any, res, next));
leaveRouter.get('/:id', (req, res, next) => leaveController.getById(req as any, res, next));
leaveRouter.post('/', (req, res, next) => leaveController.create(req as any, res, next));
leaveRouter.patch('/:id/approve', authorize('ADMIN', 'MANAGER'), (req, res, next) => leaveController.approve(req as any, res, next));
leaveRouter.patch('/:id/reject', authorize('ADMIN', 'MANAGER'), (req, res, next) => leaveController.reject(req as any, res, next));