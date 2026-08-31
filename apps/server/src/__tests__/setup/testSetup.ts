import { prisma } from '../../lib/prisma';

beforeAll(async () => {
  // Global test setup
});

afterAll(async () => {
  await prisma.$disconnect();
});