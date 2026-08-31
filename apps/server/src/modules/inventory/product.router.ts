import { Router } from 'express';
import { productController } from './product.controller';
import { authenticate, authorize } from '../../middleware/authenticate';

export const productRouter: Router = Router();

productRouter.use(authenticate);

productRouter.get('/', (req, res, next) => productController.getAll(req as any, res, next));
productRouter.get('/low-stock', (req, res, next) => productController.getLowStock(req as any, res, next));
productRouter.get('/:id', (req, res, next) => productController.getById(req as any, res, next));
productRouter.post('/', authorize('ADMIN', 'MANAGER'), (req, res, next) => productController.create(req as any, res, next));
productRouter.put('/:id', authorize('ADMIN', 'MANAGER'), (req, res, next) => productController.update(req as any, res, next));
productRouter.delete('/:id', authorize('ADMIN'), (req, res, next) => productController.delete(req as any, res, next));