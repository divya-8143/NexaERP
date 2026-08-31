import { Router } from 'express';
import { inventoryController } from './inventory.controller';
import { authenticate, authorize } from '../../middleware/authenticate';

export const inventoryRouter: Router = Router();

inventoryRouter.use(authenticate);

inventoryRouter.get('/', (req, res, next) => inventoryController.getAll(req as any, res, next));
inventoryRouter.get('/product/:productId', (req, res, next) => inventoryController.getByProduct(req as any, res, next));
inventoryRouter.get('/product/:productId/movements', (req, res, next) => inventoryController.getMovements(req as any, res, next));
inventoryRouter.post('/adjust', authorize('ADMIN', 'MANAGER'), (req, res, next) => inventoryController.adjustStock(req as any, res, next));
inventoryRouter.put('/product/:productId/config', authorize('ADMIN', 'MANAGER'), (req, res, next) => inventoryController.updateConfig(req as any, res, next));