import { Router } from 'express';
import { reportController } from './report.controller';
import { authenticate, authorize } from '../../middleware/authenticate';

export const reportRouter: Router = Router();

reportRouter.use(authenticate, authorize('ADMIN', 'MANAGER'));

reportRouter.get('/dashboard', (req, res, next) => reportController.getDashboard(req as any, res, next));
reportRouter.get('/revenue-chart', (req, res, next) => reportController.getRevenueChart(req as any, res, next));
reportRouter.get('/top-products', (req, res, next) => reportController.getTopProducts(req as any, res, next));
reportRouter.get('/top-customers', (req, res, next) => reportController.getTopCustomers(req as any, res, next));
reportRouter.get('/profit-loss', (req, res, next) => reportController.getProfitLoss(req as any, res, next));
reportRouter.get('/inventory-summary', (req, res, next) => reportController.getInventorySummary(req as any, res, next));