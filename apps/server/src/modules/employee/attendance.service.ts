import { prisma } from '../../lib/prisma';
import { NotFoundError, AppError } from '../../lib/errors';
import { getPaginationParams, createPaginatedResponse, getSkip } from '../../utils/pagination';

export class AttendanceService {
  async getAll(query: Record<string, unknown>) {
    const params = getPaginationParams(query);
    const employeeId = query.employeeId as string | undefined;
    const date = query.date as string | undefined;

    const where: Record<string, unknown> = {};
    if (employeeId) where.employeeId = employeeId;
    if (date) {
      const targetDate = new Date(date);
      targetDate.setHours(0, 0, 0, 0);
      where.date = targetDate;
    }

    const [records, total] = await Promise.all([
      prisma.attendance.findMany({
        where,
        include: { employee: { include: { department: true } } },
        orderBy: { date: 'desc' },
        skip: getSkip(params.page, params.limit),
        take: params.limit,
      }),
      prisma.attendance.count({ where }),
    ]);

    return createPaginatedResponse(records, total, params);
  }

  async clockIn(data: any, employeeId: string) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const existing = await prisma.attendance.findUnique({
      where: { employeeId_date: { employeeId, date: today } },
    });
    if (existing && existing.clockIn) throw new AppError('Already clocked in today', 400);

    const clockInTime = new Date();
    const workStart = new Date();
    workStart.setHours(9, 0, 0, 0);

    const isLate = clockInTime > workStart;

    return prisma.attendance.upsert({
      where: { employeeId_date: { employeeId, date: today } },
      create: {
        employeeId,
        date: today,
        clockIn: clockInTime,
        status: isLate ? 'LATE' : 'PRESENT',
        notes: data?.notes,
      },
      update: {
        clockIn: clockInTime,
        status: isLate ? 'LATE' : 'PRESENT',
        notes: data?.notes,
      },
    });
  }

  async clockOut(data: any, employeeId: string) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const record = await prisma.attendance.findUnique({
      where: { employeeId_date: { employeeId, date: today } },
    });
    if (!record || !record.clockIn) throw new AppError('Must clock in before clocking out', 400);

    const clockOutTime = new Date();
    const hoursWorked = (clockOutTime.getTime() - new Date(record.clockIn).getTime()) / (1000 * 60 * 60);
    const overtimeHours = Math.max(0, hoursWorked - 8);

    return prisma.attendance.update({
      where: { employeeId_date: { employeeId, date: today } },
      data: {
        clockOut: clockOutTime,
        hoursWorked,
        overtimeHours,
        notes: data?.notes ? `${record.notes || ''} | Out: ${data.notes}` : record.notes,
      },
    });
  }

  async getMonthlySummary(employeeId: string, month: number, year: number) {
    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 0);

    const records = await prisma.attendance.findMany({
      where: { employeeId, date: { gte: startDate, lte: endDate } },
    });

    const present = records.filter((r: any) => r.status === 'PRESENT' || r.status === 'LATE').length;
    const absent = records.filter((r: any) => r.status === 'ABSENT').length;
    const halfDay = records.filter((r: any) => r.status === 'HALF_DAY').length;
    const leave = records.filter((r: any) => r.status === 'ON_LEAVE').length;
    const totalHours = records.reduce((sum: number, r: any) => sum + Number(r.hoursWorked || 0), 0);
    const totalOvertime = records.reduce((sum: number, r: any) => sum + Number(r.overtimeHours || 0), 0);

    return { month, year, present, absent, halfDay, leave, totalHours, totalOvertime };
  }
}

export const attendanceService = new AttendanceService();