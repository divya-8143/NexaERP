import { prisma } from '../../lib/prisma';
import { hashPassword } from '../../lib/bcrypt';
import { NotFoundError, ConflictError } from '../../lib/errors';
import { getPaginationParams, createPaginatedResponse, getSkip } from '../../utils/pagination';

export class UserService {
  async getAll(query: Record<string, unknown>) {
    const params = getPaginationParams(query);
    const search = query.search as string | undefined;

    const where = search
      ? {
          OR: [
            { email: { contains: search, mode: 'insensitive' as const } },
            { firstName: { contains: search, mode: 'insensitive' as const } },
            { lastName: { contains: search, mode: 'insensitive' as const } },
          ],
        }
      : {};

    const [users, total] = await Promise.all([
      prisma.user.findMany({
        where,
        select: {
          id: true, email: true, firstName: true, lastName: true,
          role: true, isActive: true, lastLoginAt: true, createdAt: true,
        },
        orderBy: { [params.sortBy]: params.sortOrder },
        skip: getSkip(params.page, params.limit),
        take: params.limit,
      }),
      prisma.user.count({ where }),
    ]);

    return createPaginatedResponse(users, total, params);
  }

  async getById(id: string) {
    const user = await prisma.user.findUnique({
      where: { id },
      select: {
        id: true, email: true, firstName: true, lastName: true,
        role: true, isActive: true, lastLoginAt: true, createdAt: true, updatedAt: true,
      },
    });
    if (!user) throw new NotFoundError('User');
    return user;
  }

  async create(data: { email: string; password: string; firstName: string; lastName: string; role?: 'ADMIN' | 'MANAGER' | 'EMPLOYEE' | 'VIEWER' }) {
    const existing = await prisma.user.findUnique({ where: { email: data.email } });
    if (existing) throw new ConflictError('Email already in use');

    const passwordHash = await hashPassword(data.password);
    return prisma.user.create({
      data: { email: data.email, passwordHash, firstName: data.firstName, lastName: data.lastName, role: data.role || 'EMPLOYEE' },
      select: { id: true, email: true, firstName: true, lastName: true, role: true, isActive: true, createdAt: true },
    });
  }

  async update(id: string, data: { firstName?: string; lastName?: string; role?: 'ADMIN' | 'MANAGER' | 'EMPLOYEE' | 'VIEWER'; isActive?: boolean }) {
    await this.getById(id);
    return prisma.user.update({
      where: { id },
      data,
      select: { id: true, email: true, firstName: true, lastName: true, role: true, isActive: true, updatedAt: true },
    });
  }

  async deactivate(id: string) {
    await this.getById(id);
    return prisma.user.update({ where: { id }, data: { isActive: false } });
  }
}

export const userService = new UserService();