import { Router } from 'express';
import { payrollController } from './payroll.controller';
import { authenticate, authorize } from '../../middleware/auth';

const router: Router = Router();
router.use(authenticate);

router.get('/', (req, res, next) => payrollController.getByPeriod(req, res, next));
router.post('/process', authorize('ADMIN', 'MANAGER'), (req, res, next) => payrollController.processMonthlyPayroll(req, res, next));

export default router;