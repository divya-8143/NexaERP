import { Router } from 'express';
import { employeeController } from './employee.controller';
import { authenticate, authorize } from '../../middleware/authenticate';

export const employeeRouter: Router = Router();

employeeRouter.use(authenticate);

employeeRouter.get('/', authorize('ADMIN', 'MANAGER'), (req, res, next) => employeeController.getAll(req as any, res, next));
employeeRouter.get('/:id', authorize('ADMIN', 'MANAGER', 'EMPLOYEE'), (req, res, next) => employeeController.getById(req as any, res, next));
employeeRouter.post('/', authorize('ADMIN', 'MANAGER'), (req, res, next) => employeeController.create(req as any, res, next));
employeeRouter.put('/:id', authorize('ADMIN', 'MANAGER'), (req, res, next) => employeeController.update(req as any, res, next));
employeeRouter.patch('/:id/terminate', authorize('ADMIN'), (req, res, next) => employeeController.terminate(req as any, res, next));