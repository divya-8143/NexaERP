import express, { Express } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { errorHandler } from './middleware/errorHandler';
import { notFoundHandler } from './middleware/notFoundHandler';

import { authRouter } from './modules/auth/auth.router';
import { userRouter } from './modules/auth/user.router';
import { productRouter } from './modules/inventory/product.router';
import { categoryRouter } from './modules/inventory/category.router';
import { inventoryRouter } from './modules/inventory/inventory.router';
import { supplierRouter } from './modules/supplier/supplier.router';
import { purchaseOrderRouter } from './modules/purchase/purchaseOrder.router';
import { goodsReceiptRouter } from './modules/purchase/goodsReceipt.router';
import { salesOrderRouter } from './modules/sales/salesOrder.router';
import { customerRouter } from './modules/sales/customer.router';
import { invoiceRouter } from './modules/invoice/invoice.router';
import { paymentRouter } from './modules/invoice/payment.router';
import { employeeRouter } from './modules/employee/employee.router';
import { departmentRouter } from './modules/employee/department.router';
import attendanceRouter from './modules/employee/attendance.router';
import { leaveRouter } from './modules/employee/leave.router';
import payrollRouter from './modules/employee/payroll.router';
import { expenseRouter } from './modules/expense/expense.router';
import { expenseCategoryRouter } from './modules/expense/expenseCategory.router';
import { reportRouter } from './modules/report/report.router';

export function createApp(): Express {
  const app = express();

  app.use(helmet());
  app.use(cors({ origin: process.env.CORS_ORIGIN || 'http://localhost:5173', credentials: true }));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  if (process.env.NODE_ENV !== 'test') {
    app.use(morgan('dev'));
  }

  app.get('/health', (_req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString(), service: 'NexaERP Core API' });
  });

  const apiRouter = express.Router();
  apiRouter.use('/auth', authRouter);
  apiRouter.use('/users', userRouter);
  apiRouter.use('/products', productRouter);
  apiRouter.use('/categories', categoryRouter);
  apiRouter.use('/inventory', inventoryRouter);
  apiRouter.use('/suppliers', supplierRouter);
  apiRouter.use('/purchase-orders', purchaseOrderRouter);
  apiRouter.use('/goods-receipts', goodsReceiptRouter);
  apiRouter.use('/sales-orders', salesOrderRouter);
  apiRouter.use('/customers', customerRouter);
  apiRouter.use('/invoices', invoiceRouter);
  apiRouter.use('/payments', paymentRouter);
  apiRouter.use('/employees', employeeRouter);
  apiRouter.use('/departments', departmentRouter);
  apiRouter.use('/attendance', attendanceRouter);
  apiRouter.use('/leaves', leaveRouter);
  apiRouter.use('/payroll', payrollRouter);
  apiRouter.use('/expenses', expenseRouter);
  apiRouter.use('/expense-categories', expenseCategoryRouter);
  apiRouter.use('/reports', reportRouter);

  app.use('/api/v1', apiRouter);

  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
}