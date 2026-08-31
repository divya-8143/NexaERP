import { Request, Response, NextFunction } from 'express';
import { AppError } from '../lib/errors';
import { logger } from '../lib/logger';
import { ZodError } from 'zod';

export function errorHandler(
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
): void {
  logger.error(`Error: ${err.message}`, { stack: err.stack });

  if (err instanceof AppError) {
    res.status(err.statusCode).json({
      success: false,
      error: {
        message: err.message,
        statusCode: err.statusCode,
      },
    });
    return;
  }

  if (err instanceof ZodError) {
    res.status(422).json({
      success: false,
      error: {
        message: 'Validation Error',
        statusCode: 422,
        details: err.errors,
      },
    });
    return;
  }

  const prismaErr = err as any;
  if (prismaErr?.code === 'P2002') {
    res.status(409).json({
      success: false,
      error: {
        message: 'A record with this unique value already exists',
        statusCode: 409,
      },
    });
    return;
  }

  if (prismaErr?.code === 'P2025') {
    res.status(404).json({
      success: false,
      error: {
        message: 'Record to update/delete was not found',
        statusCode: 404,
      },
    });
    return;
  }

  res.status(500).json({
    success: false,
    error: {
      message: process.env.NODE_ENV === 'production' ? 'Internal server error' : err.message,
      statusCode: 500,
    },
  });
}