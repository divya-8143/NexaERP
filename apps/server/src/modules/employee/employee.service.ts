import { prisma } from '../../lib/prisma';
import { NotFoundError, ConflictError } from '../../lib/errors';
import { CreateEmployeeInput } from '@nexaerp/shared';
import { generateEmployeeCode } from '../../utils/sequenceGenerator';
import { getPaginationParams, createPaginatedResponse, getSkip } from '../../utils/pagination';

export class EmployeeService {
  async getAll(query: Record<string, unknown>) {
    const params = getPaginationParams(query);
    const search = query.search as string | undefined;
    const departmentId = query.departmentId as string | undefined;
    const status = query.status as string | undefined;

    const where: Record<string, unknown> = {};
    if (search) {
      where.OR = [
        { firstName: { contains: search, mode: 'insensitive' } },
        { lastName: { contains: search, mode: 'insensitive' } },
        { email: { contains: search, mode: 'insensitive' } },
        { employeeCode: { contains: search, mode: 'insensitive' } },
      ];
    }
    if (departmentId) where.departmentId = departmentId;
    if (status) where.status = status;

    const [employees, total] = await Promise.all([
      prisma.employee.findMany({
        where,
        include: { department: true },
        orderBy: { [params.sortBy]: params.sortOrder },
        skip: getSkip(params.page, params.limit),
        take: params.limit,
      }),
      prisma.employee.count({ where }),
    ]);

    return createPaginatedResponse(employees, total, params);
  }

  async getById(id: string) {
    const employee = await prisma.employee.findUnique({
      where: { id },
      include: {
        department: true,
        user: { select: { email: true, role: true } },
        _count: { select: { attendances: true, leaveRequests: true, payrolls: true } },
      },
    });
    if (!employee) throw new NotFoundError('Employee');
    return employee;
  }

  async create(data: CreateEmployeeInput) {
    const emailExists = await prisma.employee.findUnique({ where: { email: data.email } });
    if (emailExists) throw new ConflictError('Email already used by another employee');

    const dept = await prisma.department.findUnique({ where: { id: data.departmentId } });
    if (!dept) throw new NotFoundError('Department');

    const employeeCode = await generateEmployeeCode(dept.name);

    return prisma.employee.create({
      data: {
        ...data,
        employeeCode,
        joinDate: new Date(data.joinDate),
        dateOfBirth: data.dateOfBirth ? new Date(data.dateOfBirth) : undefined,
      },
      include: { department: true },
    });
  }

  async update(id: string, data: Partial<CreateEmployeeInput>) {
    await this.getById(id);
    return prisma.employee.update({ where: { id }, data, include: { department: true } });
  }

  async terminate(id: string, terminationDate: Date) {
    await this.getById(id);
    return prisma.employee.update({
      where: { id },
      data: { status: 'TERMINATED', terminationDate },
    });
  }
}

export const employeeService = new EmployeeService();