import { Router } from 'express';
import { attendanceController } from './attendance.controller';
import { authenticate } from '../../middleware/auth';

const router: Router = Router();
router.use(authenticate);

router.get('/', (req, res, next) => attendanceController.getAll(req, res, next));
router.post('/clock-in', (req, res, next) => attendanceController.clockIn(req, res, next));
router.post('/clock-out', (req, res, next) => attendanceController.clockOut(req, res, next));
router.get('/summary/:employeeId', (req, res, next) => attendanceController.getSummary(req, res, next));

export default router;