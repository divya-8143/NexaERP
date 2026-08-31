import { Router } from 'express';
import { supplierController } from './supplier.controller';
import { authenticate, authorize } from '../../middleware/authenticate';

export const supplierRouter: Router = Router();

supplierRouter.use(authenticate);

supplierRouter.get('/', (req, res, next) => supplierController.getAll(req as any, res, next));
supplierRouter.get('/:id', (req, res, next) => supplierController.getById(req as any, res, next));
supplierRouter.post('/', authorize('ADMIN', 'MANAGER'), (req, res, next) => supplierController.create(req as any, res, next));
supplierRouter.put('/:id', authorize('ADMIN', 'MANAGER'), (req, res, next) => supplierController.update(req as any, res, next));
supplierRouter.delete('/:id', authorize('ADMIN'), (req, res, next) => supplierController.delete(req as any, res, next));
supplierRouter.post('/:id/products', authorize('ADMIN', 'MANAGER'), (req, res, next) => supplierController.addProduct(req as any, res, next));
supplierRouter.patch('/:id/rating', authorize('ADMIN', 'MANAGER'), (req, res, next) => supplierController.updateRating(req as any, res, next));