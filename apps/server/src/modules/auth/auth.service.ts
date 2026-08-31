import { prisma } from '../../lib/prisma';
import { hashPassword, comparePassword } from '../../lib/bcrypt';
import { generateTokenPair, verifyRefreshToken } from '../../lib/jwt';
import { AppError, ConflictError, UnauthorizedError } from '../../lib/errors';
import { LoginInput, RegisterInput } from '@nexaerp/shared';

export class AuthService {
  async register(data: RegisterInput) {
    const existing = await prisma.user.findUnique({ where: { email: data.email } });
    if (existing) throw new ConflictError('Email already registered');

    const passwordHash = await hashPassword(data.password);
    const user = await prisma.user.create({
      data: {
        email: data.email,
        passwordHash,
        firstName: data.firstName,
        lastName: data.lastName,
        role: data.role || 'EMPLOYEE',
      },
      select: { id: true, email: true, firstName: true, lastName: true, role: true, isActive: true, createdAt: true },
    });

    const tokens = generateTokenPair({ sub: user.id, email: user.email, role: user.role });

    await prisma.user.update({
      where: { id: user.id },
      data: { refreshToken: tokens.refreshToken, lastLoginAt: new Date() },
    });

    return { user, tokens };
  }

  async login(data: LoginInput) {
    const user = await prisma.user.findUnique({ where: { email: data.email } });
    if (!user || !user.isActive) throw new UnauthorizedError('Invalid credentials');

    const isValid = await comparePassword(data.password, user.passwordHash);
    if (!isValid) throw new UnauthorizedError('Invalid credentials');

    const tokens = generateTokenPair({ sub: user.id, email: user.email, role: user.role });

    await prisma.user.update({
      where: { id: user.id },
      data: { refreshToken: tokens.refreshToken, lastLoginAt: new Date() },
    });

    return {
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
        isActive: user.isActive,
      },
      tokens,
    };
  }

  async refreshToken(token: string) {
    const payload = verifyRefreshToken(token);
    const user = await prisma.user.findUnique({ where: { id: payload.sub } });

    if (!user || !user.isActive || user.refreshToken !== token) {
      throw new UnauthorizedError('Invalid refresh token');
    }

    const tokens = generateTokenPair({ sub: user.id, email: user.email, role: user.role });

    await prisma.user.update({
      where: { id: user.id },
      data: { refreshToken: tokens.refreshToken },
    });

    return tokens;
  }

  async logout(userId: string) {
    await prisma.user.update({
      where: { id: userId },
      data: { refreshToken: null },
    });
  }

  async changePassword(userId: string, currentPassword: string, newPassword: string) {
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new AppError('User not found', 404);

    const isValid = await comparePassword(currentPassword, user.passwordHash);
    if (!isValid) throw new UnauthorizedError('Current password is incorrect');

    const passwordHash = await hashPassword(newPassword);
    await prisma.user.update({ where: { id: userId }, data: { passwordHash } });
  }

  async getProfile(userId: string) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true, email: true, firstName: true, lastName: true,
        role: true, isActive: true, lastLoginAt: true, createdAt: true,
      },
    });
    if (!user) throw new AppError('User not found', 404);
    return user;
  }
}

export const authService = new AuthService();