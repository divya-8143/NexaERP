import { prisma } from '../../lib/prisma';
import { NotFoundError, AppError } from '../../lib/errors';
import { CreateLeaveRequestInput } from '@nexaerp/shared';
import { getPaginationParams, createPaginatedResponse, getSkip } from '../../utils/pagination';

export class LeaveService {
  async getAll(query: Record<string, unknown>) {
    const params = getPaginationParams(query);
    const status = query.status as string | undefined;
    const employeeId = query.employeeId as string | undefined;

    const where: Record<string, unknown> = {};
    if (status) where.status = status;
    if (employeeId) where.employeeId = employeeId;

    const [leaves, total] = await Promise.all([
      prisma.leaveRequest.findMany({
        where,
        include: { employee: { include: { department: true } }, approvedBy: { select: { firstName: true, lastName: true } } },
        orderBy: { createdAt: 'desc' },
        skip: getSkip(params.page, params.limit),
        take: params.limit,
      }),
      prisma.leaveRequest.count({ where }),
    ]);

    return createPaginatedResponse(leaves, total, params);
  }

  async getById(id: string) {
    const leave = await prisma.leaveRequest.findUnique({
      where: { id },
      include: { employee: true, approvedBy: { select: { firstName: true, lastName: true } } },
    });
    if (!leave) throw new NotFoundError('Leave request');
    return leave;
  }

  async create(data: CreateLeaveRequestInput, employeeId: string) {
    const employee = await prisma.employee.findUnique({ where: { id: employeeId } });
    if (!employee) throw new NotFoundError('Employee');

    const startDate = new Date(data.startDate);
    const endDate = new Date(data.endDate);
    if (endDate < startDate) throw new AppError('End date must be after start date', 400);

    const totalDays = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)) + 1;

    return prisma.leaveRequest.create({
      data: {
        employeeId,
        leaveType: data.leaveType,
        startDate,
        endDate,
        totalDays,
        reason: data.reason,
      },
      include: { employee: true },
    });
  }

  async approve(id: string, approvedById: string) {
    const leave = await this.getById(id);
    if (leave.status !== 'PENDING') throw new AppError('Only pending leave requests can be approved', 400);

    return prisma.$transaction(async (tx: any) => {
      const updated = await tx.leaveRequest.update({
        where: { id },
        data: { status: 'APPROVED', approvedById, approvedAt: new Date() },
      });

      const startDate = new Date(leave.startDate);
      const endDate = new Date(leave.endDate);
      for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
        const dateOnly = new Date(d);
        dateOnly.setHours(0, 0, 0, 0);
        await tx.attendance.upsert({
          where: { employeeId_date: { employeeId: leave.employeeId, date: dateOnly } },
          create: { employeeId: leave.employeeId, date: dateOnly, status: 'ON_LEAVE' },
          update: { status: 'ON_LEAVE' },
        });
      }

      return updated;
    });
  }

  async reject(id: string, approvedById: string, reason: string) {
    const leave = await this.getById(id);
    if (leave.status !== 'PENDING') throw new AppError('Only pending leave requests can be rejected', 400);

    return prisma.leaveRequest.update({
      where: { id },
      data: { status: 'REJECTED', approvedById, approvedAt: new Date(), rejectionReason: reason },
    });
  }
}

export const leaveService = new LeaveService();