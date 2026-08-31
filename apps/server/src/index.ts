import 'dotenv/config';
import { createApp } from './app';
import { prisma } from './lib/prisma';
import { logger } from './lib/logger';

const PORT = process.env.PORT || 3001;

async function main() {
  try {
    await prisma.$connect();
    logger.info('Connected to database');

    const app = createApp();
    const server = app.listen(PORT, () => {
      logger.info(`NexaERP server running on port ${PORT}`);
      logger.info(`Environment: ${process.env.NODE_ENV}`);
    });

    const shutdown = async (signal: string) => {
      logger.info(`Received ${signal}. Shutting down gracefully...`);
      server.close(async () => {
        await prisma.$disconnect();
        logger.info('Database disconnected');
        process.exit(0);
      });
    };

    process.on('SIGTERM', () => shutdown('SIGTERM'));
    process.on('SIGINT', () => shutdown('SIGINT'));
  } catch (error) {
    logger.error('Failed to start server:', error);
    await prisma.$disconnect();
    process.exit(1);
  }
}

main();