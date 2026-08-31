import { Router } from 'express';
import { goodsReceiptController } from './goodsReceipt.controller';
import { authenticate, authorize } from '../../middleware/authenticate';

export const goodsReceiptRouter: Router = Router();

goodsReceiptRouter.use(authenticate);

goodsReceiptRouter.get('/', (req, res, next) => goodsReceiptController.getAll(req as any, res, next));
goodsReceiptRouter.get('/:id', (req, res, next) => goodsReceiptController.getById(req as any, res, next));
goodsReceiptRouter.post('/', authorize('ADMIN', 'MANAGER', 'EMPLOYEE'), (req, res, next) => goodsReceiptController.create(req as any, res, next));