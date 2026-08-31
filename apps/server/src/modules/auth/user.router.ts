import { Router } from 'express';
import { userController } from './user.controller';
import { authenticate, authorize } from '../../middleware/authenticate';

export const userRouter: Router = Router();

userRouter.use(authenticate);

userRouter.get('/', authorize('ADMIN', 'MANAGER'), (req, res, next) => userController.getAll(req as any, res, next));
userRouter.get('/:id', authorize('ADMIN', 'MANAGER'), (req, res, next) => userController.getById(req as any, res, next));
userRouter.post('/', authorize('ADMIN'), (req, res, next) => userController.create(req as any, res, next));
userRouter.put('/:id', authorize('ADMIN'), (req, res, next) => userController.update(req as any, res, next));
userRouter.delete('/:id', authorize('ADMIN'), (req, res, next) => userController.deactivate(req as any, res, next));